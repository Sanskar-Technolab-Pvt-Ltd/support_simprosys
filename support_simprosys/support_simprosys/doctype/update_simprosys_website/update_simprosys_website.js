// Copyright (c) 2025, Sanskar Technolab and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Update Simprosys Website", {
//   update: function (frm) {
//     // Clear logs before build
//     frm.set_value("logs", "");

//     // Realtime log listener
//     frappe.realtime.on("astro_build_logs", function (data) {
//       if (data.log) {
//         let currentLogs = frm.doc.logs || "";
//         frm.set_value("logs", currentLogs + data.log + "\n");
//         frm.refresh_field("logs");
//       }
//     });

//     // Trigger build without freeze
//     frappe.call({
//       method: "support_simprosys.support_simprosys.api.trigger_astro_build",
//       callback: function (r) {
//         if (r.message.status === "success") {
//           frappe.msgprint("✅ Build Successful");
//         } else {
//           frappe.msgprint("❌ Build Failed: " + r.message.message);
//         }
//       },
//     });
//   },
// });








// frappe.ui.form.on("Update Simprosys Website", {
//   update: function (frm) {
//     frappe.call({
//       method: "support_simprosys.support_simprosys.api.trigger_astro_build",
//       callback: function (r) {
//         if (r.message.status === "success") {
//           frappe.msgprint("🚀 Website update started successfully!");

//           // Poll build status after a few seconds
//           setTimeout(() => {
//             check_build_status(frm);
//           }, 5000);
//         } else {
//           frappe.msgprint("❌ Error: " + r.message.message);
//         }
//       },
//     });
//   },
// });

// function check_build_status(frm) {
//   frappe.call({
//     method: "support_simprosys.support_simprosys.api.get_build_status",
//     callback: function (r) {
//       if (r.message.status === "success") {
//         frappe.msgprint("✅ Build Completed Successfully!");
//       } else if (r.message.status === "failed") {
//         frappe.msgprint("❌ Build Failed: " + r.message.message);
//       } else {
//         frappe.msgprint("⚠️ Build status: " + r.message.status);
//       }
//     },
//   });
// }


// * Currently Working JS
frappe.ui.form.on("Update Simprosys Website", {
  update: function (frm) {
    // Clear logs before build
    frm.set_value("logs", "");

    // Realtime log listener
    frappe.realtime.on("astro_build_logs", function (data) {
      if (data.log) {
        let currentLogs = frm.doc.logs || "";
        frm.set_value("logs", currentLogs + data.log + "\n");
        frm.refresh_field("logs");
      }
    });

    // Trigger build without freeze
    frappe.call({
      method:
        "support_simprosys.support_simprosys.api.trigger_astro_build_realtime",
      callback: function (r) {
        if (r.message.status === "success") {
          frappe.msgprint("✅ Build Successful");
        } else {
          frappe.msgprint("❌ Build Failed: " + r.message.message);
        }
      },
    });
  },
});
// * ----------------------------------

// frappe.ui.form.on("Update Simprosys Website", {
//   update: function (frm) {
//     // Clear logs before starting the build
//     frm.set_value("logs", "");

//     // Prevent duplicate listeners
//     frappe.realtime.off("astro_build_logs");

//     // Realtime log subscription
//     frappe.realtime.on("astro_build_logs", function (data) {
//       if (data.log) {
//         let currentLogs = frm.doc.logs || "";
//         frm.set_value("logs", currentLogs + data.log + "\n");
//         frm.refresh_field("logs");
//       }
//     });

//     // Disable button and show message that build is in progress
//     let $btn = frm.fields_dict.update.$wrapper.find("button");
//     $btn.prop("disabled", true); // Disable the button

//     // Show custom message to the user
//     frm.set_df_property("logs", "read_only", 1); // Make the logs field read-only
//     frm.set_value("logs", "🚧 Build is in progress... Please wait.");
//     frm.refresh_field("logs");

//     // Trigger the build
//     frappe.call({
//       method:
//         "support_simprosys.support_simprosys.api.trigger_astro_build_realtime",
//       callback: function (r) {
//         // Re-enable the button once build is finished
//         $btn.prop("disabled", false);

//         // Check build result
//         if (r.message.status === "success") {
//           frappe.msgprint("✅ Build Successful");
//           frm.set_value("logs", "✅ Build Completed Successfully.");
//         } else {
//           frappe.msgprint("❌ Build Failed: " + r.message.message);
//           frm.set_value("logs", "❌ Build Failed: " + r.message.message);
//         }

//         frm.refresh_field("logs"); // Refresh logs after update
//       },
//       error: function () {
//         // In case of error
//         $btn.prop("disabled", false);
//         frappe.msgprint("❌ Build Failed: Unexpected error occurred.");
//         frm.set_value("logs", "❌ Build Failed: Unexpected error occurred.");
//         frm.refresh_field("logs");
//       },
//     });
//   },
// });

