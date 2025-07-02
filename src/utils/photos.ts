import fs from 'fs';
import path from 'path';

export interface Photo {
  slug: string;
  src: string;
  title: string;
  width?: number;
  height?: number;
  filename: string;
}

export function generatePhotoManifest(): Photo[] {
  const publicPhotosPath = path.join(process.cwd(), 'public', 'photos');
  
  if (!fs.existsSync(publicPhotosPath)) {
    console.warn('Photos directory does not exist:', publicPhotosPath);
    return [];
  }

  const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const files = fs.readdirSync(publicPhotosPath);
  
  const photos: Photo[] = files
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

export function getPhotoBySlug(slug: string): Photo | undefined {
  const photos = generatePhotoManifest();
  return photos.find(photo => photo.slug === slug);
}
