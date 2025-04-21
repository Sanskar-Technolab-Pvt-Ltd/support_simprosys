# Copyright (c) 2025, Sanskar Technolab and contributors
# For license information, please see license.txt

import frappe
from frappe.utils.nestedset import NestedSet


class SimprosysPostCategory(NestedSet):
	pass

from frappe.model.document import Document
import re
import hashlib
import time


class SimprosysPostCategory(Document):
    def before_insert(self):
        if not self.slug:
            self.slug = self.generate_unique_slug()

    def generate_unique_slug(self):
        # Convert name to a slug-friendly format
        base_slug = re.sub(r'[^a-zA-Z0-9]+', '-', self.post_category_name.lower()).strip('-')

        # Check if the slug already exists
        slug = base_slug
        count = 1

        while frappe.db.exists("Simprosys Post Category", {"slug": slug}):
            slug = f"{base_slug}-{count}"
            count += 1

        return slug
    
    
# class SimprosysPostCategory(Document):
#     def before_insert(self):
#         if not self.slug:
#             self.slug = self.generate_unique_slug()

#     def generate_unique_slug(self):
#         # Convert name to a slug-friendly format
#         base_slug = re.sub(r'[^a-zA-Z0-9]+', '-', self.post_category_name.lower()).strip('-')

#         # Generate a unique identifier (short hash)
#         unique_id = hashlib.md5(str(time.time()).encode()).hexdigest()[:6]

#         # Combine base slug with the unique identifier
#         slug = f"{base_slug}-{unique_id}"

#         return slug
    

    


# @frappe.whitelist()
# def update_child_categories(category):
#     """
#     Recursively update all child categories to 'Unpublish' 
#     when the parent category is unpublished.
#     """
#     parent_doc = frappe.get_doc("Simprosys Post Category", category)

#     if parent_doc.status == "Unpublish":
#         child_categories = frappe.get_all(
#             "Simprosys Post Category",
#             filters={"parent_simprosys_post_category": parent_doc.name},
#             fields=["name"]
#         )

#         for child in child_categories:
#             child_doc = frappe.get_doc("Simprosys Post Category", child["name"])
#             if child_doc.status != "Unpublish":
#                 child_doc.status = "Unpublish"
#                 child_doc.save()
#                 update_child_categories(child_doc.name)  # Recursively update subcategories

