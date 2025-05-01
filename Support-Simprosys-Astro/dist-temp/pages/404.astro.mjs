/* empty css                                         */
import { c as createComponent, a as createAstro, b as addAttribute, r as renderHead, d as renderTemplate } from '../chunks/astro/server_DqOV3ocY.mjs';
import 'kleur/colors';
import 'clsx';
import { f as favicon } from '../chunks/favicon_vNtTkzb-.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const BackgroundImage = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/404-background.CjPV9fmz.svg","width":1920,"height":1080,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/404-background.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/404-background.svg");
							return target[name];
						}
					});

const Icon = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/404-icon.Boo-w-V2.svg","width":778,"height":426,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/404-icon.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/404-icon.svg");
							return target[name];
						}
					});

const $$Astro = createAstro();
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`<html lang="en" data-astro-cid-zetdm5md> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Page not found</title><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="stylesheet" href="/style.css"><!-- Favicon --><link rel="icon" type="image/png"${addAttribute(favicon.src, "href")}><!-- External Fonts (Poppins) --><link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap" rel="stylesheet">${renderHead()}</head> <body${addAttribute(`
      background-image: url(${BackgroundImage.src});
      background-size: cover;
      background-position: center;
      height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    `, "style")} data-astro-cid-zetdm5md> <main class="space-y-10 md:space-y-15 xl:space-y-20 px-3" data-astro-cid-zetdm5md> <div class="text-center flex flex-col items-center space-y-8" data-astro-cid-zetdm5md> <h1 class="text-[#38444B] font-bold text-3xl ssm:text-3xl md:text-4xl xl:text-[58px] opacity-1" data-astro-cid-zetdm5md>
Uh oh! We can't seem to locate this page
</h1> <img${addAttribute(Icon.src, "src")} alt="404-icon" class="w-72 md:w-auto" data-astro-cid-zetdm5md> </div> <div class="space-y-4 md:space-y-5 text-center flex flex-col items-center" data-astro-cid-zetdm5md> <h2 class="text-[#38444B] font-semibold text-2xl" data-astro-cid-zetdm5md>Let's guide you back to the homepage</h2> <a href="/" class="text-base text-[#FFFFFF] py-2 px-3 bg-[#195279] rounded-lg" data-astro-cid-zetdm5md>Take me back</a> </div> </main> </body></html>`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/404.astro", void 0);

const $$file = "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/404.astro";
const $$url = "/assets/support_simprosys/support_simprosys/assets/404.html";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
