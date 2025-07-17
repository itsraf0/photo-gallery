import photoManifest from '../data/photo-manifest.json';

export interface Photo {
  slug: string;
  src: string;
  title: string;
  width?: number;
  height?: number;
  filename: string;
}

export function generatePhotoManifest(): Photo[] {
  return photoManifest as Photo[];
}

export function getPhotoBySlug(slug: string): Photo | undefined {
  const photos = generatePhotoManifest();
  return photos.find(photo => photo.slug === slug);
}
