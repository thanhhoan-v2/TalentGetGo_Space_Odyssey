import { StaticImageData } from 'next/image';

// Utility function to get character image
export const getCharacterImage = async (
  characterName: string
): Promise<StaticImageData | null> => {
  try {
    const image = await import(`@/assets/characters/${characterName}.jpg`);
    return image.default;
  } catch (error) {
    try {
      const fallbackImage = await import('@/assets/characters/Yoda.jpg');
      return fallbackImage.default;
    } catch {
      return null;
    }
  }
};

export const getCharacterImageById = async (
  characterId: number
): Promise<StaticImageData | null> => {
  try {
    const image = await import(`@/assets/characters-id/${characterId}.jpg`);
    return image.default;
  } catch (error) {
    try {
      const fallbackImage = await import('@/assets/characters-id/1.jpg');
      return fallbackImage.default;
    } catch {
      return null;
    }
  }
};

// Alternative: Pre-import common character images for better performance
export const characterImages: Record<string, StaticImageData> = {};

// Function to preload character images (call this in _app.tsx if needed)
export const preloadCharacterImages = async () => {
  const imageIds = Array.from({ length: 88 }, (_, i) => (i + 1).toString());

  for (const id of imageIds) {
    try {
      const image = await import(`@/assets/characters/${id}.jpg`);
      characterImages[id] = image.default;
    } catch (error) {
      // Skip missing images
      console.warn(`Character image ${id}.jpg not found`);
    }
  }
};

// Synchronous function to get preloaded character image
export const getPreloadedCharacterImage = (
  id: string
): StaticImageData | null => {
  return characterImages[id] || characterImages['1'] || null;
};
