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
//       method:
//         "support_simprosys.support_simprosys.api.trigger_astro_build_realtime",
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


let is_build_in_progress = false;

frappe.ui.form.on("Update Simprosys Website", {
  onload: function (frm) {
    style_logs_area(frm);

    frappe.call({
      method: "support_simprosys.support_simprosys.api.get_current_build_log",
      callback: function (r) {
        const log = r.message;

        if (log) {
          show_logs_from_server(frm, log.logs);

          if (log.status === "Processing") {
            is_build_in_progress = true;
            disable_update_button(frm);
            attach_log_listener(frm);
          } else {
            is_build_in_progress = false;
            enable_update_button(frm);
          }
        } else {
          is_build_in_progress = false;
          enable_update_button(frm);
        }
      },
    });
  },

  update: function (frm) {
    if (is_build_in_progress) {
      frappe.msgprint("⚠️ A build is already in progress.");
      return;
    }

    is_build_in_progress = true;
    disable_update_button(frm);
    frm.fields_dict["logs"].$wrapper.html(""); // Clear logs
    style_logs_area(frm); // Reapply styling
    attach_log_listener(frm); // Start listening to logs

    frappe.call({
      method:
        "support_simprosys.support_simprosys.api.trigger_astro_build_realtime",
      callback: function (r) {
        if (r.message.status === "success") {
          frappe.msgprint("✅ Build successfully Completed");
        } else if (r.message.status === "in_progress") {
          frappe.msgprint("⏳ Build already in progress.");
        } else {
          frappe.msgprint("❌ Build Failed: " + r.message.message);
          is_build_in_progress = false;
          enable_update_button(frm);
        }
      },
    });
  },
});

function disable_update_button(frm) {
  frm.set_df_property("update", "hidden", 1);
  frm.refresh_field("update");
}

function enable_update_button(frm) {
  frm.set_df_property("update", "hidden", 0);
  frm.refresh_field("update");
}

// Show logs from server if any
function show_logs_from_server(frm, logs) {
  if (!logs) return;

  const wrapper = frm.fields_dict["logs"].$wrapper;
  const lines = logs.split("\n");

  for (let line of lines) {
    wrapper.append(`<pre style="margin: 0; color:black;">${line}</pre>`);
  }

  wrapper.scrollTop(wrapper[0].scrollHeight);
}

// Listen to logs via socket
function attach_log_listener(frm) {
  frappe.realtime.off("astro_build_logs"); // Remove existing listeners to avoid duplicates

  frappe.realtime.on("astro_build_logs", function (data) {
    if (data.log) {
      const wrapper = frm.fields_dict["logs"].$wrapper;
      wrapper.append(`<pre style="margin: 0;">${data.log}</pre>`);
      wrapper.scrollTop(wrapper[0].scrollHeight);

      // Optional: if you emit a known "complete" keyword
      if (data.log.includes("BUILD COMPLETE") || data.log.includes("Done in")) {
        is_build_in_progress = false;
        enable_update_button(frm);
      }
    }
  });
}

// Styling for log output
function style_logs_area(frm) {
  frm.fields_dict["logs"].$wrapper.css({
    "max-height": "400px",
    "overflow-y": "auto",
    "background-color": "#f9f9f9",
    padding: "10px",
    border: "1px solid #ddd",
    "font-family": "monospace",
  });
}

// * ----------------------------------


// ! Use HTML field

// frappe.ui.form.on("Update Simprosys Website", {
//   update: function (frm) {
//     // Clear logs and apply styling
//     frm.fields_dict["logs"].$wrapper
//       .css({
//         "max-height": "400px",
//         "overflow-y": "auto",
//         "background-color": "#f9f9f9",
//         padding: "10px",
//         border: "1px solid #ddd",
//         "font-family": "monospace",
//       })
//       .html("");

//     // Realtime log listener
//     frappe.realtime.on("astro_build_logs", function (data) {
//       if (data.log) {
//         let wrapper = frm.fields_dict["logs"].$wrapper;
//         wrapper.append(`<pre style="margin: 0;">${data.log}</pre>`);
//         wrapper.scrollTop(wrapper[0].scrollHeight); // Auto-scroll to bottom
//       }
//     });

//     // Trigger build
//     frappe.call({
//       method:
//         "support_simprosys.support_simprosys.api.trigger_astro_build_realtime",
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