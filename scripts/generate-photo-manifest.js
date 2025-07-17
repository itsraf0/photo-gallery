#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const publicPhotosPath = path.join(projectRoot, 'public', 'photos');
const manifestPath = path.join(projectRoot, 'src', 'data', 'photo-manifest.json');

function generatePhotoManifest() {
  if (!fs.existsSync(publicPhotosPath)) {
    console.warn('Photos directory does not exist:', publicPhotosPath);
    return [];
  }

  const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const files = fs.readdirSync(publicPhotosPath);
  
  const photos = files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return supportedExtensions.includes(ext);
    })
    .map(filename => {
      const name = path.parse(filename).name;
      const slug = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      const title = name
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

      return {
        slug,
        src: `/photos/${filename}`,
        title,
        filename,
      };
    })
    .sort((a, b) => a.filename.localeCompare(b.filename));

  return photos;
}

// Ensure the data directory exists
const dataDir = path.join(projectRoot, 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Generate and save manifest
const manifest = generatePhotoManifest();
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`Generated photo manifest with ${manifest.length} photos`);
