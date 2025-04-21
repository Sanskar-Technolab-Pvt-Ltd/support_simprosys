# Copyright (c) 2025, Sanskar Technolab and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class SupportSimprosysTicket(Document):
    pass


from frappe.email.queue import flush

def after_insert(self, *args, **kwargs):
    subject = "Support Simprosys Ticket - "

    content = f"""
    <html>
    <body>
        <p>Hello,</p>
        <p>A new Support Simprosys Ticket has been raised.</p>
        
        <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
            <tr>
                <th style="background-color: #f2f2f2; text-align: left;">Field</th>
                <th style="background-color: #f2f2f2; text-align: left;">Value</th>
            </tr>
            <tr>
                <td><strong>Ticket ID</strong></td>
                <td>{self.name}</td>
            </tr>
            <tr>
                <td><strong>Name</strong></td>
                <td>{self.name1}</td>
            </tr>
            <tr>
                <td><strong>Company Name</strong></td>
                <td>{self.company_name}</td>
            </tr>
            <tr>
                <td><strong>Store URL</strong></td>
                <td><a href="{self.store_url}" target="_blank">{self.store_url}</a></td>
            </tr>
            <tr>
                <td><strong>Email</strong></td>
                <td>{self.email}</td>
            </tr>
            <tr>
                <td><strong>Store ID</strong></td>
                <td>{self.store_id}</td>
            </tr>
            <tr>
                <td><strong>Additional Details</strong></td>
                <td>{self.additional_details}</td>
            </tr>
        </table>

        <p>Please take appropriate action.</p>

        <p>Thanks,<br>Support Simprosys</p>
    </body>
    </html>
    """

    print(self.plugin_or_app_related_queries)  # Debugging purpose

    # Determine sender email based on query type
    recipients_email = None  # Default to None to avoid sending emails for other cases

    if self.plugin_or_app_related_queries == "Career opportunities":
        recipients_email = ["harshit@simprosys.com"]
    elif self.plugin_or_app_related_queries == "Partnership opportunities":
        recipients_email = ["partnerships@simprosys.com"]
    else:
        recipients_email = ["support@simprosys.com"]

    # Send email only if sender_email is set
    if recipients_email:
        frappe.sendmail(
            recipients=recipients_email,
            subject=subject,
            message=content,
        )
        flush()