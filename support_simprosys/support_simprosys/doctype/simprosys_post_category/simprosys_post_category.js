// Copyright (c) 2025, Sanskar Technolab and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Simprosys Post Category", {
// 	refresh(frm) {

// 	},
// });


frappe.ui.form.on('Simprosys Post Category', {
    // Parent Category
    category_criteria: function (frm) {
        filter_parent_simprosys_post_category(frm);
    },
    refresh: function (frm) {
        filter_parent_simprosys_post_category(frm);
    },
    
    // Rating 
    rating: function (frm) {
        validate_rating(frm);
    },

    validate: function(frm){
        validate_rating(frm);
    },

    // Trigger when the form is refreshed or fields are updated
    refresh: function (frm) {
        toggle_category_fields_section(frm);
    },
    is_group: function (frm) {
        toggle_category_fields_section(frm);
    },
    parent_simprosys_post_category: function (frm) {
        toggle_category_fields_section(frm);
    }
});

//* Post Category
function filter_parent_simprosys_post_category(frm) {
  if (frm.doc.category_criteria === "Subcategory") {
    // Show only categories (not platforms) as parent options
    frm.set_query("parent_simprosys_post_category", function () {
      return {
        filters: {
          category_criteria: "Category",
        },
      };
    });
  } else if (frm.doc.category_criteria === "Category") {
    // Show only platforms as parent options
    frm.set_query("parent_simprosys_post_category", function () {
      return {
        filters: {
          category_criteria: "Platform",
        },
      };
    });
  } else {
    // Clear filter for platforms (No parent selection)
    frm.set_query("parent_simprosys_post_category", function () {
      return {
        filters: {},
      };
    });
  }
}

//* Rating
function validate_rating(frm) {
  if (frm.doc.category_criteria === "Category"){
    if (frm.doc.rating < 0 || frm.doc.rating > 5) {
      frappe.throw("Rating must be between 1 and 5");
      // frappe.validated = false;
    }
  }
}

//* Hidden % Shown Category
function toggle_category_fields_section(frm) {
    const fields = [
      "header_app_name",
      "description",
      "header_url",
      "header_url_target",
      "icon_image",
      "cta_button",
      "review",
      "rating",
      "icon_image",
    ];

    if (frm.doc.is_group && frm.doc.parent_simprosys_post_category) {
        frm.set_df_property('category_fields', 'hidden', 0); // Show the section

        fields.forEach(field => {
            frm.set_df_property(field, 'reqd', 1);
        });

    } else {
        frm.set_df_property('category_fields', 'hidden', 1); // Hide the section

        fields.forEach(field => {
            frm.set_df_property(field, 'reqd', 0); // Optional: remove required when hidden
        });
    }
}


// Check Status 
// frappe.ui.form.on("Simprosys Post Category", {
//   status: function (frm) {
//     if (frm.doc.status === "Unpublish") {
//       frappe.call({
//         method:
//           "support_simprosys.support_simprosys.doctype.simprosys_post_category.simprosys_post_category.update_child_categories",
//         args: { category: frm.doc.name },
//         callback: function (response) {
//           frappe.msgprint(__("Child categories have been unpublished."));
//           frm.reload_doc(); // Refresh the form after update
//         },
//       });
//     }
//   },
// });
