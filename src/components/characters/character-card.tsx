import { cn } from '@/lib/utils';
import { Person } from '@/schema/swapi';
import { getCharacterImage } from '@/utils/assets';
import { extractIdFromUrl } from '@/utils/swapi';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CharacterCardProps {
  character: Person;
  index?: number;
}

export function CharacterCard({ character, index = 0 }: CharacterCardProps) {
  const [characterImage, setCharacterImage] = useState<string | null>(null);
  const characterId = extractIdFromUrl(character.url);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await getCharacterImage(characterId);
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={`/characters/${characterId}`}
            className="group block w-full max-w-[280px]"
          >
            <div
              className={cn(
                'relative overflow-hidden rounded-2xl',
                'bg-white/80 dark:bg-zinc-900/80',
                'backdrop-blur-xl',
                'border border-zinc-200/50 dark:border-zinc-800/50',
                'shadow-xs',
                'transition-all duration-300',
                'hover:shadow-md',
                'hover:border-zinc-300/50 dark:hover:border-zinc-700/50'
              )}
            >
              <div className="relative h-[320px] overflow-hidden">
                <Image
                  src={characterImage}
                  alt={character.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div
                className={cn(
                  'absolute inset-0',
                  'bg-linear-to-t from-black/90 via-black/40 to-transparent'
                )}
              />

              <div className="top-3 right-3 absolute"></div>

              <div className="right-0 bottom-0 left-0 absolute p-5">
                <div className="flex justify-between items-center gap-3">
                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-white dark:text-zinc-100 text-lg leading-snug">
                      {character.name}
                    </h3>
                  </div>
                  <div
                    className={cn(
                      'p-2 rounded-full',
                      'bg-white/10 dark:bg-zinc-800/50',
                      'backdrop-blur-md',
                      'group-hover:bg-white/20 dark:group-hover:bg-zinc-700/50',
                      'transition-colors duration-300 group'
                    )}
                  >
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:-rotate-12 transition-transform duration-300" />
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
