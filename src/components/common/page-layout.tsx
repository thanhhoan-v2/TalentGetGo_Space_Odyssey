import { PageFooter, PageHeader } from '@/components/common';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div
      className={cn(
        'min-h-screen bg-background text-foreground theme-transition',
        className
      )}
    >
      <PageHeader />
      <div className="mx-auto px-4 py-12 max-w-7xl">{children}</div>
      <PageFooter />
    </div>
  );
}
