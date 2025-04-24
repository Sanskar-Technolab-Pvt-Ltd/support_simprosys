/* empty css                                         */
import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, d as renderTemplate, e as renderComponent, f as renderScript, u as unescapeHTML } from '../chunks/astro/server_DqOV3ocY.mjs';
import 'kleur/colors';
import he from 'he';
import { $ as $$Layout, F as FrameImage, S as Search } from '../chunks/Layout_BTa5xw4V.mjs';
import 'clsx';
/* empty css                                         */
export { renderers } from '../renderers.mjs';

const LeftArrow = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/left-arrow.Fs2tAtKa.png","width":78,"height":78,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/left-arrow.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/left-arrow.png");
							return target[name];
						}
					});

const RightArrow = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/right-arrow.uAMdxv1H.png","width":78,"height":78,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/right-arrow.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/right-arrow.png");
							return target[name];
						}
					});

const union = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/union.C1rUpiLf.svg","width":71,"height":71,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/union.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/union.svg");
							return target[name];
						}
					});

const arrow = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/arrow.BNu5NiJe.png","width":47,"height":47,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/arrow.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/arrow.png");
							return target[name];
						}
					});

const $$Astro$8 = createAstro();
const $$SwiperSlide = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$SwiperSlide;
  const { headTag, paragraph, Name, URL, Image } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`${URL || "#"}`, "href")} target="_blank" class="p-4 ssm:p-6 md:p-8 space-y-8 bg-[#E9F6FF] relative group rounded-2xl swiper-slide h-full self-stretch"> <!-- Content Section --> <div class="space-y-4 pb-4"> <div class="space-x-6"> <h3 class="text-2xl font-semibold text-[#3D3F42] truncate-head line-clamp-2"> ${headTag} </h3> </div> <p class="text-base text-[#3D3F42] truncate-paragraph line-clamp-3 min-h-[4.5rem] leading-6"> ${he.decode(paragraph)} </p> <!-- Metadata Section --> <div class="flex sm:space-x-4 sm:pt-4 space- y-3 sm:space-y-0"> <div class="px-2 py-1 rounded-[3px] bg-white gap-[10px]"> <p class="text-[12px] leading-6">${Name}</p> </div> <!--* 4:00 minutes read  --> <!-- <div class="flex gap-[10px] w-auto h-auto py-1 items-center">
        <img class="h-4 w-4" src={clock.src} alt="clock icon" />
        <p class="text-base leading-4">4:00 minutes read</p>
      </div> --> <!--*  --> </div> </div> <!-- Image Section --> <div class="relative w-full h-auto"> <img class="rounded-2xl w-full aspect-[16/9] object-cover"${addAttribute(`${Image}`, "src")} alt="slide-image"> <img class="absolute bottom-[-1px] right-[-1px]"${addAttribute(union.src, "src")} alt="union-icon"> <img class="absolute bottom-0 right-0"${addAttribute(arrow.src, "src")} alt="arrow-icon"> </div> </a>`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Swiper-Slide.astro", void 0);

const $$Slider = createComponent(async ($$result, $$props, $$slots) => {
  const api_URL = "https://simprosys.frappe.cloud";
  const ArticleResponse = `${api_URL}/api/resource/Article?fields=["*"]&filters=[["status","=","publish"]]`;
  const Article_data_api = await fetch(ArticleResponse, {
    method: "GET",
    headers: {
      Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
      // Replace with your token
    }
  });
  const Article_data_json = await Article_data_api.json();
  const Article = Article_data_json.data;
  return renderTemplate`${maybeRenderHead()}<div class="w-auto swiper-wrapper"> ${Article.map((item) => renderTemplate`${renderComponent($$result, "SwiperSlide", $$SwiperSlide, { "headTag": item.title || "", "paragraph": item.description || "", "Name": item.name1 || "", "URL": item.url || "", "Image": item.new_featured_image || "" })}`)} </div>`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Slider.astro", void 0);

const PlayIcon = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/play-icon.B-FNSlGa.svg","width":35,"height":35,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/play-icon.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/play-icon.svg");
							return target[name];
						}
					});

const $$Astro$7 = createAstro();
const $$Videos = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Videos;
  const { Src, Href, Title } = Astro2.props;
  function truncateCharacters(text, limit) {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  }
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`https://youtube.com/watch?v=${Href}`, "href")} class="relative group block w-full aspect-[16/8.7]" target="_blank"> <img class="w-full h-full object-cover rounded-lg"${addAttribute(Src, "src")} alt="video-image"> <div class="absolute w-full bg-[#25282B] text-white p-2 bottom-0 hidden group-hover:flex items-center space-x-1 lg:space-x-2 rounded-b-lg"> <img class="h-[20px] lg:h-auto"${addAttribute(PlayIcon.src, "src")} alt="play-icon"> <p class="font-semibold text-[5px] sm:text-[9px] xl:text-[13px] ml-1"> ${truncateCharacters(Title, 70)} </p> </div> </a>`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Videos.astro", void 0);

