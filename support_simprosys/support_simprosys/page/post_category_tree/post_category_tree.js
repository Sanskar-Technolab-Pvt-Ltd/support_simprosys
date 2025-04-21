/**
 * On page load callback for the Simprosys Blog Category Mapping page.
 *
 * This is a special page that displays a tree view of all blog categories
 * and their associated blogs. The tree is fetched from the API and rendered
 * in the page.
 *
 * The page also includes buttons to expand and collapse all nodes in the tree.
 *
 */
frappe.pages["post-category-tree"].on_page_load = function (wrapper) {
  let page = frappe.ui.make_app_page({
    parent: wrapper,
    title: "Simprosys Blog Category Mapping",
    single_column: true,
  });

  let collapse_button = page.add_button("Collapse All", function () {
    $(".nested").hide();
    $(".folder-icon").removeClass("open").html("📁");
  });

  let expand_button = page.add_button("Expand All", function () {
    $(".nested").show();
    $(".folder-icon").addClass("open").html("📂");
  });

  $(expand_button).css({ "margin-right": "10px" });
  $(collapse_button).css({ "margin-right": "10px" });

  let $container = $("<div id='tree-container'></div>").appendTo(page.main);

  // Fetch tree data from API
  frappe.call({
    method: "support_simprosys.support_simprosys.api.get_post_category_tree",
    callback: function (r) {
      if (r.message) {
        renderTree(r.message);
      }
    },
  });

  function renderTree(data) {
    $container.html("<ul class='tree'>" + buildTreeHTML(data) + "</ul>");

    $(".nested").show(); // Show all folders initially

    $(".toggle").click(function () {
      let $icon = $(this).find(".folder-icon");
      $(this).siblings("ul").toggle();
      if ($icon.hasClass("open")) {
        $icon.removeClass("open").html("📁");
      } else {
        $icon.addClass("open").html("📂");
      }
    });
  }

  function buildTreeHTML(nodes) {
    let html = "";
    nodes.forEach((node) => {
      let isCategory = !node.type; // Categories don't have a 'type' field, blogs do.
      let folderIcon = isCategory
        ? `<span class="folder-icon open">📂</span>`
        : ""; // Only categories get folder icons.
      let toggleWrapper = isCategory
        ? `<span class="toggle">${folderIcon}</span> `
        : "";

      let label = node.title
        ? `<a href='/app/simprosys-blog/${node.name}' target='_blank'>📝 ${node.title}</a>`
        : `<a href='/app/simprosys-post-category/${node.name}' target='_blank'>${node.name}</a>`;

      html += `<li>${toggleWrapper}${label}`;
      if (isCategory && node.children) {
        html += `<ul class='nested' style='display: block;'>${buildTreeHTML(
          node.children
        )}</ul>`;
      }
      html += "</li>";
    });
    return html;
  }


  // Add CSS for styling
  $("<style>")
    .prop("type", "text/css")
    .html(
      `
      .tree { list-style-type: none; padding-left: 20px; }
      .toggle { cursor: pointer; font-size: 14px; margin-right: 5px; }
      .folder-icon { margin-right: 5px; }
      .folder-icon.open { font-weight: bold; }
      `
    )
    .appendTo("head");
};
