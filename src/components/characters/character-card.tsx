import { Person } from '@/schema/swapi';
import { getCharacterImage } from '@/utils/assets';
import { extractIdFromUrl } from '@/utils/swapi';
import { Card, Image as ChakraImage, Heading, VStack } from '@chakra-ui/react';
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
          <Link href={character.url}>
            <Card.Root
              variant="elevated"
              bg="gray.900"
              borderColor="gray.700"
              _hover={{
                borderColor: 'yellow.400',
                shadow: 'xl',
                transform: 'translateY(-4px)',
              }}
              transition="all 0.3s ease"
              cursor="pointer"
              h="full"
            >
              <Card.Body p={6}>
                <VStack align="center">
                  <ChakraImage asChild>
                    <Image
                      src={characterImage}
                      alt={character.name}
                      width={500}
                      height={500}
                      layout="responsive"
                      objectFit="cover"
                      style={{ borderRadius: '4px' }}
                    />
                  </ChakraImage>
                  <Heading size="md" color="white" lineClamp={1}>
                    {character.name}
                  </Heading>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Link>
        </motion.div>
      )}
    </>
  );
}
