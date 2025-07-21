import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export const CharacterAppearanceCard = ({
  title,
  height,
  mass,
  hairColor,
  skinColor,
  eyeColor,
}: {
  title: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
}) => {
  const { theme } = useTheme();
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <div
      className={cn(
        'shadow-brutal p-8 border-8 border-black',
        theme === 'dark' && 'shadow-brutal-inverse'
      )}
    >
      <h2 className="mb-6 pb-2 border-b-4 border-black font-black text-3xl uppercase">
        {title}
      </h2>
      <ul className="space-y-4 text-lg">
        <li className="flex justify-between items-center gap-3">
          <span className="font-bold">Height</span>
          <span>{height}</span>
        </li>
        <li className="flex justify-between items-center gap-3">
          <span className="font-bold">Mass</span>
          <span>{mass}</span>
        </li>
        <li className="flex justify-between items-center gap-3">
          <span className="font-bold">Hair Color</span>
          {hairColor !== 'none' ? (
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-4 h-4 border-2 border-black',
                  hairColor === 'blue' && 'bg-blue-500',
                  hairColor === 'brown' && 'bg-brown-500',
                  hairColor === 'green' && 'bg-green-500',
                  hairColor === 'hazel' && 'bg-yellow-500',
                  hairColor === 'red' && 'bg-red-500',
                  hairColor === 'yellow' && 'bg-yellow-500',
                  hairColor === 'orange' && 'bg-orange-500'
                )}
              />
              <span>{hairColor}</span>
            </div>
          ) : (
            <span>N/A</span>
          )}
        </li>
        <li className="flex justify-between items-center gap-3">
          <span className="font-bold">Skin Color</span>
          {skinColor !== 'none' ? (
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-4 h-4 border-2 border-black',
                  skinColor === 'blue' && 'bg-blue-500',
                  skinColor === 'brown' && 'bg-brown-500',
                  skinColor === 'green' && 'bg-green-500',
                  skinColor === 'hazel' && 'bg-yellow-500',
                  skinColor === 'red' && 'bg-red-500',
                  skinColor === 'yellow' && 'bg-yellow-500',
                  skinColor === 'orange' && 'bg-orange-500'
                )}
              />
              <span>{skinColor}</span>
            </div>
          ) : (
            <span>N/A</span>
          )}
        </li>
        <li className="flex justify-between items-center gap-3">
          <span className="font-bold">Eye Color</span>
          {eyeColor !== 'none' ? (
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-4 h-4 border-2 border-black',
                  eyeColor === 'blue' && 'bg-blue-500',
                  eyeColor === 'brown' && 'bg-brown-500',
                  eyeColor === 'green' && 'bg-green-500',
                  eyeColor === 'hazel' && 'bg-yellow-500',
                  eyeColor === 'red' && 'bg-red-500',
                  eyeColor === 'yellow' && 'bg-yellow-500',
                  eyeColor === 'orange' && 'bg-orange-500'
                )}
              />
              <span>{eyeColor}</span>
            </div>
          ) : (
            <span>N/A</span>
          )}
        </li>
      </ul>
    </div>
  );
};
