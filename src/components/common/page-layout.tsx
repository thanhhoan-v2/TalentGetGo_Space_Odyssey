import PageFooter from '@/components/common/page-footer';
import { PageHeader } from '@/components/common/page-header';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
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
