/* empty css                                         */
import { c as createComponent, e as renderComponent, d as renderTemplate, m as maybeRenderHead, f as renderScript } from '../chunks/astro/server_DqOV3ocY.mjs';
import 'kleur/colors';
import { $ as $$Carousel } from '../chunks/Carousel_KQ4Ac3Ql.mjs';
import { $ as $$Layout } from '../chunks/Layout_BNRMZKsY.mjs';
export { renderers } from '../renderers.mjs';

const $$Search = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Carousel", $$Carousel, {})} ${maybeRenderHead()}<section class="mx-[26px] lg:mx-[50px] 2xl:mx-[97.5px] mt-[20px] xl:mt-[70px] mb-[64px]"> <div class="container mx-auto"> <h1 class="text-3xl lg:text-4xl font-bold mb-8 break-words"> <span id="searchCount"></span> Search Results for: "<span id="search-term"></span>"
</h1> <div id="search-results"> <p class="text-gray-500">Searching...</p> </div> </div> <!-- ✅ Client-side JavaScript --> ${renderScript($$result2, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/search.astro?astro&type=script&index=0&lang.ts")} </section> ${renderScript($$result2, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/search.astro?astro&type=script&index=1&lang.ts")} ` })}`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/search.astro", void 0);

const $$file = "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/search.astro";
const $$url = "/assets/support_simprosys/support_simprosys/assets/search.html";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
