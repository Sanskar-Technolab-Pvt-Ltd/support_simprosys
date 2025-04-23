/* empty css                                         */
import { c as createComponent, f as renderScript, r as renderHead, d as renderTemplate } from '../chunks/astro/server_DqOV3ocY.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const prerender = true;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><meta http-equiv="refresh" content="0; url=/support-index">${renderScript($$result, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/index.astro?astro&type=script&index=0&lang.ts")}${renderHead()}</head> </html>`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/index.astro", void 0);

const $$file = "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/index.astro";
const $$url = "/assets/support_simprosys/support_simprosys/assets.html";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
