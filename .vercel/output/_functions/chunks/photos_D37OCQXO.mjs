import { c as createComponent, a as createAstro, e as renderHead, f as renderSlot, r as renderTemplate } from './astro/server_CdMcpHvA.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                           */
import fs from 'fs';
import path from 'path';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="A photo gallery built with Astro"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/raf/Dev/web/photo-gallery/src/layouts/Layout.astro", void 0);

function generatePhotoManifest() {
  const publicPhotosPath = path.join(process.cwd(), "public", "photos");
  if (!fs.existsSync(publicPhotosPath)) {
    console.warn("Photos directory does not exist:", publicPhotosPath);
    return [];
  }
  const supportedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  const files = fs.readdirSync(publicPhotosPath);
  const photos = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return supportedExtensions.includes(ext);
  }).map((filename) => {
    const name = path.parse(filename).name;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const title = name.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    return {
      slug,
      src: `/photos/${filename}`,
      title,
      filename
    };
  }).sort((a, b) => a.filename.localeCompare(b.filename));
  return photos;
}

export { $$Layout as $, generatePhotoManifest as g };
