import 'kleur/colors';
import { i as decodeKey } from './chunks/astro/server_CdMcpHvA.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_B-KOLa0W.mjs';
import 'es-module-lexer';

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

const manifest = deserializeManifest({"hrefRoot":"file:///Users/raf/Dev/web/photo-gallery/","cacheDir":"file:///Users/raf/Dev/web/photo-gallery/node_modules/.astro/","outDir":"file:///Users/raf/Dev/web/photo-gallery/dist/","srcDir":"file:///Users/raf/Dev/web/photo-gallery/src/","publicDir":"file:///Users/raf/Dev/web/photo-gallery/public/","buildClientDir":"file:///Users/raf/Dev/web/photo-gallery/dist/client/","buildServerDir":"file:///Users/raf/Dev/web/photo-gallery/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/zip","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/zip\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"zip","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/zip.ts","pathname":"/api/zip","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"html{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;line-height:1.6}*{box-sizing:border-box}body{margin:0;padding:0;background:#f9fafb;color:#111827}main{min-height:100vh}img{max-width:100%;height:auto}a{color:#3b82f6;text-decoration:none}a:hover{text-decoration:underline}button{font-family:inherit}\n.photo-card[data-astro-cid-udcgyguv]{position:relative;background:#fff;border-radius:8px;box-shadow:0 2px 8px #0000001a;overflow:hidden;transition:transform .2s ease,box-shadow .2s ease}.photo-card[data-astro-cid-udcgyguv]:hover{transform:translateY(-2px);box-shadow:0 4px 16px #00000026}.photo-container[data-astro-cid-udcgyguv]{position:relative;overflow:hidden}.photo-thumbnail[data-astro-cid-udcgyguv]{width:100%;height:300px;object-fit:cover;display:block;transition:transform .2s ease}.photo-container[data-astro-cid-udcgyguv]:hover .photo-thumbnail[data-astro-cid-udcgyguv]{transform:scale(1.05)}.photo-overlay[data-astro-cid-udcgyguv]{position:absolute;top:8px;right:8px;z-index:10}.photo-select[data-astro-cid-udcgyguv]{width:20px;height:20px;opacity:.8;cursor:pointer;accent-color:#3b82f6}.select-label[data-astro-cid-udcgyguv]{cursor:pointer}.photo-info[data-astro-cid-udcgyguv]{padding:12px 16px}.photo-title[data-astro-cid-udcgyguv]{margin:0;font-size:.9rem;font-weight:600;color:#374151;text-transform:capitalize}.sr-only[data-astro-cid-udcgyguv]{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.gallery-container[data-astro-cid-u5hpd7j5]{max-width:1200px;margin:0 auto;padding:20px}.gallery-header[data-astro-cid-u5hpd7j5]{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;flex-wrap:wrap;gap:20px}.gallery-header[data-astro-cid-u5hpd7j5] h1[data-astro-cid-u5hpd7j5]{margin:0;color:#1f2937;font-size:2rem;font-weight:700}.gallery-controls[data-astro-cid-u5hpd7j5]{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.control-btn[data-astro-cid-u5hpd7j5]{padding:8px 16px;background:#f3f4f6;border:1px solid #d1d5db;border-radius:6px;color:#374151;font-size:.875rem;font-weight:500;cursor:pointer;transition:all .2s ease}.control-btn[data-astro-cid-u5hpd7j5]:hover{background:#e5e7eb;border-color:#9ca3af}.download-btn[data-astro-cid-u5hpd7j5]{padding:10px 20px;background:#3b82f6;border:none;border-radius:6px;color:#fff;font-size:.875rem;font-weight:600;cursor:pointer;transition:all .2s ease}.download-btn[data-astro-cid-u5hpd7j5]:hover:not(:disabled){background:#2563eb;transform:translateY(-1px)}.download-btn[data-astro-cid-u5hpd7j5]:disabled{background:#9ca3af;cursor:not-allowed;transform:none}.gallery-grid[data-astro-cid-u5hpd7j5]{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;margin-top:30px}@media (max-width: 768px){.gallery-header[data-astro-cid-u5hpd7j5]{flex-direction:column;align-items:stretch}.gallery-controls[data-astro-cid-u5hpd7j5]{justify-content:center}.gallery-grid[data-astro-cid-u5hpd7j5]{grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}}\n"}],"routeData":{"route":"/gallery","isIndex":false,"type":"page","pattern":"^\\/gallery\\/?$","segments":[[{"content":"gallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gallery.astro","pathname":"/gallery","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/raf/Dev/web/photo-gallery/src/pages/gallery.astro",{"propagation":"none","containsHead":true}],["/Users/raf/Dev/web/photo-gallery/src/pages/photos/[slug].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/api/zip@_@ts":"pages/api/zip.astro.mjs","\u0000@astro-page:src/pages/photos/[slug]@_@astro":"pages/photos/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/gallery@_@astro":"pages/gallery.astro.mjs","/Users/raf/Dev/web/photo-gallery/node_modules/@astrojs/vercel/dist/image/build-service.js":"chunks/build-service_BLBU_GBx.mjs","\u0000@astrojs-manifest":"manifest_CWCfrTb_.mjs","/Users/raf/Dev/web/photo-gallery/src/components/GalleryGrid.astro?astro&type=script&index=0&lang.ts":"_astro/GalleryGrid.astro_astro_type_script_index_0_lang.BvaOe9_Z.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/raf/Dev/web/photo-gallery/src/components/GalleryGrid.astro?astro&type=script&index=0&lang.ts","const t=new Set,i=document.getElementById(\"select-all\"),r=document.getElementById(\"deselect-all\"),o=document.getElementById(\"download-selected\"),f=document.getElementById(\"selected-count\"),s=document.querySelectorAll(\".photo-select\");function c(){f.textContent=t.size.toString(),o.disabled=t.size===0,t.size===0?o.textContent=\"Download Selected (0)\":o.innerHTML=`Download Selected (<span id=\"selected-count\">${t.size}</span>)`}s.forEach(n=>{n.addEventListener(\"change\",e=>{const d=e.target,l=d.dataset.filename;l&&(d.checked?t.add(l):t.delete(l),c())})});i.addEventListener(\"click\",()=>{s.forEach(n=>{n.checked=!0;const e=n.dataset.filename;e&&t.add(e)}),c()});r.addEventListener(\"click\",()=>{s.forEach(n=>{n.checked=!1;const e=n.dataset.filename;e&&t.delete(e)}),t.clear(),c()});o.addEventListener(\"click\",async()=>{if(t.size===0)return;const n=Array.from(t);try{o.disabled=!0,o.textContent=\"Creating ZIP...\";const e=await fetch(\"/api/zip\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({files:n})});if(!e.ok)throw new Error(\"Failed to create ZIP\");const d=await e.blob(),l=URL.createObjectURL(d),a=document.createElement(\"a\");a.href=l,a.download=`photos-${new Date().toISOString().split(\"T\")[0]}.zip`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(l)}catch(e){console.error(\"Download failed:\",e),alert(\"Failed to download photos. Please try again.\")}finally{o.disabled=!1,c()}});"]],"assets":["/favicon.svg","/photos/DDU024.JPG","/photos/DDU042.JPG","/photos/DDU048.JPG","/photos/DDU051.JPG","/photos/DDU062.JPG","/photos/DDU066.JPG","/photos/DDU067.JPG","/photos/DDU078.JPG","/photos/DDU080.JPG","/photos/DDU081.JPG","/photos/DDU082.JPG","/photos/DDU085.JPG","/photos/DDU086.JPG","/photos/DDU089.JPG","/photos/DDU091.JPG","/photos/DDU093.JPG","/photos/DDU094.JPG","/photos/DDU095.JPG","/photos/DDU096.JPG","/photos/DDU100.JPG","/photos/DDU102.JPG","/photos/DDU104.JPG","/photos/DDU108.JPG","/photos/DDU118.JPG","/photos/DDU122.JPG","/photos/DDU124.JPG","/photos/DDU131.JPG","/photos/DDU132.JPG","/photos/DDU142.JPG","/photos/DDU143.JPG","/photos/DDU154.JPG","/photos/DDU161.JPG","/photos/DDU164.JPG","/photos/DDU167.JPG","/photos/DDU169.JPG","/photos/DDU177.JPG","/photos/MRT189.JPG","/photos/MRT191.JPG","/photos/MRT212.JPG","/photos/MRT226.JPG","/photos/MRT230.JPG","/photos/MRT238.JPG","/photos/MRT239.JPG","/photos/MRT244.JPG","/photos/MRT249.JPG","/photos/MRT251.JPG","/photos/MRT284.JPG","/photos/MRT313.JPG","/photos/MRT318.JPG","/photos/MRT319.JPG","/photos/MRT322.JPG","/photos/MRT325.JPG","/photos/MRT329.JPG","/photos/MRT331.JPG","/photos/MRT339.JPG","/photos/MRT346.JPG","/photos/MRT348.JPG","/photos/MRT352.JPG","/photos/MRT354.JPG","/photos/MRT355.JPG","/photos/MRT357.JPG","/photos/MRT358.JPG","/photos/MRT363.JPG","/photos/MRT373.JPG","/photos/MRT377.JPG","/photos/MRT389.JPG","/photos/MRT393.JPG","/photos/MRT418.JPG","/photos/MRT423.JPG","/photos/MRT425.JPG","/photos/MRT427.JPG","/photos/MRT431.JPG","/photos/MRT432.JPG","/photos/MRT435.JPG","/photos/MRT438.JPG","/photos/MRT442.JPG","/photos/MRT448.JPG","/photos/MRT450.JPG","/photos/MRT452.JPG","/photos/MRT453.JPG","/photos/MRT454.JPG","/photos/MRT461.JPG","/photos/MRT471.JPG","/photos/MRT474.JPG","/photos/MRT475.JPG","/photos/MRT478.JPG"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"HDiLqHfwzzPuQJ7bBxUbQ9nVMHXrk9RkW+mUCUxLBdE="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