const fullStar = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/vector.B4cuUU8k.svg","width":18,"height":17,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/vector.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/vector.svg");
							return target[name];
						}
					});

const halfStar = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/halfStar.O123Lq7W.svg","width":18,"height":18,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/halfStar.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/halfStar.svg");
							return target[name];
						}
					});

const emptyStar = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/emptyStar.LR9ZCx06.svg","width":18,"height":18,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/emptyStar.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/emptyStar.svg");
							return target[name];
						}
					});

const $$Astro$6 = createAstro();
const $$StarRating = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$StarRating;
  const { Rating } = Astro2.props;
  const fullStars = Math.floor(Rating);
  const hasHalfStar = Rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return renderTemplate`${maybeRenderHead()}<div class="flex 2xl:gap-[2px] 2xl:space-x-[2px] items-center justify-between"> ${Array.from({ length: fullStars }, (_, i) => renderTemplate`<img class="w-4"${addAttribute(fullStar.src, "src")} alt="full-star">`)} ${hasHalfStar && renderTemplate`<img class="w-4"${addAttribute(halfStar.src, "src")} alt="half-star">`} ${Array.from({ length: emptyStars }, (_, i) => renderTemplate`<img class="w-4"${addAttribute(emptyStar.src, "src")} alt="empty-star">`)} </div>`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/StarRating.astro", void 0);

const $$Astro$5 = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Card;
  const {
    headTag,
    paragraphTag,
    review,
    hrefLink,
    newLabel,
    CTAButton,
    rating,
    slug,
    Icon
  } = Astro2.props;
  const api_URl = "https://simprosys.frappe.cloud";
  const api_URL = "https://simprosys.frappe.cloud";
  const fetchCategoryData = async () => {
    try {
      const response = await fetch(
        `${api_URL}/api/resource/Support%20Tag/${newLabel}`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
          }
        }
      );
      const jsonData = await response.json();
      return jsonData.data || [];
    } catch (error) {
      console.error("Error fetching category data:", error);
      return [];
    }
  };
  const categoryData = await fetchCategoryData();
  return renderTemplate`${maybeRenderHead()}<div class="relative flex flex-col justify-between pb-[18px] rounded-2xl space-y-6 border border-sm bg-white"> <a${addAttribute(`./${slug}`, "href")} class="space-y-6 pt-4 sm:pt-8"> <div class="space-y-6 px-4 sm:px-8"> <div class="bg-[#E9F6FF] p-5 rounded-full w-fit"> <img class="h-10 w-10"${addAttribute(`${api_URl}${Icon}`, "src")}${addAttribute(headTag, "alt")}> </div> <div class="space-y-6 xl:space-y-[8px] 2xl:space-y-[11px]"> <h3 class="font-semibold text-2xl text-[#25282B]">${headTag}</h3> <p class="font-normal text-base text-[#3D3F42] line-clamp-2"> ${paragraphTag} </p> </div> </div> <div${addAttribute(`absolute ${newLabel || "hidden"} right-[0%] top-[0%] rounded-tl-md rounded-bl-md px-2 lg:px-3 py-1`, "class")}${addAttribute(`background-color: ${categoryData.background_color || "#FFFFFF"};`, "style")}> <p${addAttribute(`text-base italic font-bold`, "class")}${addAttribute(`color:${categoryData.text_color || ""};`, "style")}> ${categoryData.tag_name || ""} </p> </div> </a> <div class="pt-4 sssm:flex mx-4 lg:mx-8 sm:grid sm:grid-cols-2 sm:space-x-5 md:space-x-10 xl:space-x-17 lg:p-0 lg:pt-4 2xl:pt-[18px] border-t justify-between lg:justify-items-between items-center space-y-2 sssm:space-y-0 sm:text-right"> <div class="flex sm:h-[24px] sm:w-[200px] lg:w-[240px] space-x-1"> <!-- <div class="flex"> --> <a${addAttribute(`${hrefLink}`, "href")} class="flex 2xl:gap-[2px] space-x-2 sm:space-x-1 lg:space-x-2 items-center justify-between"> ${renderComponent($$result, "StarRating", $$StarRating, { "Rating": Number(rating) })} <div> <p class="text-[14px] sm:text-[13px] md:text-sm lg:text-base text-[#55575A]"> ${review} Reviews
</p> </div> </a> </div> <div class="lg:pt-0"> <a${addAttribute(`${hrefLink}`, "href")} class="button bg-[#195279] text-white px-2 py-1 md:px-4 md:py-[6px] text-sm md:text-base rounded-full hover:shadow-lg">${CTAButton}</a> </div> </div> </div>`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Card.astro", void 0);

