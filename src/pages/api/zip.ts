import type { APIRoute } from 'astro';
import archiver from 'archiver';
import fs from 'fs';
import path from 'path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { files } = body;

    if (!files || !Array.isArray(files) || files.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No files specified' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a new archive
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    // Set up response headers
    const headers = new Headers({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="photos-${new Date().toISOString().split('T')[0]}.zip"`
    });

    // Create a stream for the ZIP
    const chunks: Uint8Array[] = [];
    
    archive.on('data', (chunk) => {
      chunks.push(new Uint8Array(chunk));
    });

    let resolvePromise: (value: Uint8Array) => void;
    let rejectPromise: (reason?: any) => void;
    
    const zipPromise = new Promise<Uint8Array>((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });

    archive.on('end', () => {
      // Combine all chunks into a single Uint8Array
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
      }
      resolvePromise(result);
    });

    archive.on('error', (err) => {
      console.error('Archive error:', err);
      rejectPromise(err);
    });

    // Add files to archive
    const photosDir = path.join(process.cwd(), 'public', 'photos');
    
    for (const filename of files) {
      const filePath = path.join(photosDir, filename);
      
      // Security check: ensure file is in photos directory
      if (!filePath.startsWith(photosDir)) {
        console.warn('Attempted path traversal:', filename);
        continue;
      }
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        console.warn('File not found:', filePath);
        continue;
      }
      
      // Add file to archive
      archive.file(filePath, { name: filename });
    }

    // Finalize the archive
    archive.finalize();

    // Wait for the archive to complete
    const zipBuffer = await zipPromise;

    return new Response(zipBuffer, {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('ZIP creation error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
