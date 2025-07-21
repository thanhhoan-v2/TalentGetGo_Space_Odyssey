import { GithubIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function PageFooter() {
  const { theme } = useTheme();
  return (
    <footer className="px-4 md:px-24 py-8 md:py-16">
      <Card className="border border-zinc-800 rounded-none rounded-t-[25px] md:rounded-t-[45px] overflow-hidden">
        <CardContent className="space-y-8 md:space-y-12 p-8 md:p-16">
          <div className="flex lg:flex-row flex-col gap-8 md:gap-12">
            <div className="flex-1 space-y-6 md:space-y-8">
              <div className="flex md:flex-row flex-col items-start md:items-center gap-6 md:gap-8">
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
                  <div className="border border-black rounded-md">
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
