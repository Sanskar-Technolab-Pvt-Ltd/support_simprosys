# Copyright (c) 2025, Sanskar Technolab and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class SimprosysBlog(Document):
	pass

import frappe
from frappe.model.document import Document
import re

class SimprosysBlog(Document):
    def before_insert(self):
        if not self.slug:
            self.slug = self.generate_unique_slug()

    def generate_unique_slug(self):
        # Convert name to a slug-friendly format
        base_slug = re.sub(r'[^a-zA-Z0-9]+', '-', self.blog_title.lower()).strip('-')

        # Check if the slug already exists
        slug = base_slug
        count = 1

        while frappe.db.exists("Simprosys Post Category", {"slug": slug}):
            slug = f"{base_slug}-{count}"
            count += 1

        return slug

