document.addEventListener("DOMContentLoaded", async function () {
  const api_URL = import.meta.env.PUBLIC_ApiUrl;
  const apiKey = import.meta.env.PUBLIC_ApiKey;
  const secretKey = import.meta.env.PUBLIC_SecretKey;

  const firstDropdown = document.getElementById(
    "plugin_or_app_related_queries"
  ); // First dropdown
  const platformSelect = document.getElementById("platformSelect");
  const appSelect = document.getElementById("appSelect");
  const platformArrow = platformSelect.nextElementSibling;
  const appArrow = appSelect.nextElementSibling;

  //* Hide platform and app dropdowns initially
  function hidePlatformAndAppDropdowns() {
    platformSelect.style.display = "none";
    appSelect.style.display = "none";

    appArrow.style.display = "none";
    platformArrow.style.display = "none";
  }

  function showPlatformAndAppDropdowns() {
    platformSelect.style.display = "block";
    appSelect.style.display = "block";

    appArrow.style.display = "flex";
    platformArrow.style.display = "flex";
  }

  // Hide platform dropdown options initially (except the first one)
  function hidePlatformOptions() {
    Array.from(platformSelect.options).forEach((option, index) => {
      if (index !== 0) option.style.display = "none";
    });
  }

  //* Fetch Platforms
  async function fetchPlatforms() {
    try {
      const response = await fetch(
        `${api_URL}/api/resource/Simprosys%20Post%20Category?fields=["name","post_category_name"]&filters=[["category_criteria", "=", "Platform"],["status","=","publish"]]&order_by=\`order\` asc`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${apiKey}:${secretKey}`,
          },
        }
      );
      const data = await response.json();

      if (data.data) {
        platformSelect.innerHTML += data.data
          .map(
            (platform) =>
              `<option value="${platform.name}" data-display-name="${platform.post_category_name}">${platform.post_category_name}</option>`
          )
          .join("");

        // Hide platform options initially
        hidePlatformOptions();
      }
    } catch (error) {
      console.error("Error fetching platforms:", error);
    }
  }

  //* Fetch Apps based on selected Platform
  async function fetchApps(platform) {
    appSelect.innerHTML = `<option value="" disabled selected>Select App</option>`; // Reset Apps dropdown
    if (!platform) return;

    try {
      const response = await fetch(
        `${api_URL}/api/resource/Simprosys%20Post%20Category?fields=["name","post_category_name"]&filters=[["category_criteria", "=", "Category"],["parent_simprosys_post_category","=","${platform}"],["status","=","publish"]]&order_by=\`order\` asc`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${apiKey}:${secretKey}`,
          },
        }
      );
      const data = await response.json();
      if (data.data) {
        appSelect.innerHTML += data.data
          .map(
            (app) =>
              `<option value="${app.name}" data-display-name="${app.post_category_name}">${app.post_category_name}</option>`
          )
          .join("");
      }
    } catch (error) {
      console.error("Error fetching apps:", error);
    }
  }

  //* Event Listener for First Dropdown Change
  firstDropdown.addEventListener("change", function () {
    const selectedValue = this.value;

    // If "Plugin and App related query" is selected, show platform and app dropdowns
    if (selectedValue === "Plugin and App related query") {
      showPlatformAndAppDropdowns();
    } else {
      hidePlatformAndAppDropdowns();
    }

    // Show platform options only if a valid selection is made in the first dropdown
    Array.from(platformSelect.options).forEach((option, index) => {
      if (index !== 0) {
        option.style.display = selectedValue ? "block" : "none";
      }
    });
  });

  //* Event Listener for Platform Change
  platformSelect.addEventListener("change", (e) => {
    fetchApps(e.target.value);
    platformSelect.querySelector("option[value='']").disabled = true; // Disable "Select Platform"
  });

  // Event Listener for App Change
  appSelect.addEventListener("change", () => {
    appSelect.querySelector("option[value='']").disabled = true; // Disable "Select App"
  });

  // Initial Fetch for Platforms
  fetchPlatforms();

  // Initially hide platform and app dropdowns
  hidePlatformAndAppDropdowns();
});

//? Input id's
// Input id's
const name1 = document.getElementById("name1");
const company_name = document.getElementById("company_name");
const email = document.getElementById("email");

//? Msg id's
let nameMsg = document.getElementById("name1_valid");
let companyMsg = document.getElementById("company_valid");
let emailMsg = document.getElementById("email_valid");

const nameRegex =
  /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/;
const companyNameRegex = /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^A-Za-z0-9 ]*$)[A-Za-z0-9]+(?: [A-Za-z0-9]+){0,2}$/;

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

//* URL regex
const urlRegex =
  /[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([\/\w.-]*)*\/?/;



let isNameValid = false;
let isCompanyNameValid = false;
let isEmailValid = false;
let isValid = false;
let isPluginValid = false;
let isPlatformValid = false;
let isAppValid = false;
let isURLValid = true;


// Event listeners for real-time input validation
name1.addEventListener("input", () => {
  const nameValue = name1.value.trim();

  if (nameValue === "") {
    nameMsg.classList.remove("hidden");
    nameMsg.textContent = "Please fill out this field";
  } else if (!nameRegex.test(nameValue)) {
    nameMsg.classList.remove("hidden");
    nameMsg.textContent = "Please Enter Valid name";
  } else {
    nameMsg.classList.add("hidden");
    nameMsg.textContent = "";
  }
});


company_name.addEventListener("input", () => {
  const companyValue = company_name.value.trim();

  if (companyValue === "") {
    companyMsg.classList.remove("hidden");
    companyMsg.textContent = "Please fill out this field";
  } else if (!companyNameRegex.test(companyValue)) {
    companyMsg.classList.remove("hidden");
    companyMsg.textContent = "Please Enter Valid Company name";
  } else {
    companyMsg.classList.add("hidden");
    companyMsg.textContent = "";
  }
});


// email.addEventListener("input", () => {
//   if (email.value.trim() === "") {
//     emailMsg.classList.add("hidden");
//   } else {
//     emailMsg.classList.toggle("hidden", emailRegex.test(email.value.trim()));
//   }
// });
email.addEventListener("input", () => {
  const emailValue = email.value.trim();

  if (emailValue === "") {
    emailMsg.classList.remove("hidden");
    emailMsg.textContent = "Please fill out this field";
  } else if (!emailRegex.test(emailValue)) {
    emailMsg.classList.remove("hidden");
    emailMsg.textContent = "Please Enter Valid Email";
  } else {
    emailMsg.classList.add("hidden");
    emailMsg.textContent = "";
  }
});

const storeUrlInput = document.getElementById("store_url");
const errorMsg = document.getElementById("store_url_valid");

storeUrlInput.addEventListener("input", function () {
  const inputVal = storeUrlInput.value.trim();
  // Hide message if field is empty
  if (inputVal === "") {
    errorMsg.classList.add("hidden");
  } else if (!urlRegex.test(inputVal)) {
    // Show message if URL is not valid
    errorMsg.classList.remove("hidden");
    isURLValid = false;
  } else {
    // Hide message if URL is valid
    errorMsg.classList.add("hidden");
  }
});


// Get dropdown elements
const pluginSelect = document.getElementById("plugin_or_app_related_queries");
const platformSelect = document.getElementById("platformSelect");
const appSelect = document.getElementById("appSelect");

// Get validation messages
const pluginError = document.getElementById("plugin_id_valid");
const platformError = document.getElementById("platform_id_valid");
const appError = document.getElementById("app_id_valid");

// Event listeners for dropdown validation
appSelect.addEventListener("input", () => {
  if (pluginSelect.value === "Plugin and App related query" && appSelect.value === "") {
    appError.classList.remove("hidden");
    isAppValid = false;
  } else {
    appError.classList.add("hidden");
    isAppValid = true;
  }
});

platformSelect.addEventListener("input", () => {
  if (pluginSelect.value === "Plugin and App related query" && platformSelect.value === "") {
    platformError.classList.remove("hidden");
    isPlatformValid = false;
  } else {
    platformError.classList.add("hidden");
    isPlatformValid = true;
  }
});

pluginSelect.addEventListener("input", () => {
  if (pluginSelect.value === "") {
    pluginError.classList.remove("hidden");
    isPluginValid = false;
  } else {
    pluginError.classList.add("hidden");
    isPluginValid = true;
  }
});

function handleInput() {
  let NameValue = name1.value.trim();
  let CompanyNameValue = company_name.value.trim();
  let EmailValue = email.value.trim();

  // Validate Name
  if (NameValue === "") {
    nameMsg.classList.remove("hidden");
    nameMsg.textContent = "Please fill out this field";
    isNameValid = false;
  } else if (!nameRegex.test(NameValue)) {
    nameMsg.classList.remove("hidden");
    nameMsg.textContent = "Please Enter Valid name";
    isNameValid = false;
  } else {
    nameMsg.classList.add("hidden");
    nameMsg.textContent = "";
    isNameValid = true;
  }

  // Validate Company Name
  if (CompanyNameValue === "") {
    companyMsg.classList.remove("hidden");
    companyMsg.textContent = "Please fill out this field";
    isCompanyNameValid = false;
  } else if (!companyNameRegex.test(CompanyNameValue)) {
    companyMsg.classList.remove("hidden");
    companyMsg.textContent = "Please Enter Valid Company name";
    isCompanyNameValid = false;
  } else {
    companyMsg.classList.add("hidden");
    companyMsg.textContent = "";
    isCompanyNameValid = true;
  }

  // Validate Email
  // if (emailRegex.test(EmailValue)) {
  //   emailMsg.classList.add("hidden");
  //   isEmailValid = true;
  // } else {
  //   emailMsg.classList.remove("hidden");
  //   isEmailValid = false;
  // }

  
  // Validate Email
  if (EmailValue === "") {
    emailMsg.classList.remove("hidden");
      emailMsg.textContent = "Please fill out this field";
    isEmailValid = false;
  } else if (!emailRegex.test(EmailValue)) {
    emailMsg.classList.remove("hidden");
    emailMsg.textContent = "Please Enter Valid Email";
    isEmailValid = false;
  } else {
    emailMsg.classList.add("hidden");
    emailMsg.textContent = "";
    isEmailValid = true;
  }

  // Validate Plugin Dropdown
  if (pluginSelect.value === "") {
    pluginError.classList.remove("hidden");
    isPluginValid = false;
  } else {
    pluginError.classList.add("hidden");
    isPluginValid = true;
  }

  // Only validate Platform and App dropdowns if "Plugin and App related query" is selected
  if (pluginSelect.value === "Plugin and App related query") {
    // Validate Platform Dropdown
    if (platformSelect.value === "") {
      platformError.classList.remove("hidden");
      isPlatformValid = false;
    } else {
      platformError.classList.add("hidden");
      isPlatformValid = true;
    }

    // Validate App Dropdown
    if (appSelect.value === "") {
      appError.classList.remove("hidden");
      isAppValid = false;
    } else {
      appError.classList.add("hidden");
      isAppValid = true;
    }
  } else {
    // If "Plugin and App related query" is NOT selected, skip validation for Platform and App
    isPlatformValid = true;
    isAppValid = true;
  }

  if (storeUrlInput !== null) {
    const inputVal = storeUrlInput.value.trim();
    if (inputVal === "") {
      errorMsg.classList.add("hidden");
      isURLValid = true;
    } else if (!urlRegex.test(inputVal)) {
      errorMsg.classList.remove("hidden");
      isURLValid = false;
    } else {
      errorMsg.classList.add("hidden");
      isURLValid = true;
    }
  }

  if (
    isNameValid &&
    isCompanyNameValid &&
    isEmailValid &&
    isPluginValid &&
    isPlatformValid &&
    isAppValid &&
    isFileValid &&
    isURLValid
  ) {
    // Check if all validations passed
    isValid = true;
  }

  return isValid;
}


//* Attach Files
let isFileValid = true; // Default to true if no file is attached
let selectedFiles = []; // Array to store selected files

document
  .getElementById("attach_file")
  .addEventListener("change", function (event) {
    let files = event.target.files;
    let errorText = document.getElementById("file_error");
    let fileListContainer = document.getElementById("file_list");
    let fileLabel = document.getElementById("attach_file_text");

    let allowedExtensions = [
      "jpeg",
      "jpg",
      "png",
      "pdf",
      "txt",
      "zip",
      "zzip",
      "mp4",
      "docx",
      "csv",
      "webp",
    ];
    let totalSize = 0;
    let fileNames = [];
    let invalidFiles = [];

    fileListContainer.innerHTML = "";

    for (let i = 0; i < files.length; i++) {
      let fileExtension = files[i].name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        invalidFiles.push(files[i].name);
      } else {
        selectedFiles.push(files[i]);
      }
    }

    if (invalidFiles.length > 0) {
      errorText.textContent = `Invalid file types: ${invalidFiles.join(
        ", "
      )}. Allowed formats: ${allowedExtensions.join(", ")}`;
      event.target.value = "";
      return;
    } else {
      errorText.textContent = "";
    }

    selectedFiles.forEach((file) => {
      totalSize += file.size;
      fileNames.push(file.name);
    });

    let maxSizeMB = 25;
    let totalSizeMB = totalSize / (1024 * 1024);

    if (totalSizeMB > maxSizeMB) {
      errorText.textContent = `Total file size must be under ${maxSizeMB}MB.`;
      event.target.value = "";
      selectedFiles = [];
      isFileValid = false;
      fileLabel.textContent = "Attach File";
      return;
    } else {
      errorText.textContent = "";
      isFileValid = true;
    }

    function removeFile(fileIndex) {
      selectedFiles.splice(fileIndex, 1);
      updateFileDisplay();
    }

    function updateFileDisplay() {
      fileListContainer.innerHTML = "";
      selectedFiles.forEach((file, index) => {
        let fileDiv = document.createElement("div");
        fileDiv.classList.add("file-item");
        fileDiv.textContent = file.name;

        let cancelButton = document.createElement("button");
        cancelButton.textContent = "x";
        cancelButton.classList.add("cancel-btn");
        cancelButton.addEventListener("click", function () {
          removeFile(index);
        });

        fileDiv.appendChild(cancelButton);
        fileListContainer.appendChild(fileDiv);
      });
    }

    updateFileDisplay();
  });

document.getElementById("cancel_file").addEventListener("click", function () {
  let fileInput = document.getElementById("attach_file");
  let fileListContainer = document.getElementById("file_list");

  fileInput.value = "";
  fileListContainer.innerHTML = "";
  document.getElementById("file_error").textContent = "";
  selectedFiles = [];
  isFileValid = true;
});



const form = document.getElementById("form_id");
// Submit

function showpopup(response) {
  const successPopup = document.getElementById("success-popup");
  const form = document.getElementById("form_id"); // Replace with your actual form ID
  let cancelButton = document.getElementById("cancel_file");

  if (response.ok) {
    // Show the pop-up message
    successPopup.classList.remove("hidden");
    console.log("Ticket created successfully.");

    // Close popup when clicked
    document.getElementById("closePopup").addEventListener("click", () => {
      successPopup.classList.add("hidden");
      cancelButton.classList.add("hidden"); 
      document.getElementById("attach_file_text").textContent = "Attach File";
      document.getElementById("file_list").innerHTML = "";
      form.reset(); // Reset the form
      location.reload(); // Reloads the entire page
    });

    // Hide the pop-up and reset the form after 3 seconds
    setTimeout(() => {
      successPopup.classList.add("hidden");
      cancelButton.classList.add("hidden"); 
      document.getElementById("attach_file_text").textContent = "Attach File";
      document.getElementById("file_list").value = "";
      form.reset(); // Reset the form
      location.reload(); // Reloads the entire page

    }, 3000); // 3000 milliseconds (3 seconds)

    if (response.status === 100) {
      // Show the pop-up message
      successPopup.classList.remove("hidden");
      console.log("Document created successfully.");
    } else {
      console.error("Failed to create document.");
    }
  } else {
    console.error("Failed to create document.");
  }
}

/**
 * Handles the form submission event for creating a support ticket.
 * Validates inputs, uploads files, submits the ticket, and handles responses.
 *
 * @param {Event} event - The form submission event
 */
  async function submitTicket(event) {
    event.preventDefault();
    
    
    const validationForm = handleInput();
    if (validationForm) {
    const api_URL = import.meta.env.PUBLIC_ApiUrl;
    const apiKey = import.meta.env.PUBLIC_ApiKey;
    const secretKey = import.meta.env.PUBLIC_SecretKey;
    const fileInput = document.querySelector("#attach_file");
    console.log("Called")
    let uploadedFiles = [];

    if (fileInput.files.length > 0) {
      const fileUploadPromises = [...fileInput.files].map(async (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("is_private", 0);

    const uploadResponse = await fetch(`${api_URL}/api/method/upload_file`, {
      method: "POST",
      headers: {
        Authorization: `token ${apiKey}:${secretKey}`,
      },
      body: uploadData,
    });

    const uploadResult = await uploadResponse.json();

    if (uploadResponse.ok && uploadResult.message.file_url) {
      return uploadResult.message.file_url;
    } else {
      throw new Error(
        "File upload failed: " + (uploadResult.message?.error || "Unknown error")
      );
    }
  });

  try {
    uploadedFiles = await Promise.all(fileUploadPromises);
  } catch (err) {
    console.error("Upload error:", err);
    alert("File upload failed: " + err.message);
    return;
  }

  }
  
  const platformSelectEl = document.querySelector("#platformSelect");
  const appSelectEl = document.querySelector("#appSelect");
  const selectedPlatform = platformSelectEl.options[platformSelectEl.selectedIndex];
  const selectedApp = appSelectEl.options[appSelectEl.selectedIndex];


  const formData = {
    name1: document.querySelector("#name1").value,
    company_name: document.querySelector("#company_name").value,
    store_url: document.querySelector("#store_url").value,
    email: document.querySelector("#email").value,
    plugin_or_app_related_queries: document.querySelector(
      "#plugin_or_app_related_queries"
    ).value,
    platform: selectedPlatform ? selectedPlatform.getAttribute("data-display-name") : "",
    app: selectedApp ? selectedApp.getAttribute("data-display-name") : "",
    additional_details: document.querySelector("#message").value,
  };

  try {
    const response = await fetch(
      `${api_URL}/api/resource/Support%20Simprosys%20Ticket`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${apiKey}:${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();

    if (response.ok) {
      let ticketName = result.data.name;
      console.log("Ticket Name",ticketName)
      showpopup(response);
      await attachFilesToDoctype(ticketName, uploadedFiles);
      await sendEmail(ticketName)
    } else {
      alert("Error: " + result.error);
    }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to submit ticket!");
    }
}
}

async function attachFilesToDoctype(ticketName, fileUrls) {
  const api_URL = import.meta.env.PUBLIC_ApiUrl;
  const apiKey = import.meta.env.PUBLIC_ApiKey;
  const secretKey = import.meta.env.PUBLIC_SecretKey;
  console.log("\nTicket Name",ticketName)
  console.log("\nFile URL",fileUrls)
  for (let fileUrl of fileUrls) {
    const attachData = {
      file_url: fileUrl,
      attached_to_doctype: "Support Simprosys Ticket",
      attached_to_name: ticketName,
    };

    try {
      await fetch(`${api_URL}/api/resource/File`, {
        method: "POST",
        headers: {
          Authorization: `token ${apiKey}:${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attachData),
      });
    } catch (error) {
      console.error("Attachment error:", error);
    }
  }
}

async function sendEmail(ticketName){
  const api_URL = import.meta.env.PUBLIC_ApiUrl;
  const apiKey = import.meta.env.PUBLIC_ApiKey;
  const secretKey = import.meta.env.PUBLIC_SecretKey;
  console.log("Email Send")
  try {
  const emailResponse = await fetch(
    `${api_URL}/api/method/support_simprosys.support_simprosys.api.send_support_ticket_email?docname=${ticketName}`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${apiKey}:${secretKey}`,
          },
        }
      );

      console.log("Email Response Status:", emailResponse.status);
      const emailResult = await emailResponse.json();
      console.log("Email API response:", emailResult);
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
    }
    console.log("Email successfully gone ")
}


window.submitTicket = submitTicket;