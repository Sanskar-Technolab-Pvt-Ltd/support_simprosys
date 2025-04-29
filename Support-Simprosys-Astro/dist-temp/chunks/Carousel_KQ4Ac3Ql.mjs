import { c as createComponent, m as maybeRenderHead, b as addAttribute, f as renderScript, d as renderTemplate } from './astro/server_DqOV3ocY.mjs';
import 'kleur/colors';
import 'clsx';
import { F as FrameImage, S as Search } from './Layout_BNRMZKsY.mjs';

const $$Carousel = createComponent(async ($$result, $$props, $$slots) => {
  const api_URL = "https://simprosys.frappe.cloud";
  const SupportSearchResponse = `${api_URL}/api/resource/Support%20Search%20Keyword?fields=["*"]&order_by=\`order\` asc`;
  const support_search_response = await fetch(SupportSearchResponse, {
    method: "GET",
    headers: {
      Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
    }
  });
  const SupportSearchJson = await support_search_response.json();
  const SupportSearchData = SupportSearchJson.data;
  return renderTemplate`<!-- Image Section Start -->${maybeRenderHead()}<section class="bg-cover bg-center"> <div class="flex flex-wrap content-center text-center justify-center relative bg-cover bg-center w-full rounded-b-[48px] h-[219px]"${addAttribute(`background-image: url(${FrameImage.src})`, "style")} ;> <div class="space-y-6"> <div class="flex items-center justify-center relative px-4 md:px-0"> <div class="relative w-full md:w-[90%] lg:w-full"> <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none pl-5"> <img${addAttribute(Search.src, "src")} alt="SearchIcon"> </div> <input id="searchInput" type="text" title="Search for:" class="w-full py-2 font-normal text-base text-[#25282B] pl-10 lg:py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:outline-none sm:text-base focus:placeholder:opacity-0 placeholder:text-[#25282B]" placeholder="Search Simprosys Support"> </div> <div id="searchResults" class="absolute z-10 w-full md:w-[90%] lg:w-full top-[110%] hidden px-4 sm:px-0"></div> </div> <!-- Links Section --> <div class="content-section px-5 sm:px-11 flex flex-wrap sm:flex-row sm:items-center justify-center gap-2"> ${SupportSearchData && SupportSearchData.map((item) => renderTemplate`<a href="javascript:void(0);" class="link-item px-2 py-1 md:px-3 md:py-2 bg-[#133953] bg-opacity-50 text-white rounded-full font-normal text-sm md:text-base hover:bg-opacity-100"> ${item.keyword || ""} </a>`)} </div> </div> </div> <!-- Image Section End --> ${renderScript($$result, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Carousel.astro?astro&type=script&index=0&lang.ts")} </section>`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Carousel.astro", void 0);

export { $$Carousel as $ };
