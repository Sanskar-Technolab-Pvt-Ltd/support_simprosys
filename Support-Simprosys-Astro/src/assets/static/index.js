//* For Navbar

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  const header = document.getElementById("header");

  if (
    document.body.scrollTop > 30 ||
    document.documentElement.scrollTop > 30
  ) {
    header.classList.add("header-fixed");
    header.classList.remove("header-initial");
  } else {
    header.classList.remove("header-fixed");
    header.classList.add("header-initial");
  }
}






//* Integration List dropdown
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown");
  let activeDropdown = null;
  let activeArrowIcon = null;

  // ✅ Detect if the user came from the FAQ page
  const cameFromFAQ = sessionStorage.getItem("cameFromFAQ");
  const selectedDropdownName = sessionStorage.getItem("selectedDropdown");

  let dropdownToOpen = null;
  let arrowIconToOpen = null;
  let shouldScroll = false; // ✅ New flag to control scrolling

  if (cameFromFAQ === "true" && selectedDropdownName) {
    dropdowns.forEach((dropdown) => {
      const toggleSection = dropdown.nextElementSibling;
      const arrowIcon = dropdown.querySelector(".arrow-icon");
      const categoryName = dropdown.textContent.trim(); // Get dropdown text

      // ✅ Open the stored dropdown if it matches
      if (categoryName === selectedDropdownName) {
        dropdownToOpen = toggleSection;
        arrowIconToOpen = arrowIcon;
        shouldScroll = true; // ✅ Only scroll when user came from FAQ
      }
    });

    // ✅ Clear storage after use
    sessionStorage.removeItem("cameFromFAQ");
    sessionStorage.removeItem("selectedDropdown");
  }

  // ✅ If no specific dropdown was found, open the first one by default
  if (!dropdownToOpen && dropdowns.length > 0) {
    dropdownToOpen = dropdowns[0].nextElementSibling;
    arrowIconToOpen = dropdowns[0].querySelector(".arrow-icon");
  }

  // ✅ Open the selected or default dropdown
  if (dropdownToOpen) {
    dropdownToOpen.classList.remove("hidden");
    arrowIconToOpen.classList.add("rotate");
    activeDropdown = dropdownToOpen;
    activeArrowIcon = arrowIconToOpen;

    // ✅ Scroll only if user came from FAQ
    if (shouldScroll) {
      setTimeout(() => {
        const scrollPosition =
          dropdownToOpen.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight / 4; // Adjusted scroll position

        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }, 200);
    }
  }

  // ✅ Click event for breadcrumbs
  window.storeDropdownSelection = function (event, categoryName) {
    event.preventDefault(); // Prevent default navigation
    sessionStorage.setItem("cameFromFAQ", "true");
    sessionStorage.setItem("selectedDropdown", categoryName);

    // ✅ Navigate to the clicked breadcrumb link
    window.location.href = event.currentTarget.href;
  };

  // ✅ Click event for dropdowns
  dropdowns.forEach((dropdown) => {
    const toggleSection = dropdown.nextElementSibling;
    const arrowIcon = dropdown.querySelector(".arrow-icon");

    dropdown.addEventListener("click", function () {
      const isCurrentlyOpen = toggleSection === activeDropdown;

      // Close previous dropdown
      if (activeDropdown && activeDropdown !== toggleSection) {
        activeDropdown.classList.add("hidden");
        activeArrowIcon.classList.remove("rotate");
      }

      // Toggle clicked dropdown
      if (isCurrentlyOpen) {
        toggleSection.classList.add("hidden");
        arrowIcon.classList.remove("rotate");
        activeDropdown = null;
        activeArrowIcon = null;
      } else {
        toggleSection.classList.remove("hidden");
        arrowIcon.classList.add("rotate");
        activeDropdown = toggleSection;
        activeArrowIcon = arrowIcon;

        // ✅ Improved Scroll Behavior: Only scroll for non-first dropdowns
        setTimeout(() => {
          if (dropdown !== dropdowns[0]) {
            const scrollPosition =
              dropdown.getBoundingClientRect().top +
              window.scrollY -
              window.innerHeight / 4; // Adjusted scroll position

            window.scrollTo({
              top: scrollPosition,
              behavior: "smooth",
            });
          }
        }, 300);
      }
    });
  });
});









