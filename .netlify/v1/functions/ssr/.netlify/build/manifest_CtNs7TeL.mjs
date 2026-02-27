import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_B1wMqgWF.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
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

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Sascha/Documents/Repos/der-rosa-knopf/","cacheDir":"file:///C:/Users/Sascha/Documents/Repos/der-rosa-knopf/node_modules/.astro/","outDir":"file:///C:/Users/Sascha/Documents/Repos/der-rosa-knopf/dist/","srcDir":"file:///C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/","publicDir":"file:///C:/Users/Sascha/Documents/Repos/der-rosa-knopf/public/","buildClientDir":"file:///C:/Users/Sascha/Documents/Repos/der-rosa-knopf/dist/","buildServerDir":"file:///C:/Users/Sascha/Documents/Repos/der-rosa-knopf/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"courses/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/courses","isIndex":true,"type":"page","pattern":"^\\/courses\\/?$","segments":[[{"content":"courses","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/courses/index.astro","pathname":"/courses","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"imprint/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/imprint","isIndex":false,"type":"page","pattern":"^\\/imprint\\/?$","segments":[[{"content":"imprint","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/imprint.astro","pathname":"/imprint","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"og/default.png","links":[],"scripts":[],"styles":[],"routeData":{"route":"/og/default.png","isIndex":false,"type":"endpoint","pattern":"^\\/og\\/default\\.png\\/?$","segments":[[{"content":"og","dynamic":false,"spread":false}],[{"content":"default.png","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/og/default.png.ts","pathname":"/og/default.png","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"privacy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy\\/?$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"products/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/products","isIndex":true,"type":"page","pattern":"^\\/products\\/?$","segments":[[{"content":"products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/products/index.astro","pathname":"/products","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"projects/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects","isIndex":true,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/index.astro","pathname":"/projects","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/check-stock","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/check-stock\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"check-stock","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/check-stock.ts","pathname":"/api/check-stock","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://der-rosa-knopf.de","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/projects/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/courses/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/courses/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/imprint.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/privacy.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/products/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/products/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/projects/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/courses/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/courses/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/imprint@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/og/blog/[...slug].png.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/og/blog/[...slug].png@_@ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/og/products/[...slug].png.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/og/products/[...slug].png@_@ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/og/projects/[...slug].png.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/og/projects/[...slug].png@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/privacy@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/products/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/products/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/check-stock@_@ts":"pages/api/check-stock.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/courses/index@_@astro":"pages/courses.astro.mjs","\u0000@astro-page:src/pages/courses/[...slug]@_@astro":"pages/courses/_---slug_.astro.mjs","\u0000@astro-page:src/pages/imprint@_@astro":"pages/imprint.astro.mjs","\u0000@astro-page:src/pages/og/blog/[...slug].png@_@ts":"pages/og/blog/_---slug_.png.astro.mjs","\u0000@astro-page:src/pages/og/default.png@_@ts":"pages/og/default.png.astro.mjs","\u0000@astro-page:src/pages/og/products/[...slug].png@_@ts":"pages/og/products/_---slug_.png.astro.mjs","\u0000@astro-page:src/pages/og/projects/[...slug].png@_@ts":"pages/og/projects/_---slug_.png.astro.mjs","\u0000@astro-page:src/pages/privacy@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/products/index@_@astro":"pages/products.astro.mjs","\u0000@astro-page:src/pages/products/[...slug]@_@astro":"pages/products/_---slug_.astro.mjs","\u0000@astro-page:src/pages/projects/index@_@astro":"pages/projects.astro.mjs","\u0000@astro-page:src/pages/projects/[...slug]@_@astro":"pages/projects/_---slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CtNs7TeL.mjs","C:/Users/Sascha/Documents/Repos/der-rosa-knopf/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","C:\\Users\\Sascha\\Documents\\Repos\\der-rosa-knopf\\.astro\\content-assets.mjs":"chunks/content-assets_CSSTEblE.mjs","\u0000astro:assets":"chunks/_astro_assets_C3epxg9V.mjs","C:\\Users\\Sascha\\Documents\\Repos\\der-rosa-knopf\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_8Ctu0OhE.mjs","C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/products/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.ChJJhPEv.js","C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/products/[...slug].astro?astro&type=script&index=0&lang.ts":"_astro/_...slug_.astro_astro_type_script_index_0_lang.DD22ALnG.js","C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/components/BuyButton.astro?astro&type=script&index=0&lang.ts":"_astro/BuyButton.astro_astro_type_script_index_0_lang.doT6Uptn.js","C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.BzcJXfT6.js","C:/Users/Sascha/Documents/Repos/der-rosa-knopf/node_modules/photoswipe/dist/photoswipe.esm.js":"_astro/photoswipe.esm.CKV1Bsxh.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/pages/products/index.astro?astro&type=script&index=0&lang.ts","const r=document.getElementById(\"sort-select\"),s=document.getElementById(\"product-grid\");r&&s&&r.addEventListener(\"change\",()=>{const t=r.value,a=Array.from(s.children);a.sort((e,c)=>{const n=parseFloat(e.dataset.price||\"0\"),d=parseFloat(c.dataset.price||\"0\"),o=parseInt(e.dataset.date||\"0\"),i=parseInt(c.dataset.date||\"0\");return t===\"price-asc\"?n-d:t===\"price-desc\"?d-n:t===\"newest\"?i-o:0}),a.forEach(e=>s.appendChild(e))});"],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/components/BuyButton.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",async()=>{const s=document.querySelectorAll(\".stripe-buy-link\");for(const t of s){const o=t.getAttribute(\"data-stripe-url\");if(o)try{const e=await fetch(`/api/check-stock?url=${encodeURIComponent(o)}`);e.ok&&(await e.json()).active===!1&&(t.classList.add(\"bg-gray-100\",\"text-gray-500\",\"cursor-not-allowed\",\"opacity-70\",\"pointer-events-none\"),t.classList.remove(\"bg-rose-600\",\"hover:bg-rose-700\",\"text-white\",\"shadow-lg\",\"hover:shadow-xl\",\"hover:-translate-y-1\"),t.innerHTML='Ausverkauft <span class=\"block text-xs font-normal mt-1 text-gray-400\">Dieses Unikat ist leider schon weg. (Live Status)</span>',t.removeAttribute(\"href\"))}catch(e){console.error(\"Failed to verify live stock with Stripe\",e)}}});"],["C:/Users/Sascha/Documents/Repos/der-rosa-knopf/src/components/Header.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"mobile-menu-btn\"),n=document.getElementById(\"mobile-menu\");e&&n&&e.addEventListener(\"click\",()=>{n.classList.toggle(\"hidden\")});"]],"assets":["/_astro/sabine_profile_v2.CMVST7_N.png","/_astro/project1.4j2Xpeeu.png","/_astro/project3.CTGw9enH.png","/_astro/project2.BRQIO1j9.png","/_astro/pencil bag.C1i9_ok-.jpeg","/_astro/kette.R2Vu-lit.jpeg","/_astro/kleine-tasche.vQAYr_lW.jpeg","/_astro/purse.CmHSNT6C.jpeg","/_astro/rosa tasche 2.mRp0DGuR.jpeg","/_astro/rosa tasche.CWOUmF8c.jpeg","/_astro/projects.x5JEdMQB.jpg","/_astro/blau.CN60hmt4.jpeg","/_astro/ohrringe.mVMUyiJ1.jpeg","/_astro/insta4.DeUk8Aw8.jpg","/_astro/mehr mehr schmuck.q9QdlWvW.jpeg","/_astro/schmuck.BW8xpPvQ.jpeg","/_astro/mehr schmuck.aw0znRMG.jpeg","/_astro/kulturbeutel.BgiaOXrU.jpeg","/_astro/taschen-rosa.BltVzLdS.jpeg","/_astro/store.DmI7kDHg.jpg","/_astro/cover-photo.DliW-1OM.jpg","/_astro/insta2.DDLOrwGQ.jpg","/_astro/insta1.C_YbDsc7.jpg","/_astro/courses.BUJR7kal.jpg","/_astro/seamstress.DEMzWa9n.jpg","/_astro/anthony-fomin-ohcbhruzoya-unsplash.CZkwVBl8.jpg","/_astro/insta3.Bv6z326C.jpg","/_astro/inter-greek-ext-400-normal.DGGRlc-M.woff2","/_astro/inter-latin-ext-400-normal.C1nco2VV.woff2","/_astro/inter-vietnamese-400-normal.DMkecbls.woff2","/_astro/inter-cyrillic-ext-400-normal.BQZuk6qB.woff2","/_astro/playfair-display-vietnamese-400-normal.BV2APVTb.woff2","/_astro/inter-cyrillic-400-normal.obahsSVq.woff2","/_astro/inter-latin-400-normal.C38fXH4l.woff2","/_astro/inter-greek-400-normal.B4URO6DV.woff2","/_astro/playfair-display-latin-ext-400-normal.BxlSGspa.woff2","/_astro/playfair-display-latin-400-normal.CFtfchNt.woff2","/_astro/playfair-display-cyrillic-400-normal.CjW2EstV.woff2","/_astro/inter-vietnamese-400-normal.Bbgyi5SW.woff","/_astro/inter-greek-ext-400-normal.KugGGMne.woff","/_astro/inter-cyrillic-400-normal.HOLc17fK.woff","/_astro/inter-latin-ext-400-normal.77YHD8bZ.woff","/_astro/inter-cyrillic-ext-400-normal.DQukG94-.woff","/_astro/inter-greek-400-normal.q2sYcFCs.woff","/_astro/playfair-display-vietnamese-400-normal.BbvUAu4N.woff","/_astro/playfair-display-latin-ext-400-normal.qdZwdvNS.woff","/_astro/playfair-display-cyrillic-400-normal.ZiRag6zj.woff","/_astro/playfair-display-latin-400-normal.DHYHbkg3.woff","/_astro/inter-latin-400-normal.CyCys3Eg.woff","/_astro/_slug_.c4muCyeb.css","/der-rosa-knopf-logo-full.svg","/favicon.ico","/favicon.png","/og-image.png","/robots.txt","/rosa-knopf-logo.png","/admin/config.yml","/_astro/photoswipe.esm.CKV1Bsxh.js","/_astro/_...slug_.astro_astro_type_script_index_0_lang.DD22ALnG.js","/_astro/_...slug_.cPPnkASS.css","/404.html","/about/index.html","/admin/index.html","/blog/index.html","/courses/index.html","/imprint/index.html","/og/default.png","/privacy/index.html","/products/index.html","/projects/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"oOlF40Bylb0UKNJwrxRetHqjqWdVTl/TnonxipKm4js=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
