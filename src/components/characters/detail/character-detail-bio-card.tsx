import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export default function CharacterDetailBioCard({
  title,
  gender,
  birthYear,
  homeworld,
}: {
  title: string;
  gender: string;
  birthYear: string;
  homeworld: string;
}) {
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
          <span className="font-bold">Gender</span>
          <span>{gender}</span>
        </li>
        <li className="flex justify-between items-center gap-3">
          <span className="font-bold">Birth Year</span>
          <span>{birthYear}</span>
        </li>
        <li className="flex justify-between items-center gap-3">
          <span className="font-bold">Homeworld</span>
          <span>{homeworld}</span>
        </li>
      </ul>
    </div>
  );
}
