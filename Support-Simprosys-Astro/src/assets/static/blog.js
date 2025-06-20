(async () => {
  const slug = window.location.pathname.split('/').pop();

  if (!slug) {
    console.error("No slug provided in URL");
    return;
  }

  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_ApiUrl}/api/resource/Simprosys Blog?fields=["redirect_url"]&filters=${encodeURIComponent(JSON.stringify([
        ["slug", "=", slug]
      ]))}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${import.meta.env.PUBLIC_ApiKey}:${import.meta.env.PUBLIC_SecretKey}`,
        },
      }
    );

    const json = await res.json();
    const data = json.data;

    if (data && data.length > 0) {
      const redirectUrl = data[0].redirect_url; // ✅ CORRECT access

      console.log("Redirecting to:", redirectUrl);
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.log("No redirect_url found.");
      }
    } else {
      console.log("No blog found for this slug.");
    }

  } catch (err) {
    console.error("Error fetching blog details:", err);
  }
})();



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
