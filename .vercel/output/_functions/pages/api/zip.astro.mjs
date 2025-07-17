import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { files } = body;
    if (!files || !Array.isArray(files) || files.length === 0) {
      return new Response(
        JSON.stringify({ error: "No files specified" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const archive = archiver("zip", {
      zlib: { level: 9 }
      // Maximum compression
    });
    const headers = new Headers({
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="photos-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.zip"`
    });
    const chunks = [];
    archive.on("data", (chunk) => {
      chunks.push(new Uint8Array(chunk));
    });
    let resolvePromise;
    let rejectPromise;
    const zipPromise = new Promise((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });
    archive.on("end", () => {
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
      }
      resolvePromise(result);
    });
    archive.on("error", (err) => {
      console.error("Archive error:", err);
      rejectPromise(err);
    });
    const photosDir = path.join(process.cwd(), "public", "photos");
    if (!fs.existsSync(photosDir)) {
      return new Response(
        JSON.stringify({ error: "Photos directory not found. Photos may have been moved to external storage." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    for (const filename of files) {
      const filePath = path.join(photosDir, filename);
      if (!filePath.startsWith(photosDir)) {
        console.warn("Attempted path traversal:", filename);
        continue;
      }
      if (!fs.existsSync(filePath)) {
        console.warn("File not found:", filePath);
        continue;
      }
      archive.file(filePath, { name: filename });
    }
    archive.finalize();
    const zipBuffer = await zipPromise;
    return new Response(zipBuffer, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error("ZIP creation error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
