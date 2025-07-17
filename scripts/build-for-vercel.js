#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const publicPhotosPath = path.join(projectRoot, 'public', 'photos');
const tempPhotosPath = path.join(projectRoot, 'temp_photos');

console.log('🏗️  Building for Vercel with photo optimization...');

// Step 1: Generate photo manifest
console.log('📸 Generating photo manifest...');
execSync('node ./scripts/generate-photo-manifest.js', { cwd: projectRoot, stdio: 'inherit' });

// Step 2: Temporarily move photos to avoid including them in the function bundle
console.log('📦 Temporarily moving photos...');
if (fs.existsSync(publicPhotosPath)) {
  if (!fs.existsSync(tempPhotosPath)) {
    fs.mkdirSync(tempPhotosPath, { recursive: true });
  }
  
  const photos = fs.readdirSync(publicPhotosPath);
  photos.forEach(photo => {
    if (photo !== '.DS_Store' && !photo.startsWith('.')) {
      fs.renameSync(
        path.join(publicPhotosPath, photo),
        path.join(tempPhotosPath, photo)
      );
    }
  });
}

// Step 3: Build the project
console.log('🔨 Building Astro project...');
try {
  execSync('astro build', { cwd: projectRoot, stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Step 4: Move photos back to public for static serving
console.log('📷 Restoring photos for static serving...');
if (fs.existsSync(tempPhotosPath)) {
  const photos = fs.readdirSync(tempPhotosPath);
  photos.forEach(photo => {
    if (photo !== '.DS_Store' && !photo.startsWith('.')) {
      fs.renameSync(
        path.join(tempPhotosPath, photo),
        path.join(publicPhotosPath, photo)
      );
    }
  });
  fs.rmSync(tempPhotosPath, { recursive: true });
}

// Step 5: Copy photos to Vercel static output
console.log('📁 Copying photos to Vercel static output...');
const vercelStaticPath = path.join(projectRoot, '.vercel', 'output', 'static', 'photos');
if (fs.existsSync(vercelStaticPath)) {
  fs.rmSync(vercelStaticPath, { recursive: true });
}
fs.mkdirSync(vercelStaticPath, { recursive: true });

const photos = fs.readdirSync(publicPhotosPath);
photos.forEach(photo => {
  if (photo !== '.DS_Store' && !photo.startsWith('.')) {
    fs.copyFileSync(
      path.join(publicPhotosPath, photo),
      path.join(vercelStaticPath, photo)
    );
  }
});

console.log('✅ Build completed successfully!');
console.log('📊 Function size:', execSync('du -sh .vercel/output/functions/_render.func/', { cwd: projectRoot }).toString().trim());
