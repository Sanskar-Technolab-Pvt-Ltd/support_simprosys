// frappe.treeview_settings["Simprosys Post Category"] = {
//   get_tree_nodes: function (parent, callback) {
//     frappe.call({
//       method: "support_simprosys.support_simprosys.api.get_post_category_tree",
//       args: { doctype: "Simprosys Post Category", parent: parent || null },
//       callback: function (r) {
//         callback(r.message || []);
//       },
//     });
//   },
//   onload: function (tree) {
//     console.log("Tree View Loaded");
//   },
// };

// console.log("Simprosys Post Category Tree JS loaded");

// frappe.treeview_settings["Simprosys Post Category"] = {
//   breadcrumb: "Post Category",
//   title: "Chart of Accounts",
//   get_tree_nodes: "support_simprosys.support_simprosys.api.handle_get_children",
//   add_tree_node: "support_simprosys.support_simprosys.api.handle_add_account", // Adjust if needed
//   // fields for a new node
//   fields: [
//     {
//       fieldtype: "Data",
//       fieldname: "post_category_name",
//       label: "New Category Name",
//       reqd: true,
//     },
//     {
//       fieldtype: "Link",
//       fieldname: "parent_simprosys_post_category",
//       label: "Parent",
//       options: "Currency", // Adjust if needed
//     },
//     {
//       fieldtype: "Check",
//       fieldname: "is_group",
//       label: "Is Group",
//     },
//   ],
//   ignore_fields: ["parent_simprosys_post_category"],
//   menu_items: [
//     {
//       label: "New category",
//       action: function () {
//         frappe.new_doc("category", true);
//       },
//     },
//   ],
//   onload: function (treeview) {
//     console.log("Tree view loaded", treeview);
//   },
//   post_render: function (treeview) {
//     console.log("Tree view rendered", treeview);
//   },
//   onrender: function (node) {
//     // Ensure that node displays the correct label
//     if (node.data && node.data.label) {
//       node.title = node.data.label;
//       node.value = node.data.label;
//     }
//     console.log("Rendering node:", node);
//   },
//   on_get_node: function (nodes) {
//     console.log("on_get_node - raw nodes:", nodes);
//     nodes.forEach(function (node) {
//       if (!node.data || !node.data.label) {
//         node.data = { label: node.name };
//       }
//       node.title = node.data.label;
//       node.value = node.data.label;
//       if (node.children && node.children.length) {
//         frappe.treeview_settings["Simprosys Post Category"].on_get_node(
//           node.children
//         );
//       }
//     });
//     console.log("on_get_node - processed nodes:", nodes);
//     return nodes;
//   },
//   onclick: function (node) {
//     // If it's a blog container or blog node, route appropriately.
//     if (node.data && node.data.blog) {
//       frappe.set_route("Form", "Simprosys Blog", node.data.name);
//     } else if (node.label === "Blog Posts") {
//       // Optionally, you could route to a list of blogs for that category.
//       frappe.set_route("List", "Simprosys Blog", {
//         filters: { post_category: node.parent.data.name },
//       });
//     } else {
//       // For normal category nodes, let the tree expand/collapse
//       // or you can choose to do something else.
//       console.log("Category node clicked:", node.data.name);
//     }
//   },
//   extend_toolbar: true,
//   toolbar: [
//     {
//       label: "Add Child",
//       condition: function (node) {
//         return true;
//       },
//       click: function (node) {
//         frappe.new_doc("Simprosys Post Category", {
//           parent_simprosys_post_category: node.data.name,
//         });
//       },
//       btnClass: "hidden-xs",
//     },
//   ],
// };

// frappe.treeview_settings["Simprosys Post Category"] = {
//   get_tree_nodes: "support_simprosys.support_simprosys.api.get_children",
//   breadcrumb: "Support Simprosys",
//   title: "Category List",
//   root_label: "label",
// };
