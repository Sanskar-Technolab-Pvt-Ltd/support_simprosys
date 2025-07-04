//* Debounce function to optimize API calls
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const api_url = import.meta.env.PUBLIC_ApiUrl;

//* Function to fetch search results
async function fetchSearchResults(keyword) {
  const resultsContainer = document.getElementById("searchResults");
  try {
    const response = await fetch(
      `${api_url}/api/method/support_simprosys.support_simprosys.api.search_blog?keyword=${keyword}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${import.meta.env.PUBLIC_ApiKey}:${
            import.meta.env.PUBLIC_SecretKey
          }`, // API authorization token
        },
        mode: "cors",
      }
    );
    const dataJson = await response.json();
    const blogArray = (dataJson.message || []).slice(0, 20); // Get only first 20 items
    resultsContainer.innerHTML = ""; // Clear old results

    if (blogArray.length > 0) {
      const wrapperDiv = document.createElement("div"); // Create a wrapper div
      wrapperDiv.className =
        "searchResults rounded-t-2xl rounded-b-2xl shadow-md bg-white max-h-80 overflow-y-auto"; // Styling

      blogArray.forEach((blog, index) => {
        const resultItem = document.createElement("a");
        resultItem.href = `/faq/${blog.slug}`; // Assuming each blog has a slug
        resultItem.className =
          "result-item flex p-4 sm:p-5 gap-3 bg-white hover:bg-slate-100 hover:rounded-2xl border-b";
        resultItem.innerHTML = `
          <img src="${api_url}/files/searchNote.svg" alt="noteIcon" />
          <div class="text-start">
            <p class="text-sm sm:text-base text-[#25282B]">
              ${highlightKeyword(
                blog.blog_title,
                keyword
              )} <!-- Highlight the keyword in blog title -->
            </p>
            <p class="text-[#25282B] text-xs sm:text-sm opacity-70">
              ${blog.first_level_category || "Unknown Category"} - ${
          blog.second_level_category || "Unknown Category"
        }
            </p>
          </div>`;
        resultItem.dataset.index = index; // Set index for keyboard navigation
        wrapperDiv.appendChild(resultItem);
      });
      resultsContainer.appendChild(wrapperDiv);
      resultsContainer.classList.remove("hidden"); // Show results

      // Reset selected index and attach keyboard navigation after results are rendered
      selectedIndex = -1;
      addKeyboardNavigation();
    } else {
      resultsContainer.classList.add("hidden"); // Hide if no results
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

// Function to highlight the searched keyword
// Function to highlight the searched keyword
function highlightKeyword(text, keyword) {
  if (!keyword) return text;

  // Split keyword by space and filter out empty strings
  const words = keyword.trim().split(/\s+/).filter(Boolean);

  // Escape each word for regex
  const escapedWords = words.map((word) =>
    word.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
  );

  // Create one combined regex to match all words
  const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");

  // Replace each match with highlight span
  return text.replace(regex, (match) => {
    return `<span class="bg-[#FFF8D1]">${match}</span>`;
  });
}




//! Event listener for input with debounce
// document.getElementById("searchInput").addEventListener(
//   "input",
//   debounce((event) => {
//     fetchSearchResults(event.target.value);
//   }, 150)
// );

// // Event listener to trigger search when input is focused
// document.getElementById("searchInput").addEventListener("focus", (event) => {
//   fetchSearchResults(event.target.value);
// });
//! ----------------------------------- //


// Event listener for input with debounce
document.getElementById("searchInput").addEventListener(
  "input",
  debounce((event) => {
    const keyword = event.target.value.trim();
    if (keyword.length > 1) {
      fetchSearchResults(keyword);
    } else {
      document.getElementById("searchResults").classList.add("hidden"); // Hide results when input is too short
    }
  }, 150)
);

// Event listener to trigger search when input is focused
document.getElementById("searchInput").addEventListener("focus", (event) => {
  const keyword = event.target.value.trim();
  const resultsContainer = document.getElementById("searchResults");

  if (keyword.length > 1) {
    fetchSearchResults(keyword);
  } else {
    // Hide previous search results if keyword is short or empty
    resultsContainer.innerHTML = "";
    resultsContainer.classList.add("hidden");
  }
});


// Keyboard navigation variables
let selectedIndex = -1;

// Function to handle keyboard navigation
function addKeyboardNavigation() {
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchResults");

  searchInput.addEventListener("keydown", (event) => {
    const items = resultsContainer.querySelectorAll(".result-item");

    if (items.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      selectedIndex = (selectedIndex + 1) % items.length;
      hoverEffect(items, selectedIndex);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      hoverEffect(items, selectedIndex);
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      event.preventDefault();
      items[selectedIndex].click();
    }
  });
}

// Function to apply hover effect when navigating with keyboard
function hoverEffect(items, index) {
  items.forEach((item, i) => {
    if (i === index) {
      item.classList.add("bg-slate-100", "rounded-2xl");
      // Ensure the selected element is in view when navigating via keyboard
      item.scrollIntoView({ block: "nearest" });
    } else {
      item.classList.remove("bg-slate-100", "rounded-2xl");
    }
  });
}

// Function to simulate the search functionality when clicking a suggestion
function triggerSearch(query) {
  fetchSearchResults(query); // Trigger the search function
}

// For completeness, if you have additional link items outside the search results:
const linkItems = document.querySelectorAll(".link-item");
const searchInput = document.getElementById("searchInput");

linkItems.forEach((link) => {
  link.addEventListener("click", (event) => {
    searchInput.value = event.target.textContent.trim();
    searchInput.focus();
    searchInput.setSelectionRange(
      searchInput.value.length,
      searchInput.value.length
    );
    triggerSearch(searchInput.value);
  });
});


//* Search Page
//? Event listener to trigger search when Enter key is pressed
document.getElementById("searchInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const keyword = event.target.value.trim();
    if (keyword.length >= 2) {
      window.location.href = `/search?query=${encodeURIComponent(keyword)}`;
    }
  }
});