const $$Astro$4 = createAstro();
const $$PlatformCards = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$PlatformCards;
  const { dataPlatform, Display, classButton } = Astro2.props;
  const api_URL = "https://simprosys.frappe.cloud";
  const fetchCategoryData = async () => {
    try {
      const response = await fetch(
        `${api_URL}/api/resource/Simprosys%20Post%20Category?fields=["*"]&filters=[["parent_simprosys_post_category", "=", "${dataPlatform}"], ["category_criteria", "=", "Category"],["status","=","publish"]]&order_by=\`order\` asc`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
          }
        }
      );
      const jsonData = await response.json();
      return jsonData.data || [];
    } catch (error) {
      console.error("Error fetching category data:", error);
      return [];
    }
  };
  const categoryData = await fetchCategoryData();
  return renderTemplate`<!-- Shopify Card Section  -->${maybeRenderHead()}<div${addAttribute(`${classButton || "platform-content"} space-y-5 sm:space-y-0 grid sm:grid-cols-2 xl:grid-cols-3 mt-[30px] sm:gap-6 sm:w-full content-center`, "class")}${addAttribute(`display:${Display || "none;"}`, "style")}${addAttribute(dataPlatform, "data-platform")}> ${categoryData.map((item) => renderTemplate`${renderComponent($$result, "Card", $$Card, { "Icon": item.icon_image, "slug": item.slug, "headTag": item.post_category_name, "paragraphTag": item.description, "review": item.review, "hrefLink": item.header_url, "rating": item.rating, "newLabel": item.tag, "CTAButton": item.cta_button })}`)} </div>`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/PlatformCards.astro", void 0);

const ToggleArrow = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/platformArrowMobile.CvKoLY61.svg","width":14,"height":7,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/platformArrowMobile.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/platformArrowMobile.svg");
							return target[name];
						}
					});

const $$Astro$3 = createAstro();
const $$MobilePlatform = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$MobilePlatform;
  const { platformName, active, dataPlatform, classButton } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(`${active || ""} py-[.5em] px-[.75em] bg-[#eee] w-full border-2 md:px-2 rounded-xl relative group flex items-center justify-between ${classButton || "platform-btn"}`, "class")}${addAttribute(dataPlatform, "data-platform")} data-astro-cid-cqmo2m23> <h3 class="font-bold text-lg" data-astro-cid-cqmo2m23>${platformName}</h3> <img class="arrow-icon max-w-none"${addAttribute(ToggleArrow.src, "src")} alt="Toggle Arrow" data-astro-cid-cqmo2m23> </button> <!-- <img
  class="hover:bg-[#FFFFFF] m-auto max-h-[50px]"
  src=\`\${api_URL}\${imageSrc}\`
  alt={alternateText}
/> --> `;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/MobilePlatform.astro", void 0);

