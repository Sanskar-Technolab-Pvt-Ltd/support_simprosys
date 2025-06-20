import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_DqOV3ocY.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/","cacheDir":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/node_modules/.astro/","outDir":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/","srcDir":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/","publicDir":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/public/","buildClientDir":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/client/","buildServerDir":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/server/","adapterName":"","routes":[{"file":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/preview.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/preview","isIndex":false,"type":"page","pattern":"^\\/preview\\/?$","segments":[[{"content":"preview","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/preview.astro","pathname":"/preview","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/raise-a-ticket.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/raise-a-ticket","isIndex":false,"type":"page","pattern":"^\\/raise-a-ticket\\/?$","segments":[[{"content":"raise-a-ticket","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/raise-a-ticket.astro","pathname":"/raise-a-ticket","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/search.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/search","isIndex":false,"type":"page","pattern":"^\\/search\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.astro","pathname":"/search","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/sitemap.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sitemap.xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap\\.xml\\/?$","segments":[[{"content":"sitemap.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap.xml.ts","pathname":"/sitemap.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/support-index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/support-index","isIndex":false,"type":"page","pattern":"^\\/support-index\\/?$","segments":[[{"content":"support-index","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/support-index.astro","pathname":"/support-index","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/assets/support_simprosys/support_simprosys/assets","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/[integration].astro",{"propagation":"none","containsHead":true}],["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/faq/[blog].astro",{"propagation":"none","containsHead":true}],["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/preview.astro",{"propagation":"none","containsHead":true}],["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/raise-a-ticket.astro",{"propagation":"none","containsHead":true}],["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/search.astro",{"propagation":"none","containsHead":true}],["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/support-index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/faq/[blog]@_@astro":"pages/faq/_blog_.astro.mjs","\u0000@astro-page:src/pages/preview@_@astro":"pages/preview.astro.mjs","\u0000@astro-page:src/pages/raise-a-ticket@_@astro":"pages/raise-a-ticket.astro.mjs","\u0000@astro-page:src/pages/search@_@astro":"pages/search.astro.mjs","\u0000@astro-page:src/pages/sitemap.xml@_@ts":"pages/sitemap.xml.astro.mjs","\u0000@astro-page:src/pages/support-index@_@astro":"pages/support-index.astro.mjs","\u0000@astro-page:src/pages/[integration]@_@astro":"pages/_integration_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_BTrE9j0q.mjs","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/support-index.astro?astro&type=script&index=0&lang.ts":"_astro/support-index.astro_astro_type_script_index_0_lang.DpGak8gU.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/faq/[blog].astro?astro&type=script&index=0&lang.ts":"_astro/_blog_.astro_astro_type_script_index_0_lang.zibOzxFN.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/raise-a-ticket.astro?astro&type=script&index=0&lang.ts":"_astro/raise-a-ticket.astro_astro_type_script_index_0_lang.DQzjkDYF.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/search.astro?astro&type=script&index=0&lang.ts":"_astro/search.astro_astro_type_script_index_0_lang.pr0d-dS6.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/[integration].astro?astro&type=script&index=0&lang.ts":"_astro/_integration_.astro_astro_type_script_index_0_lang.occlnFAq.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BkVVEsAH.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.BLwYorxi.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Mobile-Support.astro?astro&type=script&index=0&lang.ts":"_astro/Mobile-Support.astro_astro_type_script_index_0_lang.C1A51-uo.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Support.astro?astro&type=script&index=0&lang.ts":"_astro/Support.astro_astro_type_script_index_0_lang.1IAB5l2y.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Footer.astro?astro&type=script&index=0&lang.ts":"_astro/Footer.astro_astro_type_script_index_0_lang.DcMdSXk3.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/preview.astro?astro&type=script&index=0&lang.ts":"_astro/preview.astro_astro_type_script_index_0_lang.DptJhPwm.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/support-index.astro?astro&type=script&index=1&lang.ts":"_astro/support-index.astro_astro_type_script_index_1_lang.D8iW95CN.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/search.astro?astro&type=script&index=1&lang.ts":"_astro/search.astro_astro_type_script_index_1_lang.Bfl9reJy.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/support-index.astro?astro&type=script&index=2&lang.ts":"_astro/support-index.astro_astro_type_script_index_2_lang.DWVlKpa2.js","/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Carousel.astro?astro&type=script&index=0&lang.ts":"_astro/Carousel.astro_astro_type_script_index_0_lang.DWVlKpa2.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/faq/[blog].astro?astro&type=script&index=0&lang.ts","(async()=>{const e=window.location.pathname.split(\"/\").pop();if(!e){console.error(\"No slug provided in URL\");return}try{const t=(await(await fetch(`https://simprosys.frappe.cloud/api/resource/Simprosys Blog?fields=[\"redirect_url\"]&filters=${encodeURIComponent(JSON.stringify([[\"slug\",\"=\",e]]))}`,{method:\"GET\",headers:{Authorization:\"token c58178baf306cfa:51c0b9c774c0488\"}})).json()).data;if(t&&t.length>0){const o=t[0].redirect_url;console.log(\"Redirecting to:\",o),o?window.location.href=o:console.log(\"No redirect_url found.\")}else console.log(\"No blog found for this slug.\")}catch(n){console.error(\"Error fetching blog details:\",n)}})();//! Image Popup Modal\ndocument.addEventListener(\"DOMContentLoaded\",function(){const e=document.getElementById(\"mediaModal\"),n=document.getElementById(\"modalContent\"),s=document.getElementById(\"closeModal\");function t(o){n.innerHTML=o,e.classList.remove(\"hidden\")}s.addEventListener(\"click\",function(){e.classList.add(\"hidden\")}),document.body.addEventListener(\"click\",function(o){o.target.tagName===\"IMG\"&&o.target.closest(\".ql-editor\")&&t(`<img src=\"${o.target.src}\" class=\"w-full rounded-lg\" />`)})});"],["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/search.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=new URLSearchParams(window.location.search).get(\"query\")||\"Simprosys InfoMedia Help Centre\";document.title=`${e} - Simprosys InfoMedia Help Centre`;const t=document.getElementById(\"search-term\");t&&(t.textContent=e)});"],["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/[integration].astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const e=document.getElementById(\"menu-button\"),n=document.getElementById(\"mobile-menu\"),t=e.querySelector(\"svg:nth-of-type(1)\"),s=e.querySelector(\"svg:nth-of-type(2)\");e.addEventListener(\"click\",function(){n.classList.contains(\"hidden\")?(n.classList.remove(\"hidden\"),t.classList.add(\"hidden\"),s.classList.remove(\"hidden\")):(n.classList.add(\"hidden\"),t.classList.remove(\"hidden\"),s.classList.add(\"hidden\"))})});"],["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/pages/index.astro?astro&type=script&index=0&lang.ts","window.location.href=\"/support-index\";"],["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Mobile-Support.astro?astro&type=script&index=0&lang.ts","const c=document.querySelectorAll(\".button-platform\"),l=document.querySelectorAll(\".platform-mobile-content\");l.forEach(t=>{t.style.display=\"none\"});const a=t=>{const n=t.getAttribute(\"data-platform\"),o=document.querySelector(`.platform-mobile-content[data-platform=\"${n}\"]`),s=t.classList.contains(\"active-mobile-button\");c.forEach(e=>e.classList.remove(\"active-mobile-button\")),l.forEach(e=>e.style.display=\"none\"),s||(t.classList.add(\"active-mobile-button\"),o&&(o.style.display=\"grid\"))};c.forEach(t=>{t.addEventListener(\"click\",()=>{a(t),t.scrollIntoView({behavior:\"smooth\",block:\"center\"})})});"],["/home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/src/components/Support.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const o=\"Shopify\",a=document.querySelector(`.platform-btn[data-platform=\"${o}\"]`),l=document.querySelector(`.platform-content[data-platform=\"${o}\"]`);a&&a.classList.add(\"active-button\"),l&&(l.style.display=\"grid\"),document.querySelectorAll(\".platform-btn\").forEach(t=>{t.addEventListener(\"click\",()=>{document.querySelectorAll(\".platform-btn\").forEach(e=>{e.classList.remove(\"active-button\")}),t.classList.add(\"active-button\"),document.querySelectorAll(\".platform-content\").forEach(e=>{e.style.display=\"none\"});const r=t.getAttribute(\"data-platform\"),n=document.querySelector(`.platform-content[data-platform=\"${r}\"]`);n&&(n.style.display=\"grid\")})})});"]],"assets":["/assets/support_simprosys/support_simprosys/assets/file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/404.html","/assets/support_simprosys/support_simprosys/assets/file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/preview.html","/assets/support_simprosys/support_simprosys/assets/file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/raise-a-ticket.html","/assets/support_simprosys/support_simprosys/assets/file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/search.html","/assets/support_simprosys/support_simprosys/assets/file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/sitemap.xml","/assets/support_simprosys/support_simprosys/assets/file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/support-index.html","/assets/support_simprosys/support_simprosys/assets/file:///home/sanskar-nil/benches/Support-Simprosys/apps/support_simprosys/Support-Simprosys-Astro/dist/index.html"],"buildFormat":"file","checkOrigin":false,"serverIslandNameMap":[],"key":"/1XATZnsZFcKJI1IcV83CJLCX2+3LIbPN+Tay7q2FA4="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