// ! Working code and new code are written below
// document.addEventListener("DOMContentLoaded", async () => {
//   const params = new URLSearchParams(window.location.search);
//   const keyword = params.get("query") || "";

//   // Display the keyword in the page
//   document.getElementById("search-term").textContent = keyword || "None";
//   document.getElementById("searchInput").value = keyword;

//   // const searchTermEl = document.getElementById("search-term");
//   // if (searchTermEl) {
//   //   searchTermEl.textContent = keyword || "None";
//   // }

//   // const searchInputEl = document.getElementById("searchInput");
//   // if (searchInputEl) {
//   //   searchInputEl.value = keyword;
//   // }

//   if (keyword.length >= 2) {
//     try {
//       const response = await fetch(
//         `${
//           import.meta.env.PUBLIC_ApiUrl
//         }/api/method/support_simprosys.support_simprosys.api.search_blog?keyword=${encodeURIComponent(
//           keyword
//         )}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `token ${import.meta.env.PUBLIC_ApiKey}:${
//               import.meta.env.PUBLIC_SecretKey
//             }`,
//           },
//         }
//       );

      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const dataJson = await response.json();
//       console.log("API Response:", dataJson);

//       const searchResults = dataJson.message || [];
//       const resultContainer = document.getElementById("search-results");
//       document.getElementById("searchCount").textContent =
//         searchResults.length || "0";

//       // Grouping blogs by First Level Category → Then Second Level Category
//       const groupedResults = {};

//       // Organizing blogs into categories
//       searchResults.forEach((blog) => {
//         const firstCategory = blog.first_level_category || "Unknown";
//         const secondCategory = blog.second_level_category || "Unknown";

//         if (!groupedResults[firstCategory]) {
//           groupedResults[firstCategory] = {};
//         }
//         if (!groupedResults[firstCategory][secondCategory]) {
//           groupedResults[firstCategory][secondCategory] = [];
//         }

//         groupedResults[firstCategory][secondCategory].push(blog);
//       });

//       // Generating HTML Output
//       if (searchResults.length > 0) {
//         let htmlContent = "";

//         Object.keys(groupedResults).forEach((firstCategory) => {
//           Object.keys(groupedResults[firstCategory]).forEach(
//             (secondCategory) => {
//               htmlContent += `
//         <p class="text-xl lg:text-2xl font-semibold mt-5">${secondCategory} - ${firstCategory}</p>
//         <ul class="ml-4 mt-4">`;

