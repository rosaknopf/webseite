import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_C34RbQ2K.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/admin.astro.mjs');
const _page4 = () => import('./pages/api/check-stock.astro.mjs');
const _page5 = () => import('./pages/blog.astro.mjs');
const _page6 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page7 = () => import('./pages/courses.astro.mjs');
const _page8 = () => import('./pages/courses/_---slug_.astro.mjs');
const _page9 = () => import('./pages/imprint.astro.mjs');
const _page10 = () => import('./pages/og/blog/_---slug_.png.astro.mjs');
const _page11 = () => import('./pages/og/default.png.astro.mjs');
const _page12 = () => import('./pages/og/products/_---slug_.png.astro.mjs');
const _page13 = () => import('./pages/og/projects/_---slug_.png.astro.mjs');
const _page14 = () => import('./pages/privacy.astro.mjs');
const _page15 = () => import('./pages/products.astro.mjs');
const _page16 = () => import('./pages/products/_---slug_.astro.mjs');
const _page17 = () => import('./pages/projects.astro.mjs');
const _page18 = () => import('./pages/projects/_---slug_.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/admin/index.astro", _page3],
    ["src/pages/api/check-stock.ts", _page4],
    ["src/pages/blog/index.astro", _page5],
    ["src/pages/blog/[...slug].astro", _page6],
    ["src/pages/courses/index.astro", _page7],
    ["src/pages/courses/[...slug].astro", _page8],
    ["src/pages/imprint.astro", _page9],
    ["src/pages/og/blog/[...slug].png.ts", _page10],
    ["src/pages/og/default.png.ts", _page11],
    ["src/pages/og/products/[...slug].png.ts", _page12],
    ["src/pages/og/projects/[...slug].png.ts", _page13],
    ["src/pages/privacy.astro", _page14],
    ["src/pages/products/index.astro", _page15],
    ["src/pages/products/[...slug].astro", _page16],
    ["src/pages/projects/index.astro", _page17],
    ["src/pages/projects/[...slug].astro", _page18],
    ["src/pages/index.astro", _page19]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "8a70bd76-1ed9-44c1-9e15-5cbc02af154b"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
