export { renderers } from '../renderers.mjs';

const api_URL = "https://simprosys.frappe.cloud";
const SITE_URL = api_URL;
console.log(SITE_URL);
async function fetchURLs() {
  try {
    const response = await fetch(
      `${SITE_URL}/api/resource/Simprosys%20Blog?fields=["blog_title","slug","publish_date"]&filters=[["post_category","!=",""],["status","=","Publish"]]&limit_page_length=0`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`,
          "Content-Type": "application/json"
        }
      }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse.data) {
      throw new Error("Missing 'data' field in API response");
    }
    return jsonResponse.data.map((blog) => ({
      loc: `${SITE_URL}/faq/${blog.slug}`,
      lastmod: blog.publish_date ? new Date(blog.publish_date).toISOString().split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      changefreq: "daily",
      priority: "1.0"
    }));
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
    return [];
  }
}
async function GET(context) {
  const pages = await fetchURLs();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(
    (page) => `
      <url>
        <loc>${page.loc}</loc>
        <priority>${page.priority}</priority>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
      </url>
    `
  ).join("")}
  </urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
