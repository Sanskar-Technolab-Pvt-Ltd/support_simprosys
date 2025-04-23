/* empty css                                            */
import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, d as renderTemplate, e as renderComponent, u as unescapeHTML, f as renderScript } from '../../chunks/astro/server_DqOV3ocY.mjs';
import 'kleur/colors';
import he from 'he';
import { $ as $$Carousel } from '../../chunks/Carousel_C3yD8Z_Y.mjs';
import { $ as $$Layout } from '../../chunks/Layout_BTa5xw4V.mjs';
import { T as ToggleArrow } from '../../chunks/toggle-arrow_CMTeNEh3.mjs';
import 'clsx';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const homeIcon = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/home-icon.D-B7P5pZ.svg","width":256,"height":256,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/home-icon.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/home-icon.svg");
							return target[name];
						}
					});

const ArrowIcon = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/arrowIcon.BConCTev.svg","width":39,"height":24,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/arrowIcon.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/arrowIcon.svg");
							return target[name];
						}
					});

const $$Astro$3 = createAstro();
const $$DetailDropdownLinks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$DetailDropdownLinks;
  const { Label, hrefLink, rounded, activeSlug } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li${addAttribute(`cursor-pointer hover:bg-[#E9F6FF] ${rounded || ""}`, "class")} data-astro-cid-nnihkfp6> <a${addAttribute(`${hrefLink || "#"}`, "href")}${addAttribute(`block w-full px-2 py-1 lg:px-4 lg:py-2 ${activeSlug}`, "class")} data-astro-cid-nnihkfp6> ${he.decode(Label)} </a> </li> `;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/DetailDropdownLinks.astro", void 0);

const $$Astro$2 = createAstro();
const $$DetailDropdown = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$DetailDropdown;
  const { heading, borderClass, round, Slug, DropdownClass, Label, index } = Astro2.props;
  const API_URL = "https://simprosys.frappe.cloud";
  const BlogResponse = await fetch(
    `${API_URL}/api/resource/Simprosys%20Blog?fields=["*"]&filters=[["post_category", "=", "${heading}"],["status","=","publish"]]&order_by=\`order\` asc&limit_page_length=1000`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
      }
    }
  );
  const BlogJson = await BlogResponse.json();
  const Blog = BlogJson.data || [];
  const BlogCount = Blog.length;
  return renderTemplate`${BlogCount > 0 && renderTemplate`${maybeRenderHead()}<div${addAttribute(`${borderClass || "border-t"}`, "class")}><div${addAttribute(`${DropdownClass || "dropdown cursor-pointer"} flex py-4 justify-between w-full`, "class")}><h3 class="text-base font-medium">${Label}</h3><img class="arrow-icon h-full"${addAttribute(ToggleArrow.src, "src")} alt="Toggle Arrow"></div><div class="toggle-section py-4 xl:pb-8 hidden max-h-[300px] overflow-y-auto xl:max-h-full"><ul class="font-medium text-[#55575A] text-sm space-y-3 xl:text-[16px]">${Blog.map((item) => renderTemplate`${renderComponent($$result, "DetailDropdownLinks", $$DetailDropdownLinks, { "hrefLink": item.slug, "Label": item.blog_title, "rounded": round, "activeSlug": Slug === item.slug ? "activeClass" : "" })}`)}</ul></div></div>`}`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/DetailDropdown.astro", void 0);

