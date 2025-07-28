__version__ = "0.0.1"
from frappe.core.doctype.file import utils
import frappe
from binascii import Error as BinasciiError
from frappe.utils.file_manager import safe_b64decode
from typing import TYPE_CHECKING, Optional
import re

if TYPE_CHECKING:
	from frappe.model.document import Document

	
def extract_images_from_html_override (doc: "Document", content: str, is_private: bool = False):
	frappe.flags.has_dataurl = False

	def _save_file(match):
		data = match.group(1).split("data:")[1]
		headers, content = data.split(",")
		mtype = headers.split(";", 1)[0]

		if isinstance(content, str):
			content = content.encode("utf-8")
		if b"," in content:
			content = content.split(b",")[1]

		if not content:
			# if there is no content, return the original tag
			return match.group(0)

		try:
			content = safe_b64decode(content)
		except BinasciiError:
			frappe.flags.has_dataurl = True
			return f'<img src="#broken-image" alt="{utils.get_corrupted_image_msg()}"'

		#? Prevent image from optimized
		# content = optimize_image(content, mtype)

		if "filename=" in headers:
			filename = headers.split("filename=")[-1]
			filename = utils.safe_decode(filename).split(";", 1)[0]

		else:
			filename = utils.get_random_filename(content_type=mtype)

		if doc.meta.istable:
			doctype = doc.parenttype
			name = doc.parent
		else:
			doctype = doc.doctype
			name = doc.name

		_file = frappe.get_doc(
			{
				"doctype": "File",
				"file_name": filename,
				"attached_to_doctype": doctype,
				"attached_to_name": name,
				"content": content,
				"decode": False,
				"is_private": is_private,
			}
		)
		_file.save(ignore_permissions=True)
		file_url = _file.unique_url
		frappe.flags.has_dataurl = True

		return f'<img src="{file_url}"'

	if content and isinstance(content, str):
		content = re.sub(r'<img[^>]*src\s*=\s*["\'](?=data:)(.*?)["\']', _save_file, content)

	return content

utils.extract_images_from_html = extract_images_from_html_override