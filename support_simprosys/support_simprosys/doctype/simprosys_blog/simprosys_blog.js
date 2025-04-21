// Copyright (c) 2025, Sanskar Technolab and contributors
// For license information, please see license.txt

frappe.ui.form.on("Simprosys Blog", {
  before_save: function (frm) {
    frm.set_value("publish_date", frappe.datetime.now_date());
  },

  refresh: function (frm) {
    setTimeout(() => {
      frm.fields_dict.content_details.$wrapper
        .find(".ql-editor")
        .css("min-height", "600px");
    }, 300);
  },

  onload: function (frm) {
    // Set author only if it's a new document and author is not already set
    if (frm.is_new() && !frm.doc.author) {
      frappe.call({
        method: "frappe.client.get",
        args: {
          doctype: "User",
          name: frappe.session.user,
        },
        callback: function (response) {
          if (response.message) {
            frm.set_value("author", response.message.full_name);
          }
        },
      });
    }
  },
});
