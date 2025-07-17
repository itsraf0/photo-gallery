import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DBJIPQjn.mjs';
import { manifest } from './manifest_CWCfrTb_.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/zip.astro.mjs');
const _page2 = () => import('./pages/gallery.astro.mjs');
const _page3 = () => import('./pages/photos/_slug_.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/zip.ts", _page1],
    ["src/pages/gallery.astro", _page2],
    ["src/pages/photos/[slug].astro", _page3],
    ["src/pages/index.astro", _page4]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "9f0848a9-f706-4a04-b5e6-f26262c2fdee",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
