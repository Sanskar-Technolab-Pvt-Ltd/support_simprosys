/* empty css                                         */
import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, d as renderTemplate, e as renderComponent, f as renderScript } from '../chunks/astro/server_DqOV3ocY.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                         */
import { $ as $$Layout } from '../chunks/Layout_BTa5xw4V.mjs';
import he from 'he';
import { T as ToggleArrow } from '../chunks/toggle-arrow_CMTeNEh3.mjs';
import { $ as $$Carousel } from '../chunks/Carousel_C3yD8Z_Y.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$4 = createAstro();
const $$ShopifyLinks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ShopifyLinks;
  const { ImageUrl, Label, slug, activeSlug } = Astro2.props;
  const api_URL = "https://simprosys.frappe.cloud";
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(slug, "href")}${addAttribute(`flex px-[8px] py-[6px] rounded-xl ${activeSlug || "hover:bg-[#E9F6FF] group"} space-x-3 items-center`, "class")} data-astro-cid-6nvqq3xz> <div${addAttribute(`p-2 rounded-full group-hover:bg-white  ${activeSlug || "bg-[#E9F6FF]"}`, "class")} data-astro-cid-6nvqq3xz> <img class="mx-auto h-5 w-5"${addAttribute(`${api_URL}${ImageUrl}`, "src")} alt="link-icon" data-astro-cid-6nvqq3xz> </div> <p class="font-medium text-[16px] xl:leading-7" data-astro-cid-6nvqq3xz>${Label}</p> </a> `;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/ShopifyLinks.astro", void 0);

const $$Astro$3 = createAstro();
const $$MobileMenu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$MobileMenu;
  const { category, platform, slug } = Astro2.props;
  const api_URL = `${"https://simprosys.frappe.cloud"}`;
  return renderTemplate`<!-- <div
  class="pr-5 w-full inset-y-0 left-0 flex items-center justify-between lg:hidden bg-white md:px-[26px] md:pb-5"
