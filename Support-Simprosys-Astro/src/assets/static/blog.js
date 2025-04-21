//! Image Popup Modal
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("mediaModal");
  const modalContent = document.getElementById("modalContent");
  const closeModal = document.getElementById("closeModal");

  // Function to open modal with dynamic content
  function openModal(content) {
    modalContent.innerHTML = content;
    modal.classList.remove("hidden");
  }

  // Function to close modal
  closeModal.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  // Event delegation for images inside .ql-editor only
  document.body.addEventListener("click", function (event) {
    if (event.target.tagName === "IMG" && event.target.closest(".ql-editor")) {
      // Open modal only for images inside .ql-editor
      openModal(`<img src="${event.target.src}" class="w-full rounded-lg" />`);
    }
  });
});
