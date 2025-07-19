import { Card, CardContent, Heading, VStack } from '@/components/ui';
import { Person } from '@/schema/swapi';
import { getCharacterImage } from '@/utils/assets';
import { extractIdFromUrl } from '@/utils/swapi';
import { motion } from 'framer-motion';
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
          <Link href={`/characters/${characterId}`}>
            <Card className="bg-card hover:shadow-xl rebel-base:card-shadow hover:border-primary border-border h-full transition-all hover:-translate-y-1 duration-300 cursor-pointer empire:card-glow">
              <CardContent className="p-6">
                <VStack align="center">
                  <div className="relative rounded w-full aspect-square overflow-hidden">
                    <Image
                      src={characterImage}
                      alt={character.name}
                      width={500}
                      height={500}
                      className="object-cover"
                    />
                  </div>
                  <Heading size="md" className="text-foreground line-clamp-1">
                    {character.name}
                  </Heading>
                </VStack>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      )}
    </>
  );
}
