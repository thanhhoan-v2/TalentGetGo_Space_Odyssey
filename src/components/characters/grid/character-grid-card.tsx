import { cn } from '@/lib/utils';
import { getCharacterImageById } from '@/utils/assets';
import { STORAGE_KEY } from '@/utils/constants';
import { extractNumber } from '@/utils/swapi-graphql';
import { motion } from 'framer-motion';
import { ArrowUpRight, HeartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CharacterGridCardProps {
  characterUrl: string;
  characterName: string;
  index?: number;
  imageWidth?: string;
  imageHeight?: string;
}

export default function CharacterGridCard({
  index = 0,
  characterName,
  characterUrl,
  imageWidth,
  imageHeight,
}: CharacterGridCardProps) {
  const [characterImage, setCharacterImage] = useState<string | null>(null);
  const characterId = extractNumber(characterUrl);
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);
  const [items, setItems] = useState<CharacterGridCardProps[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedItems = JSON.parse(stored) as CharacterGridCardProps[];
        setItems(parsedItems);

        // Check if current character is already a favorite
        if (characterName && characterUrl) {
          const isFavorite = parsedItems.some(
            (item) =>
              item.characterUrl === characterUrl ||
              item.characterName === characterName
          );
          setIsAlreadyFavorite(isFavorite);
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    setIsInitialized(true);
  }, [characterName, characterUrl]);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await getCharacterImageById(characterId || 1);
        if (image) setCharacterImage(image.src);
      } catch (error) {
        console.warn(
          `Failed to load character image for ${characterId}:`,
          error
        );
      }
    };
    loadImage();
  }, [characterId]);

  return (
    <>
      {characterImage && (
        <motion.div
          key={characterName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: (index ?? 0) * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={characterUrl}
            className={cn('group block mx-auto w-[280px]', imageWidth)}
          >
            <div className="relative overflow-hidden">
              <div
                className={cn(
                  'relative h-[320px] overflow-hidden',
                  imageHeight
                )}
              >
                <Image
                  src={characterImage}
                  alt={characterName}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

              <div className="top-3 right-3 absolute"></div>

              <div className="right-0 bottom-0 left-0 absolute p-5">
                <div className="flex justify-between items-center gap-3">
                  <div className="space-y-1.5">
                    <h3 className="flex items-center gap-2 font-semibold text-white dark:text-zinc-100 text-lg leading-snug">
                      {characterName}{' '}
                      {isAlreadyFavorite && (
                        <span className="text-white text-sm">
                          <HeartIcon fill="red" className="w-4 h-4" />
                        </span>
                      )}
                    </h3>
                  </div>
                  <div className="bg-black/50 p-2">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:-rotate-340 group-hover:scale-120 transition-transform duration-600" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </>
  );
}
