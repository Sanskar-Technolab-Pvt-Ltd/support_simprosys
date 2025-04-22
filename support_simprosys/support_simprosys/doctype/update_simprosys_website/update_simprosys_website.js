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
//     // Prevent duplicate listener
//     frappe.realtime.off("astro_build_logs");

//     // Clear logs
//     frm.set_value("logs", "");

//     // Disable button (UI-safe way)
//     const $btn = frm.fields_dict.update.$wrapper.find("button");
//     $btn.prop("disabled", true);

//     // Show freeze message
//     frappe.freeze("🚧 Building in progress... Please wait.");

//     // Listen for realtime logs
//     frappe.realtime.on("astro_build_logs", function (data) {
//       if (data.log) {
//         let currentLogs = frm.doc.logs || "";
//         frm.set_value("logs", currentLogs + data.log + "\n");
//         frm.refresh_field("logs");
//       }
//     });

//     // Trigger build
//     frappe.call({
//       method: "support_simprosys.support_simprosys.api.trigger_astro_build_realtime",
//       callback: function (r) {
//         frappe.unfreeze();
//         $btn.prop("disabled", false);

//         if (r.message.status === "success") {
//           frappe.msgprint("✅ Build Successful");
//         } else {
//           frappe.msgprint("❌ Build Failed: " + r.message.message);
//         }
//       },
//       error: function () {
//         frappe.unfreeze();
//         $btn.prop("disabled", false);
//         frappe.msgprint("❌ Build Failed due to unexpected error.");
//       }
//     });
//   },
// });