//               groupedResults[firstCategory][secondCategory].forEach((blog) => {
//                 const highlightedTitle = highlightKeyword(
//                   blog.blog_title,
//                   keyword
//                 );
//                 htmlContent += `
//           <li class="seach-li p-1 lg:p-2">
//             <a href="/faq/${blog.slug}" class="text-black text-lg hover:underline">${highlightedTitle}</a>
//           </li>`;
//               });

//               htmlContent += `</ul>`;
//             }
//           );
//         });

//         resultContainer.innerHTML = htmlContent;
//       } else {
//         resultContainer.innerHTML = `<p class="text-gray-500">No results found.</p>`;
//       }
//     } catch (error) {
//       document.getElementById(
//         "search-results"
//       ).innerHTML = `<p class="text-red-500">Error fetching search results.</p>`;
//     }
//   } else {
//     document.getElementById(
//       "search-results"
//     ).innerHTML = `<p class="text-gray-500">Please enter at least 2 characters.</p>`;
//   }
// });





// ? Changed Code of above
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("query") || "";

  const searchTermEl = document.getElementById("search-term");
  const searchInputEl = document.getElementById("searchInput");
  const searchCountEl = document.getElementById("searchCount");
  const resultContainer = document.getElementById("search-results");

  if (searchTermEl) {
    searchTermEl.textContent = keyword || "None";
  }

  if (searchInputEl) {
    searchInputEl.value = keyword;
  }

  if (!resultContainer) return; // Exit early if no container

  if (keyword.length >= 2) {
    try {
      const response = await fetch(
        `${
          import.meta.env.PUBLIC_ApiUrl
        }/api/method/support_simprosys.support_simprosys.api.search_blog?keyword=${encodeURIComponent(
          keyword
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${import.meta.env.PUBLIC_ApiKey}:${
              import.meta.env.PUBLIC_SecretKey
            }`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataJson = await response.json();

      const searchResults = dataJson.message || [];

      if (searchCountEl) {
        searchCountEl.textContent = searchResults.length.toString();
      }

      // Grouping blogs by category
      const groupedResults = {};

      searchResults.forEach((blog) => {
        const firstCategory = blog.first_level_category || "Unknown";
        const secondCategory = blog.second_level_category || "Unknown";

        if (!groupedResults[firstCategory]) {
          groupedResults[firstCategory] = {};
        }
        if (!groupedResults[firstCategory][secondCategory]) {
          groupedResults[firstCategory][secondCategory] = [];
        }

        groupedResults[firstCategory][secondCategory].push(blog);
      });

      // Generate HTML
      if (searchResults.length > 0) {
        let htmlContent = "";

        Object.keys(groupedResults).forEach((firstCategory) => {
          Object.keys(groupedResults[firstCategory]).forEach(
            (secondCategory) => {
              htmlContent += `
                <p class="text-xl lg:text-2xl font-semibold mt-5">${secondCategory} - ${firstCategory}</p>
                <ul class="ml-4 mt-4">`;

              groupedResults[firstCategory][secondCategory].forEach((blog) => {
                const highlightedTitle = highlightKeyword(
                  blog.blog_title,
                  keyword
                );
                htmlContent += `
                  <li class="seach-li p-1 lg:p-2">
                    <a href="/faq/${blog.slug}" class="text-black text-lg hover:underline">${highlightedTitle}</a>
                  </li>`;
              });

              htmlContent += `</ul>`;
            }
          );
        });

        resultContainer.innerHTML = htmlContent;
      } else {
        resultContainer.innerHTML = `<p class="text-gray-500">No results found.</p>`;
      }
    } catch (error) {
      resultContainer.innerHTML = `<p class="text-red-500">Error fetching search results.</p>`;
    }
  } else {
    resultContainer.innerHTML = `<p class="text-gray-500">Please enter at least 2 characters.</p>`;
  }
});



//* Event listener for input with debounce
document.getElementById("searchInput").addEventListener(
  "input",
  debounce((event) => {
    let keyword = event.target.value.trim();

    // Restrict input to 100 characters
    if (keyword.length > 100) {
      keyword = keyword.substring(0, 100); // Trim to 100 characters
      event.target.value = keyword; // Update input field
    }

    if (keyword.length > 1) {
      fetchSearchResults(keyword);
    } else {
      document.getElementById("searchResults").classList.add("hidden"); // Hide results when input is too short
    }
  }, 150)
);