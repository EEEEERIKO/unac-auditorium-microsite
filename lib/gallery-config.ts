// Static gallery configuration - no randomness to avoid hydration mismatch
export interface GalleryImage {
  id: string;
  webp: string;
  jpg: string;
  category: 'events-ceremonies' | 'exteriors' | 'interior' | 'setups';
  size: 'normal' | 'wide' | 'large';
}

// Define images with deterministic sizing pattern
const eventsCeremoniesImages: GalleryImage[] = Array.from({ length: 35 }, (_, i) => ({
  id: `events-ceremonies-${i + 1}`,
  webp: `/gallery/events-ceremonies/events-ceremonies_${String(i + 1).padStart(2, '0')}.webp`,
  jpg: `/gallery/events-ceremonies/events-ceremonies_${String(i + 1).padStart(2, '0')}.jpg`,
  category: 'events-ceremonies' as const,
  // Deterministic sizing based on index
  size: i % 13 === 0 ? 'large' : (i % 7 === 0 ? 'wide' : 'normal')
}));

const exteriorsImages: GalleryImage[] = Array.from({ length: 6 }, (_, i) => ({
  id: `exteriors-${i + 1}`,
  webp: `/gallery/exteriors/exteriors_${String(i + 1).padStart(2, '0')}.webp`,
  jpg: `/gallery/exteriors/exteriors_${String(i + 1).padStart(2, '0')}.jpg`,
  category: 'exteriors' as const,
  size: i % 5 === 0 ? 'large' : (i % 3 === 0 ? 'wide' : 'normal')
}));

const interiorImages: GalleryImage[] = Array.from({ length: 11 }, (_, i) => ({
  id: `interior-${i + 1}`,
  webp: `/gallery/interior/interior_${String(i + 1).padStart(2, '0')}.webp`,
  jpg: `/gallery/interior/interior_${String(i + 1).padStart(2, '0')}.jpg`,
  category: 'interior' as const,
  size: i % 11 === 0 ? 'large' : (i % 6 === 0 ? 'wide' : 'normal')
}));

const setupsImages: GalleryImage[] = Array.from({ length: 3 }, (_, i) => ({
  id: `setups-${i + 1}`,
  webp: `/gallery/setups/setups_${String(i + 1).padStart(2, '0')}.webp`,
  jpg: `/gallery/setups/setups_${String(i + 1).padStart(2, '0')}.jpg`,
  category: 'setups' as const,
  size: 'normal'
}));

// Combine all images in a specific order with some layout distribution
export const galleryImages: GalleryImage[] = [
  ...eventsCeremoniesImages.slice(0, 8),
  ...exteriorsImages.slice(0, 2),
  ...eventsCeremoniesImages.slice(8, 16),
  ...interiorImages.slice(0, 3),
  ...eventsCeremoniesImages.slice(16, 24),
  ...setupsImages,
  ...eventsCeremoniesImages.slice(24, 35),
  ...interiorImages.slice(3, 11),
  ...exteriorsImages.slice(2, 6)
];
