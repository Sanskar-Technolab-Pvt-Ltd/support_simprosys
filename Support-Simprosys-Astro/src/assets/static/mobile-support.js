

// document.querySelectorAll(".button-platform").forEach((button) => {
//   button.addEventListener("click", () => {
//     const platform = button.getAttribute("data-platform");
//     const content = document.querySelector(
//       `.platform-mobile-content[data-platform="${platform}"]`
//     );

//     // Check if the button is already active
//     if (button.classList.contains("active-mobile-button")) {
//       // If active, deactivate the button and hide its content
//       button.classList.remove("active-mobile-button");
//       content.style.display = "none";
//     } else {
//       // Remove 'active-mobile-button' class from all buttons
//       document.querySelectorAll(".button-platform").forEach((btn) => {
//         btn.classList.remove("active-mobile-button");
//       });

//       // Add 'active-mobile-button' class to the clicked button
//       button.classList.add("active-mobile-button");

//       // Hide all content
//       document
//         .querySelectorAll(".platform-mobile-content")
//         .forEach((content) => {
//           content.style.display = "none";
//         });

//       // Show the content for the selected platform
//       content.style.display = "grid";

//       // Scroll to include both button and content
//       button.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   });
// });

// document.querySelectorAll(".button-platform").forEach((button) => {
//   button.addEventListener("click", () => {
//     // Remove 'active-mobile-button' class from all buttons
//     document.querySelectorAll(".button-platform").forEach((btn) => {
//       btn.classList.remove("active-mobile-button");
//     });

//     // Add 'active-mobile-button' class to the clicked button
//     button.classList.add("active-mobile-button");

//     // Hide all content
//     document.querySelectorAll(".platform-mobile-content").forEach((content) => {
//       content.style.display = "none";
//     });

//     // Show the content for the selected platform
//     const platform = button.getAttribute("data-platform");
//     document.querySelector(
//       `.platform-mobile-content[data-platform="${platform}"]`
//     ).style.display = "grid";
//   });
// });


// //* Get all buttons and contents
// const buttons = document.querySelectorAll(".button-platform");
// const contents = document.querySelectorAll(".platform-mobile-content");

// const setActiveButton = (button) => {
//   const platform = button.getAttribute("data-platform");
//   const content = document.querySelector(
//     `.platform-mobile-content[data-platform="${platform}"]`
//   );

//   // Check if the clicked button is already active
//   const isActive = button.classList.contains("active-mobile-button");

//   // Remove active class from all buttons
//   buttons.forEach((btn) => btn.classList.remove("active-mobile-button"));

//   // Hide all content
//   contents.forEach((content) => (content.style.display = "none"));

//   if (!isActive) {
//     // If not active, activate the clicked button and show content
//     button.classList.add("active-mobile-button");
//     if (content) {
//       content.style.display = "grid";
//     }
//   }
// };

// // Set first button as active on page load
// if (buttons.length > 0) {
//   setActiveButton(buttons[0]);
// }

// // Add click event to each button
// buttons.forEach((button) => {
//   button.addEventListener("click", () => {
//     setActiveButton(button);

//     // Scroll to include both button and content
//     button.scrollIntoView({ behavior: "smooth", block: "center" });
//   });
// });


// Get all buttons and contents
const buttons = document.querySelectorAll(".button-platform");
const contents = document.querySelectorAll(".platform-mobile-content");

// Hide all contents initially
contents.forEach((content) => {
  content.style.display = "none";
});

const setActiveButton = (button) => {
  const platform = button.getAttribute("data-platform");
  const content = document.querySelector(
    `.platform-mobile-content[data-platform="${platform}"]`
  );

  // Check if the clicked button is already active
  const isActive = button.classList.contains("active-mobile-button");

  // Remove active class from all buttons
  buttons.forEach((btn) => btn.classList.remove("active-mobile-button"));

  // Hide all content
  contents.forEach((content) => (content.style.display = "none"));

  if (!isActive) {
    // If not active, activate the clicked button and show content
    button.classList.add("active-mobile-button");
    if (content) {
      content.style.display = "grid";
    }
  }
};

// Add click event to each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveButton(button);

    // Scroll to include both button and content
    button.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});