//* Blog Dropdown
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown-details");
  let activeDropdown = null;

  dropdowns.forEach((dropdown, index) => {
    const toggleSection = dropdown.nextElementSibling;
    const arrowIcon = dropdown.querySelector(".arrow-icon");
    const activeLink = toggleSection.querySelector(".activeClass");

    if (activeLink) {
      toggleSection.classList.remove("hidden");
      arrowIcon.classList.add("rotate");
      activeDropdown = toggleSection;
    }

    dropdown.addEventListener("click", function () {
      if (activeDropdown && activeDropdown !== toggleSection) {
        activeDropdown.classList.add("hidden");
        const activeArrowIcon =
          activeDropdown.previousElementSibling.querySelector(".arrow-icon");
        activeArrowIcon.classList.remove("rotate");
      }

      const isCurrentlyHidden = toggleSection.classList.contains("hidden");

      if (isCurrentlyHidden) {
        toggleSection.classList.remove("hidden");
        arrowIcon.classList.add("rotate");
        activeDropdown = toggleSection;

        // ✅ Scroll only if dropdown index is 3 or more (i.e., 4th onwards)
        if (index >= 3) {
          setTimeout(() => {
            const scrollPosition =
              dropdown.getBoundingClientRect().top +
              window.scrollY -
              window.innerHeight / 4;

            window.scrollTo({
              top: scrollPosition,
              behavior: "smooth",
            });
          }, 200);
        }
      } else {
        toggleSection.classList.add("hidden");
        arrowIcon.classList.remove("rotate");
        activeDropdown = null;
      }
    });
  });
});






document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Show search results when the input is focused
    searchInput.addEventListener('focus', function() {
        searchResults.classList.remove('hidden'); // Show the results block
    });

    // Hide search results when the input loses focus
    searchInput.addEventListener('blur', function() {
        // Delay hiding to allow clicks inside the results to work
        setTimeout(function() {
            if (!searchResults.contains(document.activeElement)) {
                searchResults.classList.add('hidden'); // Hide the results block
            }
        }, 100);
    });
});


//? Footer Email

const api_URL = import.meta.env.PUBLIC_ApiUrl;
const apiKey = import.meta.env.PUBLIC_ApiKey;
const secretKey = import.meta.env.PUBLIC_SecretKey;


document
  .getElementById("subscribe_email")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("emailInput");
    const email = emailInput.value.trim();
    const emailMessage = document.getElementById("emailError");

    // Clear previous messages
    emailMessage.classList.remove("hidden");
    emailMessage.style.color = "";

    // Step 1: Empty field check
    if (!email) {
      emailMessage.textContent = "Please enter email address";
      emailMessage.style.color = "red";
      return;
    }

    // Step 2: Email format check
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      emailMessage.textContent = "Enter a valid Email Address";
      emailMessage.style.color = "red";
      return;
    }

    // Step 3: Check if email already exists
    try {
      const checkResponse = await fetch(
        `${api_URL}/api/resource/Simprosy%20Newsletter%20Subscriber?filters=[["email","=","${email}"]]`,
        {
          headers: {
            Authorization: `token ${apiKey}:${secretKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const checkData = await checkResponse.json();

      if (checkData?.data?.length > 0) {
        // Step 4: Already subscribed
        emailMessage.textContent = "This email is already subscribed.";
        emailMessage.style.color = "yellow";
        return;
      }
    } catch (error) {
      console.error("Error checking email existence:", error);
      emailMessage.textContent = "Something went wrong! Please try again.";
      emailMessage.style.color = "red";
      return;
    }

    // Step 5: Insert new email
    try {
      const postResponse = await fetch(
        `${api_URL}/api/resource/Simprosy%20Newsletter%20Subscriber`,
        {
          method: "POST",
          headers: {
            Authorization: `token ${apiKey}:${secretKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const postResult = await postResponse.json();

      if (postResponse.ok) {
        emailMessage.textContent = "Subscribed Successfully!";
        emailMessage.style.color = "yellow";
        emailInput.value = "";
      } else {
        emailMessage.textContent =
          postResult?.message || "Subscription failed!";
        emailMessage.style.color = "red";
      }
    } catch (error) {
      console.error("Error inserting email:", error);
      emailMessage.textContent = "Subscription failed!";
      emailMessage.style.color = "red";
    }
  });