>
  <div class="relative pl-5 py-4">
    {
      platform?.map((items : any) => (
        <img class="max-w-[150px]" src=\`\${api_URL}\${items.platform_logo}\` alt={items.name} />
      ))
    }
  </div>
  <div>
    <button
      id="menu-button"
      type="button"
      class="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-[#195178] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      aria-controls="mobile-menu"
      aria-expanded="false"
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="block h-6 w-6 font-bold"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
      </svg>
      <svg
        class="hidden h-6 w-6 font-bold"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
</div>

<div id="mobile-menu" class="lg:hidden block">
  <div class="space-y-1 px-2 pt-2 md:px-[26px] md:pb-5">
    {
      category?.map((items:any) => (
        <ShopifyLinks
          ImageUrl={items.icon_image}
          Label={items.post_category_name}
          slug={items.slug}
          activeSlug={slug === items.slug ? "activeClass" : ""}
        />
      ))
    }
  </div>
</div> -->${maybeRenderHead()}<div class="pr-1 w-full inset-y-0 left-0 flex items-center justify-between lg:hidden bg-white"> <div class="relative py-4"> ${platform?.map((items) => renderTemplate`<img class="max-w-[150px]"${addAttribute(`${api_URL}${items.platform_logo}`, "src")}${addAttribute(items.name, "alt")}>`)} </div> <div> <button id="menu-button" type="button" class="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-[#195178] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition" aria-controls="mobile-menu" aria-expanded="false" onclick="toggleMenu()"> <span class="sr-only">Open main menu</span> <!-- Hamburger Icon (Default) --> <svg id="menu-icon" class="block h-6 w-6 font-bold" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path> </svg> <!-- Close Icon (Hidden by Default) --> <svg id="close-icon" class="hidden h-6 w-6 font-bold" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> </div> <div id="mobile-menu" class="lg:hidden hidden"> <div class="space-y-1 px-2 pt-2 md:space-y-2 md:pb-5"> ${category?.map((items) => renderTemplate`${renderComponent($$result, "ShopifyLinks", $$ShopifyLinks, { "ImageUrl": items.icon_image, "Label": items.post_category_name, "slug": items.slug, "activeSlug": slug === items.slug ? "activeClass" : "" })}`)} </div> </div>`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/MobileMenu.astro", void 0);

const $$Astro$2 = createAstro();
const $$DropdownLinks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$DropdownLinks;
  const { Label, hrefLink } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li> <a${addAttribute(`faq/${hrefLink}`, "href")} class="hover:underline hover:text-[#25282B]" href="">${he.decode(Label)}</a> </li>`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/DropdownLinks.astro", void 0);

const $$Astro$1 = createAstro();
const $$Dropdown = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Dropdown;
  const { heading, Label } = Astro2.props;
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
  return renderTemplate`${BlogCount > 0 && renderTemplate`${maybeRenderHead()}<div class="cursor-pointer border-b"><div class="dropdown flex items-center px-2 py-4 xl:px-4 xl:py-8 justify-between"><h2 class="text-xl xl:text-2xl font-medium">${Label}</h2><button class="toggle-button p-0 bg-transparent"><img class="arrow-icon w-6 h-6 max-w-none"${addAttribute(ToggleArrow.src, "src")} alt="Toggle Arrow"></button></div><div class="toggle-section px-2 py-4 xl:px-4 xl:pb-8 hidden"><ul class="font-medium text-sm space-y-3 xl:text-[16px] 2xl:leading-[42px] text-[#55575A] list-disc px-5">${Blog.map((item) => renderTemplate`${renderComponent($$result, "DropdownLinks", $$DropdownLinks, { "hrefLink": item.slug, "Label": item.blog_title })}`)}</ul></div></div>`}`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Dropdown.astro", void 0);

const $$Astro = createAstro();
async function getStaticPaths() {
  const API_URL_PATH = "https://simprosys.frappe.cloud";
  const api_url = await fetch(
    `${API_URL_PATH}/api/resource/Simprosys%20Post%20Category?fields=["*"]&limit_page_length=1000&filters=[["status","=","publish"],["category_criteria","=","Category"]]`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
      }
    }
  );
  const api_url_json = await api_url.json();
  const api_url_data = api_url_json.data;
  const paths = api_url_data.map((integration_data) => ({
    params: { integration: integration_data.slug },
    // Pass slug here
    props: {
      name: integration_data.name,
      slug: integration_data.slug
      // Include slug as part of the props
    }
  }));
  return paths;
}
const $$integration = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$integration;
  const { Slug } = Astro2.params;
  const URL = "https://simprosys.frappe.cloud";
  const { integration, slug } = Astro2.params;
  const { name, slug: propSlug } = Astro2.props;
  const integration_details_api = await fetch(
    `${URL}/api/resource/Simprosys%20Post%20Category/${name}`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
      }
    }
  );
  const integration_details_json = await integration_details_api.json();
  const integration_details = integration_details_json.data;
  const parentCategory = integration_details.parent_simprosys_post_category;
  const CategoryResponse = await fetch(
    `${URL}/api/resource/Simprosys%20Post%20Category?fields=["*"]&filters=[["parent_simprosys_post_category", "=", "${parentCategory}"], ["category_criteria", "=", "Category"],["status","=","publish"]]&order_by=\`order\` asc`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
      }
    }
  );
  const categoryDataJson = await CategoryResponse.json();
  const CategoryData = categoryDataJson.data || [];
  const encodedName = encodeURIComponent(name);
  const subCategoryResponse = await fetch(
    `${URL}/api/resource/Simprosys%20Post%20Category?fields=["*"]&filters=[["parent_simprosys_post_category", "=", "${encodedName}"], ["category_criteria", "=", "Subcategory"],["status","=","publish"]]&order_by=\`order\` asc`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
      }
    }
  );
  const subCategoryJson = await subCategoryResponse.json();
  const subCategoryData = subCategoryJson.data || [];
  const platformResponse = await fetch(
    `${URL}/api/resource/Simprosys%20Post%20Category?fields=["*"]&filters=[["name", "=", "${integration_details.parent_simprosys_post_category}"]]`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
      }
    }
  );
  const platformJson = await platformResponse.json();
  const platform = platformJson.data || [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "Title": integration_details.post_category_name ? `${integration_details.post_category_name} - Simprosys InfoMedia Help Centre` : "Shopify Product Feed and Google Shopping Ads Management App by Simprosys", "meta_title": integration_details.meta_title, "meta_desc": integration_details.meta_desc, "canonicalURL": `${platform.canonical_url || ""}`, "AppName": integration_details.post_category_name || "", "PlatformName": platform[0].post_category_name || "" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Carousel", $$Carousel, {})} <section class="mt-[30px] sm:mt-[50px] md:mt-[64px] lg:mt-[70px] xl:mt-[85px] 2xl:mt-[70px] md:mb-[-64px] 2xl:mb-[-140px]"> <!-- <div class="mx-[20px] md:mx-[26px] 2xl:mx-[97.5px] lg:mx-[50px] "> --> <div class="mx-[20px] md:mx-[26px] 2xl:mx-[125px] lg:mx-[50px]"> <div class="grid lg:grid-cols-12"> <div class="hidden lg:block lg:mt-[-70px] xl:mt-[-134px] space-y-8 lg:col-span-4 xl:col-span-3 md:border-r"> <p class="text-base text-[#6D6F71] lg:mt-[70px] xl:mt-[134px]">
Support by Platform
</p> ${platform.map((item) => renderTemplate`<img class="max-w-[150px]"${addAttribute(`${URL}${item.platform_logo}`, "src")}${addAttribute(item.post_category_name || "", "alt")}>`)} <div class="space-y-4 text-[#55575A] lg:pr-2 2xl:pr-[46px] lg:pb-4"> ${CategoryData.map((item) => renderTemplate`${renderComponent($$result2, "ShopifyLinks", $$ShopifyLinks, { "ImageUrl": item.icon_image, "Label": item.post_category_name || "", "slug": item.slug, "activeSlug": integration_details.slug === item.slug ? "activeClass" : "" })}`)} </div> </div> <div class="lg:col-start-5 xl:col-start-5 md:px-2 lg:col-span-8 xl:col-span-7 lg:px-8 xl:px-0"> <div class="mt-[20px] md:mt-[0px] md:pt-[0px] space-y-8 xl:space-y-11 2xl:space-y-16 mb-[30px] md:mb-[50px] lg:mb-[92px]"> <div class=""> <div class="space-y-8"> <div class="flex space-x-[10px]"> <a href="../../" class="text-[#25282B] text-[14px] hover:underline">Home
</a> <p class="text-[16px] leading-[22px] text-[#929495]">></p> <a${addAttribute(integration_details.slug, "href")} class="flex space-x-2 font-medium hover:underline text-[14px] leading-[22px]"> <img class="h-[20px]"${addAttribute(platform[0]?.icon ? `${URL}${platform[0].icon}` : "", "src")}${addAttribute(platform[0]?.name ? `${platform[0].name}` : "", "alt")}> <span> ${integration_details.post_category_name || ""} </span> </a> </div> <!-- Mobile View --> ${renderComponent($$result2, "MobileMenu", $$MobileMenu, { "category": CategoryData, "platform": platform, ",": true, "slug": integration_details.slug })} <div class="flex flex-grow space-x-3 xl:space-x-6 items-start"> <div class="bg-[#E9F6FF] p-4 lg:p-5 rounded-full flex items-center justify-center flex-shrink-0"> <img class="w-10 h-full object-contain"${addAttribute(`${URL}${integration_details.icon_image}`, "src")} alt="icon"> </div> <div class="xl:space-y-2"> <h1 class="font-semibold text-[18px] xl:text-[40px] xl:leading-[54px]"> ${integration_details.post_category_name || ""} </h1> <p class="text-sm xl:text-base text-[#25282B]"> ${integration_details.description} </p> </div> </div> </div> </div> <div class="border-t"> ${subCategoryData.map((item) => renderTemplate`${renderComponent($$result2, "Dropdown", $$Dropdown, { "heading": item.name, "Label": item.post_category_name || "" })}`)} </div> </div> </div> </div> </div> <!-- Mobile View --> <!-- <MobileMenu category={CategoryData} platform={platform} , slug={integration_details.slug} /> --> </section> </main> ${renderScript($$result2, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/[integration].astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/[integration].astro", void 0);
const $$file = "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/[integration].astro";
const $$url = "/assets/support_simprosys/support_simprosys/assets/[integration].html";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$integration,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
