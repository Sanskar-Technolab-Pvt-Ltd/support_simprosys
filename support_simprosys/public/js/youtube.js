frappe.listview_settings["Simprosys Youtube Data"] = {
  onload: function (listview) {
    // Adding a custom button to the list view
    listview.page.add_inner_button(__("Sync Data"), function () {
      frappe.call({
        method: "support_simprosys.support_simprosys.api.import_Youtube_data", // Update 'your_app' with your actual app name
        callback: function (r) {
          if (r.message) {
            frappe.msgprint(__("Youtube data imported successfully!"));
            frappe.reloaded();
          }
        },
        error: function (err) {
          console.error("Error importing articles:", err);
          frappe.msgprint(__("Error importing JSON data"));
        },
      });
    });
  },
};
