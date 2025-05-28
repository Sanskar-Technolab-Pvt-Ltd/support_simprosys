# Copyright (c) 2025, Sanskar Technolab and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime


class SupportSimprosysTicket(Document):
    def after_insert(self, method=None):
        if self.store_url and not self.store_url.startswith(('http://', 'https://')):
            self.store_url = f'https://{self.store_url}'
            self.db_set('store_url', self.store_url)  # Update field in the database


# from frappe.email.queue import flush

# def after_insert(self, *args, **kwargs):
#     subject = "Support Simprosys Ticket - "

#     ticket_id_row = ""
#     if self.plugin_or_app_related_queries in ["Career opportunities", "Partnership opportunities"]:
#         ticket_id_row = f"""
#         <tr>
#             <td><strong>Ticket ID</strong></td>
#             <td>{self.name}</td>
#         </tr>
#         """

#     platform_app_row = ""
#     if self.plugin_or_app_related_queries in ["Plugin and App related query"]:
#         platform_app_row = f"""
#         <tr>
#             <td><strong>Platform</strong></td>
#             <td>{self.platform}</td>
#         </tr>
#         <tr>
#             <td><strong>App</strong></td>
#             <td>{self.app}</td>
#         </tr>
#         """


    
#     content = f"""
#     <html>
#     <body>
#         <p>Hello,</p>
#         <p>A new Support Simprosys Ticket has been raised.</p>
        
#         <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
#             <tr>
#                 <th style="background-color: #f2f2f2; text-align: left; width: 50%;">Field</th>
#                 <th style="background-color: #f2f2f2; text-align: left; width: 50%;">Value</th>
#             </tr>
#             {ticket_id_row}
#             <tr>
#                 <td style="width: 50%;"><strong>Name</strong></td>
#                 <td style="width: 50%;">{self.name1}</td>
#             </tr>
#             <tr>
#                 <td style="width: 50%;"><strong>Company Name</strong></td>
#                 <td style="width: 50%;">{self.company_name}</td>
#             </tr>
#             <tr>
#                 <td style="width: 50%;"><strong>Store URL</strong></td>
#                 <td style="width: 50%;"><a href="{self.store_url}" target="_blank">{self.store_url}</a></td>
#             </tr>
#             <tr>
#                 <td style="width: 50%;"><strong>Reason for Raising a Ticket</strong></td>
#                 <td style="width: 50%;">{self.plugin_or_app_related_queries}</td>
#             </tr>
#             {platform_app_row}
#             <tr>
#                 <td style="width: 50%;"><strong>Email</strong></td>
#                 <td style="width: 50%;">{self.email}</td>
#             </tr>
#             <tr>
#                 <td style="width: 50%;"><strong>Store ID</strong></td>
#                 <td style="width: 50%;">{self.store_id}</td>
#             </tr>
#             <tr>
#                 <td style="width: 50%;"><strong>Additional Details</strong></td>
#                 <td style="width: 50%;">{self.additional_details}</td>
#             </tr>
#         </table>

#         <p>Please take appropriate action.</p>

#         <p>Thanks,<br>Support Simprosys</p>
#     </body>
#     </html>
#     """
    

#     # Determine sender email based on query type
#     recipients_email = None  # Default to None to avoid sending emails for other cases

#     if self.plugin_or_app_related_queries == "Career opportunities":
#         # recipients_email = ["careers@simprosys.com"]
#         recipients_email = ["nil@sanskartechnolab.com"]
#     elif self.plugin_or_app_related_queries == "Partnership opportunities":
#         # recipients_email = ["partnerships@simprosys.com"]
#         recipients_email = ["nil@sanskartechnolab.com"]
#     else:
#         # recipients_email = ["support@simprosys.com"]
#         recipients_email = ["nil@sanskartechnolab.com"]

#     attachments = []

#     # Fetch all attachments linked to this document

#     print("\n\n\n Print Doctye",self.doctype)
#     print("\n\n\n Print Name", self.name)
#     attached_files = frappe.get_all(
#         "File",
#         filters={
#             "attached_to_doctype": self.doctype,
#             "attached_to_name": self.name
#         },
#         fields=["name", "file_name", "file_url"]
#     )

#     for file in attached_files:
#         file_doc = frappe.get_doc("File", file.name)
#         attachments.append({
#             "fname": file_doc.file_name,
#             "fcontent": file_doc.get_content()
#         })

#     # if self.attachment:  # assuming there's a field `attachment` which is a File
#     #     file_doc = frappe.get_doc("File", {"file_url": self.attachment})
#     #     attachments.append({
#     #         "fname": file_doc.file_name,
#     #         "fcontent": file_doc.get_content()
#     #     })

#     # Send email only if sender_email is set
#     if recipients_email:
#         frappe.sendmail(
#             recipients=recipients_email,
#             subject=subject,
#             message=content,
#             attachments=attachments
#         )
#         flush()

def after_insert(self, method=None):
    pass
