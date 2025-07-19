import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { PageHeader } from './page-header';

interface PageLayoutProps {
  children: ReactNode;
  currentPage: 'films' | 'characters' | 'home';
  className?: string;
}

export function PageLayout({
  children,
  currentPage,
  className,
}: PageLayoutProps) {
  return (
    <div
      className={cn(
        'min-h-screen bg-background text-foreground theme-transition',
        className
      )}
    >
      <PageHeader currentPage={currentPage} />
      <div className="mx-auto px-4 py-12 max-w-7xl">{children}</div>
    </div>
  );
}
