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

    if (!frm.is_dirty()) {
      frm.add_custom_button(__("Preview"), function () {
        const slug = frm.doc.slug;
        const previewUrl = `/preview?faq=${encodeURIComponent(slug)}`;

        // Open the preview URL in a new tab
        window.open(previewUrl, "_blank");
      });
    }
  },
});
