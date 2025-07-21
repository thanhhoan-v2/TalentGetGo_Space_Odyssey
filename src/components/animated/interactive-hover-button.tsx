import { cn } from '@/lib/utils';
import { ROUTES } from '@/utils/routes';
import { FilmIcon, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface InteractiveHoverButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLAnchorElement,
  InteractiveHoverButtonProps
>(({ children, className, href, ...props }, ref) => {
  return (
    <Link
      href={href}
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
        {href === ROUTES.FILMS ? <FilmIcon size={20} /> : <Users size={20} />}
        <span>{children}</span>
      </div>
    </Link>
  );
});

InteractiveHoverButton.displayName = 'InteractiveHoverButton';
