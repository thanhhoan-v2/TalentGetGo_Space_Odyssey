import { cn } from '@/lib/utils';
import { STORAGE_KEY } from '@/utils/constants';
import { ROUTES } from '@/utils/routes';
import { FilmIcon, HeartCrackIcon, HeartIcon, Users } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface InteractiveHoverButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  characterName?: string;
  characterUrl?: string;
}

interface CharacterCardProps {
  characterUrl: string;
  characterName: string;
}

export default function InteractiveHoverButton({
  children,
  className,
  href,
  characterName,
  characterUrl,
  ...props
}: InteractiveHoverButtonProps) {
  const [items, setItems] = useState<CharacterCardProps[]>([]);
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedItems = JSON.parse(stored) as CharacterCardProps[];
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

  // Save to localStorage when items change (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [items, isInitialized]);

  const addItem = () => {
    if (characterName && characterUrl) {
      setItems((prevItems) => {
        // Check if character already exists (by URL or name)
        const characterExists = prevItems.some(
          (item) =>
            item.characterUrl === characterUrl ||
            item.characterName === characterName
        );

        if (characterExists) {
          // Remove from favorites
          setIsAlreadyFavorite(false);
          return prevItems.filter(
            (item) =>
              item.characterUrl !== characterUrl &&
              item.characterName !== characterName
          );
        }

        // Add to favorites
        setIsAlreadyFavorite(true);
        return [
          ...prevItems,
          {
            characterName,
            characterUrl,
          },
        ];
      });
    }
  };

  return (
    <>
      {href ? (
        <Link
          href={href || ''}
          className={cn(
            'group relative cursor-pointer w-[200px] overflow-hidden border bg-white text-black p-2 px-6 text-center font-semibold shadow-brutal',
            className
          )}
          {...props}
        >
          <div className="flex justify-center items-center gap-2">
            {/* <div className="bg-primary rounded-full w-2 h-2 group-hover:scale-[100.8] transition-all duration-300"></div> */}
            <span className="inline-block group-hover:opacity-0 text-center transition-all group-hover:translate-x-12 duration-300">
              {href === ROUTES.FILMS ? 'Explore' : 'Meet'}
              &nbsp;
              {children}
            </span>
          </div>
          <div className="top-0 z-10 absolute flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 w-full h-full text-primary-foreground transition-all translate-x-12 group-hover:-translate-x-5 duration-300">
            {href === ROUTES.FILMS ? (
              <FilmIcon size={20} />
            ) : (
              <Users size={20} />
            )}
            <span>{children}</span>
          </div>
        </Link>
      ) : (
        <div
          onClick={addItem}
          className={cn(
            'group relative cursor-pointer w-[250px] overflow-hidden border bg-white text-black p-2 px-6 text-center font-semibold shadow-brutal',
            className
          )}
        >
          <div className="flex justify-center items-center gap-2">
            {/* <div className="bg-primary rounded-full w-2 h-2 group-hover:scale-[100.8] transition-all duration-300"></div> */}
            <span className="inline-block group-hover:opacity-0 text-center transition-all group-hover:translate-x-12 duration-300">
              {isAlreadyFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </span>
          </div>
          <div className="top-0 z-10 absolute flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 w-full h-full text-primary-foreground transition-all translate-x-12 group-hover:-translate-x-5 duration-300">
            {isAlreadyFavorite ? (
              <span className="flex items-center gap-2">
                <HeartCrackIcon size={20} fill="red" /> {characterName}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <HeartIcon size={20} fill="red" /> {characterName}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