const $$Astro$1 = createAstro();
const $$MobileDropdown = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MobileDropdown;
  const { Data, Slug } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="lg:hidden width-[25%] space-y-8 md:col-span-4 mt-10 px-6 lg:col-span-3 md:border-r"> <div class="space-y-[30px]"> <div class="flex space-x-6 items-center"> <h3 class="text-2xl font-bold">Simprosys Google Shopping Feed</h3> </div> </div> <div> <div class="pr-2 lg:pr-[46px] space-y-2"> ${Data.map((item, index) => renderTemplate`${renderComponent($$result, "DetailDropdown", $$DetailDropdown, { "heading": item.name, "Label": item.post_category_name, "borderClass": "border px-4", "index": index, "DropdownClass": "dropdown-details cursor-pointer", "Slug": Slug })}`)} </div> </div> </div>`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/MobileDropdown.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
async function getStaticPaths() {
  const url = "https://simprosys.frappe.cloud";
  const pageSize = 50;
  let allBlogs = [];
  let offset = 0;
  let hasMore = true;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  try {
    while (hasMore) {
      const response = await fetch(
        `${url}/api/resource/Simprosys%20Blog?fields=["slug","name"]&filters=[["status","=","publish"]]&limit_start=${offset}&limit_page_length=${pageSize}`,
        {
          headers: {
            Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
          }
        }
      );
      const json = await response.json();
      if (json.data && json.data.length > 0) {
        allBlogs = allBlogs.concat(json.data);
        offset += pageSize;
        await delay(300);
      } else {
        hasMore = false;
      }
    }
    return allBlogs.map((blog) => ({
      params: { blog: blog.slug },
      props: {
        name: blog.name,
        slug: blog.slug
      }
    }));
  } catch (err) {
    console.error("Failed to fetch blog data:", err);
    return [];
  }
}
const $$blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$blog;
  const API_URL = "https://simprosys.frappe.cloud";
  const { blog, slug } = Astro2.params;
  const { name, slug: propSlug } = Astro2.props;
  const blog_details_api = await fetch(
    `${API_URL}/api/resource/Simprosys%20Blog/${name}&filters=[["status","=","publish"]]`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
      }
    }
  );
  const blog_details_json = await blog_details_api.json();
  const blog_details = blog_details_json.data;
  const SubCategoryResponse = await fetch(
    `${API_URL}/api/resource/Simprosys%20Post%20Category?fields=["*"]&filters=[["name","=","${blog_details.post_category}"],["status","=","publish"]]&order_by=\`order\` asc`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
      }
    }
  );
  const subCategoryDataJson = await SubCategoryResponse.json();
  const SubCategoryData = subCategoryDataJson.data || [];
  const encodeSubCategory = encodeURIComponent(
    SubCategoryData[0]?.parent_simprosys_post_category || ""
  );
  const CategoryResponse = await fetch(
    `${API_URL}/api/resource/Simprosys%20Post%20Category?fields=["*"]&filters=[["parent_simprosys_post_category", "=", "${encodeSubCategory}"], ["category_criteria", "=", "Subcategory"],["status","=","publish"]]&order_by=\`order\` asc`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
      }
    }
  );
  const categoryDataJson = await CategoryResponse.json();
  const CategoryData = categoryDataJson.data || [];
  let Parent_Slug = "No Slug Found";
  let Platform = "#";
  let Icon = "";
  let post_category_name = "";
  if (CategoryData.length > 0) {
    const ParentCategoryName = encodeURIComponent(
      CategoryData[0].parent_simprosys_post_category ? CategoryData[0].parent_simprosys_post_category : ""
    );
    const ParentCategoryResponse = await fetch(
      `${API_URL}/api/resource/Simprosys%20Post%20Category?filters=[["name", "=", "${ParentCategoryName}"]]&fields=["slug","parent_simprosys_post_category","icon_image","post_category_name"]`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
        }
      }
    );
    const ParentCategoryJson = await ParentCategoryResponse.json();
    const ParentCategoryData = ParentCategoryJson.data || [];
    if (ParentCategoryData.length > 0) {
      post_category_name = ParentCategoryData[0]?.post_category_name || "";
      Parent_Slug = ParentCategoryData[0].slug;
      Platform = ParentCategoryData[0]?.parent_simprosys_post_category || "";
      Icon = ParentCategoryData[0].icon_image;
    }
  }
  const platformResponse = await fetch(
    `${API_URL}/api/resource/Simprosys%20Post%20Category?fields=["*"]&filters=[["name", "=", "${Platform}"]]`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
      }
    }
  );
  const platformJson = await platformResponse.json();
  const platform = platformJson.data || [];
  const blogs_api = await fetch(
    `${API_URL}/api/resource/Simprosys%20Blog?filters=[["post_category","=","${blog_details.post_category}"],["status","=","publish"]]&fields=["name", "slug","blog_title","canonical_url"]&order_by=\`order\` asc&limit_page_length=1000`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
      }
    }
  );
  const blogs_json = await blogs_api.json();
  const blogs = blogs_json.data || [];
  const currentIndex = blogs.findIndex((blog2) => {
    return blog2.name === blog_details.name;
  });
  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;
  let decodedContent = blog_details.content_details ? he.decode(blog_details.content_details) : "No content available";
  decodedContent = decodedContent.replace(
    /https?:\/\/(?:www\.)?youtu\.be\/([\w-]+)/g,
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>'
  );
  decodedContent = decodedContent.replace(
    /\b\/\/([\w.-]+\/[\w-]+)/g,
    "https://$1"
  );
  decodedContent = decodedContent.replace(
    /<a[^>]*href=["'][^"']*<iframe[^>]*>[^"']*["'][^>]*>\s*(<iframe[^>]*><\/iframe>)\s*<\/a>/gi,
    "$1"
  );
  decodedContent = decodedContent.replace(
    /<a[^>]*>\s*(<iframe[^>]*><\/iframe>)\s*<\/a>/gi,
    "$1"
  );
  decodedContent = decodedContent.replace(
    /<strong>\s*<a([^>]*)>(.*?)<\/a>\s*<\/strong>/gi,
    '<a$1 target="_blank">$2</a>'
  );
  decodedContent = decodedContent.replace(/<span[^>]*>\s*<br>\s*<\/span>/gi, "");
  decodedContent = decodedContent.replace(/<div[^>]*>\s*<br>\s*<\/div>/gi, "");
  decodedContent = decodedContent.replace(/<p>\s*<br>\s*<\/p>/gi, "");
  decodedContent = decodedContent.replace(
    /<ol[^>]*>\s*(<li>\s*<\/li>\s*)+<\/ol>/gis,
    ""
  );
  decodedContent = decodedContent.replace(
    /\/files\/uploads\//g,
    `${API_URL}/files/uploads/`
  );
  decodedContent = decodedContent.replace(/{%/g, "&#123;%").replace(/%}/g, "%&#125;").replace(/{{/g, "&#123;&#123;").replace(/}}/g, "&#125;&#125;");
  function extractYouTubeLinks(content) {
    const regex = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/g;
    let matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.push(`https://youtu.be/${match[1]}`);
    }
    return matches;
  }
  let decodedContentYT = blog_details.content_details ? he.decode(blog_details.content_details) : "No content available";
  const youtubeLinks = extractYouTubeLinks(decodedContentYT);
  const youtubeSetting = await fetch(
    `${API_URL}/api/resource/Youtube%20Settings/Youtube%20Settings`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
      }
    }
  );
  const videoIds = youtubeLinks.map((link) => link.split("/").pop()).join(",");
  const youtubeSettingJson = await youtubeSetting.json();
  const youtubeSettingData = youtubeSettingJson.data || {};
  const youtubeData = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoIds}&part=snippet,contentDetails&key=${youtubeSettingData.api_key}`,
    {
      method: "GET"
    }
  );
  const youtubeDataJson = await youtubeData.json();
  const youtubeDataMsg = youtubeDataJson.items || [];
  const videoDetails = youtubeDataMsg.map((video) => ({
    name: video.snippet.title,
    description: video.snippet.description,
    uploadDate: video.snippet.publishedAt,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    duration: video.contentDetails.duration,
    thumbnailUrl: video.snippet.thumbnails.high.url
  }));
  let heading = he.decode(blog_details.blog_title);
  const dateStr = blog_details.publish_date || "";
  const dateObj = new Date(dateStr);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
  return renderTemplate(_a || (_a = __template(["", ' <script>\n  const mediaModal = document.getElementById("mediaModal");\n  const closeModalBtn = document.getElementById("closeModal");\n\n  // Close when clicking the close button\n  closeModalBtn.addEventListener("click", () => {\n    mediaModal.classList.add("hidden");\n  });\n\n  // Close when clicking outside the modal content (on the dark background)\n  mediaModal.addEventListener("click", (e) => {\n    if (e.target === mediaModal) {\n      mediaModal.classList.add("hidden");\n    }\n  });\n\n  function storeDropdownSelection(event, dropdownName) {\n    if (!dropdownName) return; // Prevent errors if the value is empty\n\n    const referrer = document.referrer;\n\n    // ✅ Only store if the user is coming from the FAQ page\n    if (referrer.includes("/faq")) {\n      sessionStorage.setItem("selectedDropdown", dropdownName);\n      sessionStorage.setItem("cameFromFAQ", "true");\n    }\n  }\n</script> <!-- export async function getStaticPaths() {\n  const url = import.meta.env.PUBLIC_ApiUrl;\n  const pageSize = 1000000; // Adjust if needed\n  const start = 0;\n\n  // Fetch blog data\n  const response = await fetch(\n    `${url}/api/resource/Simprosys%20Blog?fields=["slug","name"]&limit_page_length=${pageSize}&limit_start=${start}&filters=[["status","=","publish"],["post_category","!=",""]]`,\n    {\n      method: "GET",\n      headers: {\n        Authorization: `token ${import.meta.env.PUBLIC_ApiKey}:${import.meta.env.PUBLIC_SecretKey}`,\n      },\n    }\n  );\n\n  const api_url_json = await response.json();\n  const api_url_data = api_url_json.data;\n\n  // Sanitize the slugs only if needed\n  const paths = api_url_data.map((blog_data: any) => {\n    let cleanSlug = slugify(blog_data.slug);\n    // Replace `%20` (encoded spaces) only if present\n    // if (cleanSlug.includes("%20")) {\n    //   cleanSlug = cleanSlug.replace(/%20/g, "-");\n    // }\n\n    return {\n      params: { blog: cleanSlug },\n      props: {\n        name: blog_data.name,\n        slug: blog_data.slug, // Retain original for internal reference\n      },\n    };\n  });\n\n  return paths;\n} --> <!-- export async function getStaticPaths() {\n  const url = import.meta.env.PUBLIC_ApiUrl;\n  const pageSize = 100; // Fetch 100 at a time\n  let start = 0;\n  let paths: any = [];\n\n  while (true) {\n    // Fetch blog data\n    const response = await fetch(\n      `${url}/api/resource/Simprosys%20Blog?fields=["slug","name"]&limit_page_length=${pageSize}&limit_start=${start}&filters=[["status","=","publish"],["post_category","!=",""]]`,\n      {\n        method: "GET",\n        headers: {\n          Authorization: `token ${import.meta.env.PUBLIC_ApiKey}:${import.meta.env.PUBLIC_SecretKey}`,\n        },\n      }\n    );\n\n    const api_url_json = await response.json();\n    const api_url_data = api_url_json.data;\n\n    if (!api_url_data.length) break; // Stop if no more data\n\n    // Append new paths\n    paths = paths.concat(\n\n    \n      api_url_data.map((blog_data: any) => {\n        let cleanSlug = slugify(blog_data.slug);\n        return {\n          params: { blog: cleanSlug },\n          props: {\n            name: blog_data.name,\n            slug: blog_data.slug,\n          },\n        };\n      })\n    );\n\n    start += pageSize; // Move to the next batch\n  }\n\n  return paths;\n}\n -->'], ["", ' <script>\n  const mediaModal = document.getElementById("mediaModal");\n  const closeModalBtn = document.getElementById("closeModal");\n\n  // Close when clicking the close button\n  closeModalBtn.addEventListener("click", () => {\n    mediaModal.classList.add("hidden");\n  });\n\n  // Close when clicking outside the modal content (on the dark background)\n  mediaModal.addEventListener("click", (e) => {\n    if (e.target === mediaModal) {\n      mediaModal.classList.add("hidden");\n    }\n  });\n\n  function storeDropdownSelection(event, dropdownName) {\n    if (!dropdownName) return; // Prevent errors if the value is empty\n\n    const referrer = document.referrer;\n\n    // ✅ Only store if the user is coming from the FAQ page\n    if (referrer.includes("/faq")) {\n      sessionStorage.setItem("selectedDropdown", dropdownName);\n      sessionStorage.setItem("cameFromFAQ", "true");\n    }\n  }\n</script> <!-- export async function getStaticPaths() {\n  const url = import.meta.env.PUBLIC_ApiUrl;\n  const pageSize = 1000000; // Adjust if needed\n  const start = 0;\n\n  // Fetch blog data\n  const response = await fetch(\n    \\`\\${url}/api/resource/Simprosys%20Blog?fields=["slug","name"]&limit_page_length=\\${pageSize}&limit_start=\\${start}&filters=[["status","=","publish"],["post_category","!=",""]]\\`,\n    {\n      method: "GET",\n      headers: {\n        Authorization: \\`token \\${import.meta.env.PUBLIC_ApiKey}:\\${import.meta.env.PUBLIC_SecretKey}\\`,\n      },\n    }\n  );\n\n  const api_url_json = await response.json();\n  const api_url_data = api_url_json.data;\n\n  // Sanitize the slugs only if needed\n  const paths = api_url_data.map((blog_data: any) => {\n    let cleanSlug = slugify(blog_data.slug);\n    // Replace \\`%20\\` (encoded spaces) only if present\n    // if (cleanSlug.includes("%20")) {\n    //   cleanSlug = cleanSlug.replace(/%20/g, "-");\n    // }\n\n    return {\n      params: { blog: cleanSlug },\n      props: {\n        name: blog_data.name,\n        slug: blog_data.slug, // Retain original for internal reference\n      },\n    };\n  });\n\n  return paths;\n} --> <!-- export async function getStaticPaths() {\n  const url = import.meta.env.PUBLIC_ApiUrl;\n  const pageSize = 100; // Fetch 100 at a time\n  let start = 0;\n  let paths: any = [];\n\n  while (true) {\n    // Fetch blog data\n    const response = await fetch(\n      \\`\\${url}/api/resource/Simprosys%20Blog?fields=["slug","name"]&limit_page_length=\\${pageSize}&limit_start=\\${start}&filters=[["status","=","publish"],["post_category","!=",""]]\\`,\n      {\n        method: "GET",\n        headers: {\n          Authorization: \\`token \\${import.meta.env.PUBLIC_ApiKey}:\\${import.meta.env.PUBLIC_SecretKey}\\`,\n        },\n      }\n    );\n\n    const api_url_json = await response.json();\n    const api_url_data = api_url_json.data;\n\n    if (!api_url_data.length) break; // Stop if no more data\n\n    // Append new paths\n    paths = paths.concat(\n\n    \n      api_url_data.map((blog_data: any) => {\n        let cleanSlug = slugify(blog_data.slug);\n        return {\n          params: { blog: cleanSlug },\n          props: {\n            name: blog_data.name,\n            slug: blog_data.slug,\n          },\n        };\n      })\n    );\n\n    start += pageSize; // Move to the next batch\n  }\n\n  return paths;\n}\n -->'])), renderComponent($$result, "Layout", $$Layout, { "Title": `${blog_details.blog_title}`, "meta_title": blog_details.meta_title, "meta_desc": blog_details.meta_desc, "meta_keyword": blog_details.meta_keyword, "canonicalURL": `${blog_details.canonical_url || ""}`, "blogSchemaName": blog_details.blog_title || "", "youtubeVideoDetails": videoDetails || "", "blogSlug": blog_details.slug || "", "blogName": blog_details.blog_title || "" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="lg:mb-[-64px] 2xl :mb-[-140px]"> ${renderComponent($$result2, "Carousel", $$Carousel, {})} <section> <!-- Mobile View --> <div class="mx-[20px] md:mx-[26px] 2xl:mx-[125px] lg:mx-[50px]"> <div class="grid lg:grid-cols-12"> <div class="hidden lg:block space-y-8 lg:col-span-4 xl:col-span-3 md:border-r pt-[30px] sm:pt-[50px] md:pt-[64px] lg:pt-[70px] xl:pt-[85px] 2xl:pt-[70px]"> <div class="space-y-[30px]"> <div class="flex space-x-6 items-center lg:pr-[23px] 2xl:pr-[46px]"> <div class="bg-[#E9F6FF] p-5 rounded-full flex items-center justify-center"> <img class="h-full w-[44.2px]"${addAttribute(`${API_URL}${Icon}`, "src")} alt="icon"> </div> <h1 class="text-xl lg:text-2xl"> ${post_category_name} </h1> </div> </div> <div> <div class="pr-2 lg:pr-[23px] 2xl:pr-[46px]"> ${CategoryData.map((item, index) => renderTemplate`${renderComponent($$result2, "DetailDropdown", $$DetailDropdown, { "heading": item.name, "Label": item?.post_category_name || "", "round": "rounded-[12px]", "Slug": blog_details.slug, "DropdownClass": "dropdown-details cursor-pointer", "index": index })}`)} </div> </div> </div> <div class="xl:col-start-5 lg:px-8 xl:px-0 lg:col-span-8 pt-[30px] sm:pt-[50px] md:pt-[64px] lg:pt-[70px] xl:pt-[85px] 2xl:pt-[70px]"> <div class="mt-[20px] md:mt-[0px] md:pt-[0px] space-y-8 xl:space-y-16 mb-[50px] lg:mb-[92px]"> <div class="space-y-6"> <div class="space-y-8"> <div class="hidden ssm:flex space-x-1 lg:space-x-2"> <a href="../../" class="text-[#25282B] text-sm opacity-70 hover:underline"> <span class="ssm:hidden"> <img class="w-[22px]"${addAttribute(homeIcon.src, "src")} alt="home-icon"> </span> <span class="hidden ssm:block" title="Home"> Home </span> </a> <p class="text-[16px] leading-[22px] text-[#929495]">></p> <a${addAttribute(`/${Parent_Slug}`, "href")} class="flex items-start whitespace-pre-line xl:whitespace-pre-line md:overflow-hidden md:text-ellipsis xl:w-auto font-medium hover:underline text-sm ssm:space-x-1"> <img class="h-[20px] w-auto"${addAttribute(platform[0]?.icon ? `${API_URL}${platform[0].icon}` : "", "src")}${addAttribute(platform[0]?.post_category_name ? `${platform[0].post_category_name}` : "", "alt")}> <span class="hidden ssm:block overflow-hidden text-ellipsis whitespace-nowrap text-[#25282B] opacity-70"${addAttribute(post_category_name, "title")}>${post_category_name} </span> </a> <p class="text-[16px] leading-[22px] text-[#929495]">></p> <a${addAttribute(`/${Parent_Slug}`, "href")} class="text-[#25282B] whitespace-pre-line xl:whitespace-nowrap md:overflow-hidden md:text-ellipsis opacity-70 font-medium hover:underline text-sm"${addAttribute(SubCategoryData[0]?.post_category_name || "", "title")} onclick="storeDropdownSelection(event, this.getAttribute('data-dropdown'))"${addAttribute(SubCategoryData[0]?.post_category_name || "", "data-dropdown")}> ${SubCategoryData[0]?.post_category_name || ""} </a> <p class="hidden xl:flex text-[16px] leading-[22px] text-[#929495]">
>
</p> <a${addAttribute(blog_details.slug, "href")} class="hidden xl:inline-block text-[#25282B] whitespace-pre-line xl:whitespace-nowrap md:overflow-hidden md:text-ellipsis font-medium hover:underline text-sm"${addAttribute(`${heading}`, "title")}>${heading}</a> </div> </div> <div class="space-y-8"> <div${addAttribute(`flex ${blog_details.featured_image ? "space-x-2 item-start xl:items-center" : ""}`, "class")}> <div${addAttribute(`p-5 ${blog_details.featured_image ? "" : "hidden"} h-fit rounded-full w-fit bg-[#E9F6FF] content-center`, "class")}> <img class="w-16"${addAttribute(`${API_URL}${blog_details.featured_image}`, "src")} alt="featured-icon"> </div> <div class="space-y-2"> <h2 class="font-semibold text-2xl md:text-3xl lg:text-4px 2xl:text-[40px] 2xl:leading-[54px]"> ${heading} </h2> ${blog_details.publish_date && renderTemplate`<p class="text-black opacity-70">${formattedDate}</p>`} </div> </div> <div class="table-wrapper"> <div class="ql-editor read-mode">${unescapeHTML(decodedContent)}</div> <div class="border-t pt-5 lg:pt-10 text-center lg:text-start"> <div${addAttribute(`text-base grid grid-cols-12 lg:space-y-0 gap-2`, "class")}> <div${addAttribute(`col-span-6 space-y-3 text-left ${prevBlog ? "" : ""}`, "class")}> <p${addAttribute(`font-semibold ${prevBlog ? "" : "hidden"}`, "class")}>
Previous article
</p> <p class="text-[#195279] hover:underline"> <a class="justify-items-start float-left"${addAttribute(prevBlog ? `/faq/${prevBlog.slug}` : "#", "href")}><img${addAttribute(`scale-x-[-1] transform transition hover:-translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none ${prevBlog ? "" : "hidden"}`, "class")}${addAttribute(ArrowIcon.src, "src")} alt="Previous-Arrow"></a> </p> </div> <div${addAttribute(`col-span-6 justify-items-end space-y-3 text-right ${nextBlog ? "" : "hidden"}`, "class")}> <p class="font-semibold">Next article</p> <p class="text-[#195279] hover:underline"> <a class="justify-items-end float-right"${addAttribute(nextBlog ? `/faq/${nextBlog.slug}` : "#", "href")}><img class="transform transition hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"${addAttribute(ArrowIcon.src, "src")} alt="Next-Arrow"></a> </p> </div> </div> </div> </div> </div> </div> </div> </div> </div> </div> </section> <!--* Pop-up Modal --> <div id="mediaModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 hidden z-50"> <div class="relative rounded-lg shadow-lg w-full max-w-3xl sm:max-w-4xl xl:max-w-7xl p-4 max-h-[90vh] overflow-y-auto"> <!-- Close Button --> <button id="closeModal" class="absolute top-3 right-3 hover:text-gray-300 text-white text-xl">
✖
</button> <!-- Modal Content --> <div id="modalContent" class="p-4 flex justify-center items-center"> <img id="modalImage" src="" alt="Large Image" class="max-h-[80vh] w-auto"> </div> </div> </div> ${renderComponent($$result2, "MobileDropdown", $$MobileDropdown, { "Data": CategoryData, "Slug": blog_details.slug })} </main> ${renderScript($$result2, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/faq/[blog].astro?astro&type=script&index=0&lang.ts")} ` }));
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/faq/[blog].astro", void 0);
const $$file = "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/faq/[blog].astro";
const $$url = "/assets/support_simprosys/support_simprosys/assets/faq/[blog].html";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$blog,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