const $$Astro$2 = createAstro();
const $$MobileSupport = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$MobileSupport;
  const api_URL = "https://simprosys.frappe.cloud";
  const api_url = `${api_URL}/api/resource/Simprosys%20Post%20Category?fields=["*"]&filters=[["category_criteria","=","Platform"],["status","=","publish"]]&order_by=\`order\` asc`;
  const Platform_data_api = await fetch(api_url, {
    method: "GET",
    headers: {
      Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
    }
  });
  const Platform_data_json = await Platform_data_api.json();
  const Platform_data = Platform_data_json.data;
  const first_platform = Platform_data.length > 0 ? Platform_data[0].post_category_name : "";
  const { heading } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="mt-[30px] sm:mt-[50px] md:mt-[64px] lg:mt-[70px] xl:mt-[85px] 2xl:mt-[140px] "> <div class="mx-[20px] md:mx-[26px] 2xl:mx-[125px] lg:mx-[50px] space-y-10"> <h2 class="text-3xl sm:text-[42px] lg:text-5xl font-light text-[#25282B]"> ${heading} </h2> <div class="py-2 lg:py-0 platform space-y-4 sm:space-y-0 sm:grid sm:grid-cols-4 mt-[48px] gap-8 sm:w-full lg:h-[100px] xl:h-[117px] content-center rounded-2xl"> ${Platform_data.map((platform) => renderTemplate`${renderComponent($$result, "MobilePlatform", $$MobilePlatform, { "platformName": platform.post_category_name, "dataPlatform": platform.name, "active": platform.post_category_name === `${first_platform}` ? "active-button" : "", "classButton": "button-platform" })}
            ${renderComponent($$result, "PlatformCards", $$PlatformCards, { "dataPlatform": platform.name, "Display": platform.post_category_name === `${first_platform}` ? "grid;" : "none;", "classButton": "platform-mobile-content p-4 border border-[#a7bbc9] !mt-0 border-t-[0px] rounded-tl-none rounded-b-xl rounded-tr-none bg-[#f6fbff]" })}`)} </div> <!-- Cards Section Start --> </div> </section> <!-- Support Section End --> ${renderScript($$result, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Mobile-Support.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Mobile-Support.astro", void 0);

const $$Astro$1 = createAstro();
const $$Platform = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Platform;
  const api_URL = "https://simprosys.frappe.cloud";
  const { imageSrc, alternateText, active, dataPlatform, classButton } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(`${active || ""} rounded-[10px] w-full py-4 lg:py-4 md:px-2 relative group content-center justify-items-center grayscale opacity-60 ${classButton || "platform-btn"}`, "class")}${addAttribute(dataPlatform, "data-platform")}> <img class="hover:bg-[#FFFFFF] m-auto max-h-[50px] h-5 md:h-[21px] lg:h-auto"${addAttribute(`${api_URL}${imageSrc}`, "src")}${addAttribute(alternateText, "alt")}> </button>`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Platform.astro", void 0);

const $$Astro = createAstro();
const $$Support = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Support;
  const api_URL = "https://simprosys.frappe.cloud";
  const api_url = `${api_URL}/api/resource/Simprosys%20Post%20Category?fields=["*"]&filters=[["category_criteria","=","Platform"],["status","=","publish"]]&order_by=\`order\` asc`;
  const Platform_data_api = await fetch(api_url, {
    method: "GET",
    headers: {
      Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
    }
  });
  const Platform_data_json = await Platform_data_api.json();
  const Platform_data = Platform_data_json.data;
  const first_platform = Platform_data.length > 0 ? Platform_data[0].post_category_name : "";
  Platform_data.length;
  const { heading } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="mt-[30px] sm:mt-[50px] md:mt-[64px] lg:mt-[70px] xl:mt-[85px] 2xl:mt-[99px]"> <div class="mx-[20px] md:mx-[26px] 2xl:mx-[125px] lg:mx-[50px]"> <h2 class="text-[32px] sm:text-[42px] lg:text-5xl text-[#25282B]"> ${heading} </h2> <div${addAttribute(`py-2 lg:py-4 platform space-y-4 sm:space-y-0 sm:grid sm:grid-cols-5 mt-[48px] bg-[#F5FBFF] gap-8 px-4 sm:w-full content-center rounded-2xl`, "class")}> ${Platform_data.map((platform) => renderTemplate`${renderComponent($$result, "Platform", $$Platform, { "imageSrc": platform.platform_logo, "alternateText": platform.alternateText, "dataPlatform": platform.name, "active": platform.post_category_name === `${first_platform}` ? "active-button" : "" })}`)} </div> <div id="content"> ${Platform_data.map((platform) => renderTemplate`${renderComponent($$result, "PlatformCards", $$PlatformCards, { "dataPlatform": platform.name, "Display": platform.post_category_name === `${first_platform}` ? "grid;" : "none;", "class": "platform-content" })}`)} </div> </div> </section> ${renderScript($$result, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Support.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Support.astro", void 0);

const $$SupportIndex = createComponent(async ($$result, $$props, $$slots) => {
  const api_URL = "https://simprosys.frappe.cloud";
  const YoutubeResponse = `${api_URL}/api/resource/Simprosys%20Youtube%20Data?fields=["*"]&filters=[["status","=","publish"]]`;
  const Youtube_data_api = await fetch(YoutubeResponse, {
    method: "GET",
    headers: {
      Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
    }
  });
  const Youtube_data_json = await Youtube_data_api.json();
  const youtubeData = Youtube_data_json.data;
  const SupportPageResponse = `${api_URL}/api/resource/Support%20Home%20Page/Support%20Home%20Page`;
  const support_response = await fetch(SupportPageResponse, {
    method: "GET",
    headers: {
      Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
    }
  });
  const SupportHomePage_data = await support_response.json();
  const SupportHomeSettings = SupportHomePage_data.data;
  const youtube_description = SupportHomeSettings.youtube_video_description ? he.decode(SupportHomeSettings.youtube_video_description) : "";
  const SupportSearchResponse = `${api_URL}/api/resource/Support%20Search%20Keyword?fields=["*"]&order_by=\`order\` asc`;
  const support_search_response = await fetch(SupportSearchResponse, {
    method: "GET",
    headers: {
      Authorization: `token ${"6fe867e53ad492c"}:${"03189fe2e131e54"}`
    }
  });
  const SupportSearchJson = await support_search_response.json();
  const SupportSearchData = SupportSearchJson.data;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "Title": "Support Simprosys - Simprosys InfoMedia Help Centre", "meta_title": SupportHomeSettings.meta_title || "", "meta_desc": SupportHomeSettings.meta_description || "", "canonicalURL": SupportHomeSettings.canonical_url || "", "HomePageSchemaName": SupportHomeSettings.schema_name || "", "HomePageSchemaURL": SupportHomeSettings.schema_url || "" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <!-- Image Section Start --> <section class="bg-cover bg-center m-[20px] lg:m-[30px]"> <div class="min-h-[50vh] xl:min-h-[calc(100vh-140px)] flex flex-wrap content-center text-center justify-center relative bg-cover bg-center rounded-br-[48px] rounded-tl-[48px]"${addAttribute(`background-image: url(${FrameImage.src})`, "style")} ;> <div class="space-y-6"> <!-- Header Text --> <div class="gap-4 px-2"> <p class="font-bold text-xl sm:text-2xl xl:text-[34px] md:leading-8 text-white"> ${SupportHomeSettings.carousel_heading_paragraph || ""} </p> <h1 class="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl xl:leading-[68px] text-white"> ${SupportHomeSettings.carousel_heading_label || ""} </h1> </div> <!-- Search Bar --> <div class="space-y-6"> <div class="flex items-center justify-center relative px-[20px]"> <div class="relative w-full md:w-[90%] lg:w-full"> <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none pl-5"> <img${addAttribute(Search.src, "src")} alt="searchIcon"> </div> <input id="searchInput" type="text" title="Search for:" class="w-full py-2 font-normal text-base text-[#25282B] pl-10 lg:py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:outline-none sm:text-base focus:placeholder:opacity-0 placeholder:text-[#25282B]" placeholder="Search Simprosys Support" required> </div> <div id="searchResults" class="absolute z-10 w-full md:w-[90%] lg:w-full top-[110%] hidden px-5 rounded-t-2xl rounded-b-2xl overflow-hidden" style="mask-image: radial-gradient(white 100%, transparent 100%); -webkit-mask-image: radial-gradient(white 100%, transparent 100%);"></div> </div> </div> <!-- Links Section --> <div class="content-section px-5 sm:px-11 flex flex-wrap sm:flex-row sm:items-center justify-center gap-2"> ${SupportSearchData && SupportSearchData.map((item) => renderTemplate`<a href="javascript:void(0);" class="link-item px-2 py-1 md:px-3 md:py-2 bg-[#133953] bg-opacity-50 text-white rounded-full font-normal text-sm md:text-base hover:bg-opacity-100"> ${item.keyword || ""} </a>`)} </div> </div> </div> </section> <!-- Image Section End --> <!-- Support Section Start --> <div class="sm:hidden"> ${renderComponent($$result2, "MobileSupport", $$MobileSupport, { "heading": SupportHomeSettings.platform_heading_label || "" })} </div> <div class="hidden sm:block"> ${renderComponent($$result2, "Support", $$Support, { "heading": SupportHomeSettings.platform_heading_label || "" })} </div> <!-- Support Section End --> <!-- Support Article Section Start --> <section class="mt-[30px] sm:mt-[50px] md:mt-[64px] lg:mt-[70px] xl:mt-[85px] 2xl:mt-[140px]"> <div class="mx-[20px] md:mx-[26px] 2xl:mx-[125px] lg:mx-[50px]"> <div class="lg:w-auto lg:flex space-y-3 md:space-y-4 lg:space-y-0 lg:space-x-6"> <!-- Title Section --> <div class="lg:w-[1190px] xl:w-[1237px]"> <h2 class="text-3xl sm:text-4xl md:text-5xl text-[#25282B]"> ${SupportHomeSettings.article_heading_label || ""} <!-- <span>Recent</span><br />
              Support Articles --> </h2> </div> <!-- Description Section --> <div> <h2 class="text-[17px] sm:text-[20px] font-normal text-[#3D3F42]"> ${SupportHomeSettings.article_description || ""} </h2> </div> </div> </div> </section> <!-- Support Article Section End--> <!-- Ads Section Start --> <section class="relative mt-[30px] sm:mt-[50px] md:mt-[64px]"> <div class="mx-[20px] md:mx-[26px] 2xl:mx-[125px] lg:mx-[50px] mySwiper overflow-hidden"> <!-- Swiper Wrapper --> ${renderComponent($$result2, "Slider", $$Slider, {})} <!-- Slider Wrapper End --> <!-- Navigation Buttons --> <div class="btn flex text-start justify-center lg:justify-end gap-5"> <button class="z-10 lg:absolute bottom-[-10%] sm:top-[40%] sm:left-[3%] lg:left-[1%]
                               text-white rounded-full flex justify-center items-center py-10 w-[58px] h-[58px]
                               sm:py-12 lg:py-0 sm:h-16 sm:w-16 bg-opacity-50 text-xl2 slide-prev"> <img class="hover:shadow-sm hover:rounded-full"${addAttribute(LeftArrow.src, "src")} alt="leftArrow-icon"> </button> <button class="z-10 lg:absolute bottom-[-10%] sm:top-[40%] sm:right-[3%] lg:right-[1%]
                               text-white rounded-full flex justify-center items-center py-10 w-[58px] h-[58px]
                               sm:py-12 lg:py-0 sm:h-16 sm:w-16 bg-opacity-50 text-xl2 slide-next"> <img class="hover:shadow-sm hover:rounded-full"${addAttribute(RightArrow.src, "src")} alt="rightArrow-icon"> </button> </div> </div> </section> <!-- Ads Section End --> <!-- Recent Videos Section Start --> <section class="mt-[30px] sm:mt-[50px] md:mt-[64px] lg:mt-[70px] xl:mt-[85px] 2xl:mt-[140px]"> <div class="mx-[20px] md:mx-[26px] 2xl:mx-[125px] lg:mx-[50px]"> <div class="md:grid md:grid-cols-12 md:space-x-[22px] space-y-[24px] md:space-y-0"> <!-- Left Section: Heading and Button --> <div class="md:col-span-4 lg:col-span-3 sm:relative sm:pb-[20px] video-desc"> <div class="gap-4 space-y-3 md:space-y-3"> <h2 class="text-3xl sm:text-4xl md:text-3xl 2xl:text-[45px] 3xl:text-[48px] text-[#25282B] font-normal"> ${SupportHomeSettings.youtube_video_heading_label || ""} </h2> <p class="text-base text-[#25282B]">${unescapeHTML(youtube_description || "")}</p> <div> <a href="https://www.youtube.com/playlist?list=PLP8SfH94PvkutaokHZvsTwg6WKuQQZVmo" class="border px-3 py-2 lg:px-5 lg:py-3 xl:px-8 xl:py-4 rounded-full hover:border-black text-[#195279] hover:text-black border-[#195279] text-sm lg:text-base md:absolute md:bottom-1" target="_blank">See all video tutorials</a> </div> </div> </div> <!-- Right Section: Video Thumbnails --> <div class="md:col-span-8 lg:col-span-9 grid grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-[22px]"> ${youtubeData && youtubeData.map((item) => renderTemplate`${renderComponent($$result2, "Videos", $$Videos, { "Src": item.image, "Href": item.video_id, "Title": item.title })}`)} </div> </div> </div> </section> <!-- Recent Videos Section End  --> </main> ${renderScript($$result2, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/support-index.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result2, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/support-index.astro?astro&type=script&index=1&lang.ts")} ${renderScript($$result2, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/support-index.astro?astro&type=script&index=2&lang.ts")} ` })}`;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/support-index.astro", void 0);
const $$file = "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/support-index.astro";
const $$url = "/assets/support_simprosys/support_simprosys/assets/support-index.html";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$SupportIndex,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
