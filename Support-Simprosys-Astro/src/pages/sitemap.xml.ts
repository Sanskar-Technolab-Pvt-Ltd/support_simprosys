import { APIContext } from "astro";

const api_URL = import.meta.env.PUBLIC_ApiUrl; // Load API URL from env
const SITE_URL = api_URL;
console.log(SITE_URL)
// Fetch dynamic URLs from Frappe
async function fetchURLs() {
  try {
    const response = await fetch(
      `${SITE_URL}/api/resource/Simprosys%20Blog?fields=["blog_title","slug","publish_date"]&filters=[["post_category","!=",""],["status","=","Publish"]]&limit_page_length=0`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${import.meta.env.PUBLIC_ApiKey}:${
            import.meta.env.PUBLIC_SecretKey
          }`,
          "Content-Type": "application/json",
        },
      }
    );
    const jsonResponse = await response.json();

    if (!jsonResponse.data) {
      throw new Error("Missing 'data' field in API response");
    }

    return jsonResponse.data.map((blog: any) => ({
      loc: `${SITE_URL}/faq/${blog.slug}`,
      lastmod: blog.publish_date
        ? new Date(blog.publish_date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      changefreq: "daily",
      priority: "1.0",
    }));
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
    return [];
  }
}



// API Handler to return XML sitemap
export async function GET(context: APIContext) {
  const pages = await fetchURLs();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        (page:any) => `
      <url>
        <loc>${page.loc}</loc>
        <priority>${page.priority}</priority>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
