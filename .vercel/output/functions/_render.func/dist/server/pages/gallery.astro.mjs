import { c as createComponent, a as createAstro, m as maybeRenderHead, g as addAttribute, b as renderComponent, r as renderTemplate, h as renderScript } from '../chunks/astro/server_CdMcpHvA.mjs';
import 'kleur/colors';
import { $ as $$Layout, g as generatePhotoManifest } from '../chunks/photos_CprrbrnG.mjs';
import '../chunks/index_CCxZAn8N.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_Cg-Jxw1M.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$PhotoCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PhotoCard;
  const { src, slug, title, filename, width = 300, height = 300 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="photo-card" data-astro-cid-udcgyguv> <div class="photo-container" data-astro-cid-udcgyguv> <a${addAttribute(`/photos/${slug}`, "href")} data-astro-cid-udcgyguv> ${renderComponent($$result, "Image", $$Image, { "src": src, "alt": title, "width": width, "height": height, "class": "photo-thumbnail", "format": "webp", "quality": "mid", "data-astro-cid-udcgyguv": true })} </a> <div class="photo-overlay" data-astro-cid-udcgyguv> <input type="checkbox" class="photo-select"${addAttribute(slug, "data-slug")}${addAttribute(filename, "data-filename")}${addAttribute(`select-${slug}`, "id")} data-astro-cid-udcgyguv> <label${addAttribute(`select-${slug}`, "for")} class="select-label" data-astro-cid-udcgyguv> <span class="sr-only" data-astro-cid-udcgyguv>Select ${title}</span> </label> </div> </div> <div class="photo-info" data-astro-cid-udcgyguv> <h3 class="photo-title" data-astro-cid-udcgyguv>${title}</h3> </div> </div> `;
}, "/Users/raf/Dev/web/photo-gallery/src/components/PhotoCard.astro", void 0);

const $$Astro = createAstro();
const $$GalleryGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GalleryGrid;
  const { photos } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="gallery-container" data-astro-cid-u5hpd7j5> <div class="gallery-header" data-astro-cid-u5hpd7j5> <h1 data-astro-cid-u5hpd7j5>Photos</h1> <div class="gallery-controls" data-astro-cid-u5hpd7j5> <button id="select-all" class="control-btn" data-astro-cid-u5hpd7j5>Select All</button> <button id="deselect-all" class="control-btn" data-astro-cid-u5hpd7j5>Deselect All</button> <button id="download-selected" class="download-btn" disabled data-astro-cid-u5hpd7j5>
Download Selected (<span id="selected-count" data-astro-cid-u5hpd7j5>0</span>)
</button> </div> </div> <div class="gallery-grid" data-astro-cid-u5hpd7j5> ${photos.map((photo) => renderTemplate`${renderComponent($$result, "PhotoCard", $$PhotoCard, { "src": photo.src, "slug": photo.slug, "title": photo.title, "filename": photo.filename, "width": photo.width, "height": photo.height, "data-astro-cid-u5hpd7j5": true })}`)} </div> </div> ${renderScript($$result, "/Users/raf/Dev/web/photo-gallery/src/components/GalleryGrid.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/raf/Dev/web/photo-gallery/src/components/GalleryGrid.astro", void 0);

const $$Gallery = createComponent(($$result, $$props, $$slots) => {
  const photos = generatePhotoManifest();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Photo Gallery" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "GalleryGrid", $$GalleryGrid, { "photos": photos })} </main> ` })}`;
}, "/Users/raf/Dev/web/photo-gallery/src/pages/gallery.astro", void 0);

const $$file = "/Users/raf/Dev/web/photo-gallery/src/pages/gallery.astro";
const $$url = "/gallery";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Gallery,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
