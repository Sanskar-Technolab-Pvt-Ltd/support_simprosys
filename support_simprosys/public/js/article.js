frappe.listview_settings["Article"] = {
  /**
   * Called when the List view is loaded. Adds a custom button
   * which when clicked, fetches data from the server-side method
   * and updates the existing records of the "Article" doctype.
   */
  onload: function (listview) {
    // Adding a custom button to the list view
    listview.page.add_inner_button(__("Sync Data"), function () {
      // Fetching data from the Frappe server-side method
      frappe.call({
        method: "support_simprosys.support_simprosys.api.import_Article_data", // Update 'your_app' with your actual app name
        callback: function (r) {
          if (r.message) {
            frappe.msgprint(__("Articles imported successfully!"));
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

// frappe.call({
//   method: "frappe.client.get_list",
//   args: {
//     doctype: "Article",
//     fields: ["name", "description", "new_featured_image", "alt"], // Include 'name' to update the record
//     limit_page_length: 5, // You can adjust the number of records fetched
//   },
//   callback: function (response) {
//     if (response.message) {
//       // Loop through the fetched data and update the 'alt' field to 1
//       response.message.forEach(function (article) {
//         frappe.call({
//           method: "frappe.client.set_value",
//           args: {
//             doctype: "Article",
//             name: article.name, // Use the 'name' field to identify the record
//             fieldname: "alt",
//             value: 1,
//           },
//           callback: function (update_response) {
//             if (update_response.message) {
//               console.log(
//                 "Alt field updated successfully for Article: " +
//                   article.name
//               );
//             } else {
//               console.log(
//                 "Failed to update Alt field for Article: " + article.name
//               );
//             }
//           },
//         });
//       });
//       frappe.msgprint(__("Data fetched and updated successfully!"));
//     } else {
//       frappe.msgprint(__("No data found"));
//     }
//   },
// });
