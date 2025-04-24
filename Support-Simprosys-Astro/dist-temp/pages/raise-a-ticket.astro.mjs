/* empty css                                         */
import { c as createComponent, e as renderComponent, f as renderScript, d as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DqOV3ocY.mjs';
import 'kleur/colors';
import { $ as $$Carousel } from '../chunks/Carousel_KQ4Ac3Ql.mjs';
import { $ as $$Layout } from '../chunks/Layout_BNRMZKsY.mjs';
/* empty css                                          */
export { renderers } from '../renderers.mjs';

const TicketIcon = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/raiseTicket.DASjk4LV.svg","width":80,"height":80,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/raiseTicket.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/raiseTicket.svg");
							return target[name];
						}
					});

const attachFile = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/attachFile.DJtjocVZ.svg","width":40,"height":40,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/attachFile.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/attachFile.svg");
							return target[name];
						}
					});

const Arrow = new Proxy({"src":"/assets/support_simprosys/support_simprosys/assets/_astro/downArrow.IqyyURZf.svg","width":14,"height":8,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/downArrow.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/assets/img/downArrow.svg");
							return target[name];
						}
					});

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const FRAPPE_URL = "https://simprosys.frappe.cloud";
    const API_ENDPOINT = `${FRAPPE_URL}/api/resource/Support%20Simprosys%20Ticket`;
    const API_KEY = "6fe867e53ad492c";
    const API_SECRET = "03189fe2e131e54";
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${API_KEY}:${API_SECRET}`
      },
      body: JSON.stringify({
        name1: body.name1,
        company_name: body.company_name,
        email: body.email,
        store_id: body.store_id,
        plugin_or_app_related_queries: body.reason,
        platform: body.platform,
        app: body.app,
        additional_details: body.additional_details
      })
    });
    const data = await response.json();
    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.message }), {
        status: 400
      });
    }
    const ticketName = data.data.name;
    await attachFilesToDoctype(ticketName, body.attach_files);
    return new Response(
      JSON.stringify({ message: "Ticket created successfully", data }),
      {
        status: 200
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create ticket" }), {
      status: 500
    });
  }
};
const $$RaiseATicket = createComponent(async ($$result, $$props, $$slots) => {
  const schemaWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Raise a Ticket - Simprosys",
    description: "Submit a support ticket to Simprosys for assistance with your queries or issues. Provide details about your problem, and our team will get back to you.",
    url: "https://simprosys.frappe.cloud/raise-a-ticket",
    mainEntity: {
      "@type": "ContactPage",
      name: "Raise a Ticket - Simprosys",
      description: "Submit a support ticket to Simprosys for assistance with your queries or issues.",
      url: "https://simprosys.frappe.cloud/raise-a-ticket",
      potentialAction: {
        "@type": "CommunicateAction",
        target: {
          "@type": "EntryPoint",
          url: "https://simprosys.frappe.cloud/raise-a-ticket"
        },
        inLanguage: "en-US",
        instrument: {
          "@type": "WebSite",
          url: "https://simprosys.frappe.cloud",
          name: "Simprosys"
        }
      },
      subjectOf: {
        "@type": "WebSite",
        url: "https://simprosys.frappe.cloud",
        name: "Simprosys"
      }
    },
    publisher: {
      "@type": "Organization",
      name: "Simprosys",
      url: "https://simprosys.frappe.cloud"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://simprosys.frappe.cloud/raise-a-ticket?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "Title": "Raise-A-Ticket", "meta_title": "", "meta_desc": "", "ticketSchema": schemaWebPage || "", "data-astro-cid-el37qao4": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-el37qao4> ${renderComponent($$result2, "Carousel", $$Carousel, { "data-astro-cid-el37qao4": true })} <section class="mx-[26px] lg:mx-[50px] 2xl:mx-[97.5px] mt-[20px] xl:mt-[70px] mb-[64px]" data-astro-cid-el37qao4> <div id="success-popup" class="fixed inset-0 flex items-center justify-center z-50 hidden" data-astro-cid-el37qao4> <div class="absolute inset-0 bg-gray-800 opacity-50" data-astro-cid-el37qao4></div> <div class="bg-white md:px-10 px-7 md:py-14 py-10 rounded-lg shadow-lg z-10 w-full sm:max-w-xl max-w-[90%] text-center relative" data-astro-cid-el37qao4> <a id="closePopup" class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer text-2xl" role="button" aria-label="Close" data-astro-cid-el37qao4> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" data-astro-cid-el37qao4> <path fill="none" d="M0 0h24v24H0z" data-astro-cid-el37qao4></path> <path d="M18 6L6 18" stroke="#E98135" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-el37qao4></path> <path d="M6 6L18 18" stroke="#E98135" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-el37qao4></path> </svg> </a> <p class="md:text-4xl ssm:text-3xl text-2xl font-semibold text-[#195279]" data-astro-cid-el37qao4>
Thanks for reaching out!
</p> <p class="text-gray-700 md:text-lg text-base mt-4 mb-5" data-astro-cid-el37qao4>
Our team will get back to you shortly
</p> </div> </div> </section> <div class="grid lg:grid-cols-12 gap-4 mx-[26px] lg:mx-[50px] 2xl:mx-[97.5px]" data-astro-cid-el37qao4> <div class="lg:col-span-8 lg:col-start-3 md:space-y-6 xl:col-span-6 xl:col-start-4 xl:space-y-8" data-astro-cid-el37qao4> <div class="hidden md:flex space-x-[10px]" data-astro-cid-el37qao4> <a href="/support-index" class="text-[#25282B] text-sm opacity-70 hover:underline" data-astro-cid-el37qao4>Home</a> <p class="text-[16px] leading-[22px]" data-astro-cid-el37qao4>></p> <a href="/support-index" class="text-[#25282B] text-sm hover:underline" data-astro-cid-el37qao4>Raise a Ticket</a> </div> <form id="form_id" onsubmit="submitTicket(event)" data-astro-cid-el37qao4> <div class="space-y-4 lg:space-y-6 xl:space-y-16" data-astro-cid-el37qao4> <div class="space-x-3 lg:space-x-6 flex items-center" data-astro-cid-el37qao4> <img${addAttribute(TicketIcon.src, "src")} class="h-[50px] md:h-auto" alt="" data-astro-cid-el37qao4> <h1 class="text-2xl lg:text-[40px]" data-astro-cid-el37qao4>Raise a Ticket</h1> </div> <div class="py-4 lg:py-6 xl:py-8 space-y-8 border-t" data-astro-cid-el37qao4> <div class="" data-astro-cid-el37qao4> <div class="space-y-1 lg:space-y-2 xl:space-y-3" data-astro-cid-el37qao4> <label for="" class="text-base text-[#55575A]" data-astro-cid-el37qao4>Name *</label> <input id="name1" type="text" class="w-full border border-[#E6E7E7] text-sm md:text-base focus:border-[#E6E7E7] bg-[#] p-2 lg:p-3 rounded-md hover:shadow" data-astro-cid-el37qao4> </div> <span id="name1_valid" class="text-[red] absolute px-1 text-[14px] hidden" data-astro-cid-el37qao4>Enter a valid first name</span> </div> <div class="" data-astro-cid-el37qao4> <div class="space-y-1 md:space-y-3" data-astro-cid-el37qao4> <label for="" class="text-base text-[#55575A]" data-astro-cid-el37qao4>Company / Store Name *</label> <input id="company_name" type="text" class="w-full border border-[#E6E7E7] text-sm md:text-base bg-[#] p-2 lg:p-3 rounded-md hover:shadow" data-astro-cid-el37qao4> </div> <span id="company_valid" class="text-[red] absolute px-1 text-[14px] hidden" data-astro-cid-el37qao4>Enter a valid Company name</span> </div> <div data-astro-cid-el37qao4> <div class="space-y-1 md:space-y-3" data-astro-cid-el37qao4> <label class="text-base text-[#55575A]" data-astro-cid-el37qao4>Store URL</label> <input id="store_url" type="text" class="w-full border border-[#E6E7E7] text-sm md:text-base bg-[#] p-2 lg:p-3 rounded-md hover:shadow" data-astro-cid-el37qao4> </div> <span id="store_url_valid" class="text-[red] absolute px-1 text-[14px] hidden" data-astro-cid-el37qao4>Enter a valid URL</span> </div> <div data-astro-cid-el37qao4> <div class="space-y-1 md:space-y-3" data-astro-cid-el37qao4> <label for="" class="text-base text-[#55575A]" data-astro-cid-el37qao4>Email *</label> <input id="email" type="email" class="w-full border border-[#E6E7E7] text-sm md:text-base bg-[#] p-2 lg:p-3 rounded-md hover:shadow" data-astro-cid-el37qao4> </div> <span id="email_valid" class="text-[red] absolute px-1 text-[14px] hidden" data-astro-cid-el37qao4>Enter Email Address</span> </div> <div class="space-y-1 md:space-y-3" data-astro-cid-el37qao4> <p class="text-base font-normal text-[#55575A]" data-astro-cid-el37qao4>
Reason for Raising a Ticket *
</p> <div class="space-y-2 md:space-y-4" data-astro-cid-el37qao4> <div data-astro-cid-el37qao4> <div class="relative w-full" data-astro-cid-el37qao4> <!-- Select field --> <select id="plugin_or_app_related_queries" class="w-full appearance-none bg-white border border-[#E6E7E7] p-2 lg:p-3 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E6E7E7] focus:border-2 focus:border-black text-sm md:text-base text-[#25282B] hover:shadow" data-astro-cid-el37qao4> <option value="" selected disabled data-astro-cid-el37qao4>Select Option *</option> <option value="General Enquiry" data-astro-cid-el37qao4>General Enquiry</option> <option value="Career opportunities" data-astro-cid-el37qao4>Career opportunities</option> <option value="Partnership opportunities" data-astro-cid-el37qao4>Partnership opportunities</option> <option value="Shopify Store Design and Development" data-astro-cid-el37qao4>Shopify Store Design and Development</option> <option value="Plugin and App related query" data-astro-cid-el37qao4>Plugin and App related query</option> </select> <!-- SVG Icon --> <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none mr-1" data-astro-cid-el37qao4> <img${addAttribute(Arrow.src, "src")} alt="Dropdown Icon" class="text-gray-500" data-astro-cid-el37qao4> </div> </div> <span id="plugin_id_valid" class="text-[red] px-1 text-[14px] hidden" data-astro-cid-el37qao4>Select an Query</span> </div> <!-- Option Field 2 --> <div data-astro-cid-el37qao4> <div class="relative w-full" data-astro-cid-el37qao4> <!-- Select field --> <select id="platformSelect" class="w-full appearance-none bg-white border border-[#E6E7E7] p-2 lg:p-3 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E6E7E7] focus:border-2 focus:border-black text-sm md:text-base text-[#25282B] hover:shadow" id="platformSelect" data-astro-cid-el37qao4> <option class="" value="" selected disabled data-astro-cid-el37qao4>Select Platform *</option> </select> <!-- SVG Icon --> <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none mr-1" data-astro-cid-el37qao4> <img${addAttribute(Arrow.src, "src")} alt="Dropdown Icon" class="text-gray-500" data-astro-cid-el37qao4> </div> </div> <span id="platform_id_valid" class="text-[red] px-1 text-[14px] hidden" data-astro-cid-el37qao4>Select a Platform</span> </div> <!-- Option Field 3 --> <div data-astro-cid-el37qao4> <div class="relative w-full" data-astro-cid-el37qao4> <!-- Select field --> <select id="appSelect" class="w-full appearance-none bg-white border border-[#E6E7E7] p-2 lg:p-3 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E6E7E7] focus:border-2 focus:border-black text-sm md:text-base text-[#25282B] hover:shadow" id="appSelect" data-astro-cid-el37qao4> <option value="" selected disabled data-astro-cid-el37qao4>Select App *</option> </select> <!-- SVG Icon --> <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none mr-1" data-astro-cid-el37qao4> <img${addAttribute(Arrow.src, "src")} alt="Dropdown Icon" class="text-gray-500" data-astro-cid-el37qao4> </div> </div> <span id="app_id_valid" class="text-[red] px-1 text-[14px] hidden" data-astro-cid-el37qao4>Select an App</span> </div> </div> </div> <div data-astro-cid-el37qao4> <div class="space-y-1 md:space-y-3" data-astro-cid-el37qao4> <label for="" class="text-base text-[#55575A]" data-astro-cid-el37qao4>Store ID</label> <input id="store_id" type="text" class="w-full border border-[#E6E7E7] text-sm md:text-base bg-[#] p-2 lg:p-3 rounded-md hover:shadow" data-astro-cid-el37qao4> </div> <span id="store_id_valid" class="text-[red] absolute px-1 text-[14px] hidden" data-astro-cid-el37qao4>Enter a valid store id</span> </div> <div class="space-y-1 md:space-y-3" data-astro-cid-el37qao4> <label for="" class="text-base text-[#55575A]" data-astro-cid-el37qao4>Additional Details</label> <textarea id="message" rows="4" class="block p-2.5 w-full text-sm md:text-base text-gray-900 rounded-md border border-[#E6E7E7]focus:ring-blue-500 focus:border-[#E6E7E7] dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:shadow" data-astro-cid-el37qao4></textarea> </div> <div class="space-y-1 md:space-y-3" data-astro-cid-el37qao4> <div class="rounded-md border-[#E6E7E7] pb-3 w-fit" data-astro-cid-el37qao4> <label for="attach_file" class="flex items-center gap-[10px] cursor-pointer" data-astro-cid-el37qao4> <img${addAttribute(attachFile.src, "src")} alt="attach-file" data-astro-cid-el37qao4> <span id="attach_file_text" class="text-[#55575A] text-base" data-astro-cid-el37qao4>Attach File</span> </label> <input id="attach_file" type="file" class="hidden" multiple data-astro-cid-el37qao4> <button id="cancel_file" class="text-red-500 text-sm hidden" type="button" data-astro-cid-el37qao4>Cancel</button> </div> <p id="file_error" class="text-red-500 text-sm" data-astro-cid-el37qao4></p> <div id="file_list" data-astro-cid-el37qao4></div> <!-- This is the new container for displaying files with cancel buttons --> </div> <div data-astro-cid-el37qao4> <button id="submit_button" class="text-white bg-[#195279] px-5 py-3 text-base rounded-md hover:shadow-lg" type="submit" data-astro-cid-el37qao4>Submit</button> </div> </div> </div> </form> </div> </div> </main> ` })} ${renderScript($$result, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/raise-a-ticket.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/raise-a-ticket.astro", void 0);
const $$file = "/home/nil/support-simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/raise-a-ticket.astro";
const $$url = "/assets/support_simprosys/support_simprosys/assets/raise-a-ticket.html";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST,
	default: $$RaiseATicket,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
