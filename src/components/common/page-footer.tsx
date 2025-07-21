import { GithubIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function PageFooter() {
  const { theme } = useTheme();
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });

  return (
    <footer className="p-4">
      <Card className="border border-black rounded-none rounded-t-[25px] md:rounded-t-[45px] overflow-hidden">
        <CardContent className="space-y-8">
          <div className="flex lg:flex-row flex-col gap-8 md:gap-12">
            <div
              className={cn(
                'flex justify-between md:items-center gap-6 md:gap-8',
                isMobile && 'flex-col mx-auto'
              )}
            >
              <div className="flex items-center gap-4">
                <div className="border border-black rounded-md">
                  <Image
                    src="/talentgetgo.png"
                    alt="Talent Logo"
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                </div>
                <div className="">
                  <Image
                    src="/starwars-logo.png"
                    alt="Talent Logo"
                    width={100}
                    height={100}
                    className="bg-black rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-8">
                <Link
                  href="/"
                  className={cn(
                    'hover:bg-black p-2 hover:text-white transition-colors rounded-md',
                    theme === 'dark' && 'hover:bg-white hover:text-black'
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/films"
                  className={cn(
                    'hover:bg-black p-2 hover:text-white transition-colors rounded-md',
                    theme === 'dark' && 'hover:bg-white hover:text-black'
                  )}
                >
                  Films
                </Link>
                <Link
                  href="/characters"
                  className={cn(
                    'hover:bg-black p-2 hover:text-white transition-colors rounded-md',
                    theme === 'dark' && 'hover:bg-white hover:text-black'
                  )}
                >
                  Characters
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4 pt-6 md:pt-8 border-zinc-800 border-t">
            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/thanhhoan-v2/TalentGetGo_Space_Odyssey"
                target="_blank"
              >
                <GithubIcon className="w-4 h-4 hover:text-lime-400 transition-colors" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/phan-dinh-thanh-hoan/"
                target="_blank"
              >
                <LinkedinIcon className="w-4 h-4 hover:text-lime-400 transition-colors" />
              </Link>
            </div>
            <p className="text-sm md:text-base text-right">
              © 2025 Space Odyssey. All Rights Reserved.
            </p>
          </div>
        </CardContent>
      </Card>
    </footer>
  );
}
