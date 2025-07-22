import { Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Loader2, Search } from 'lucide-react';

interface CharacterSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isLoading?: boolean;
}

export default function CharacterSearchBar({
  searchQuery,
  onSearchChange,
  isLoading = false,
}: CharacterSearchBarProps) {
  return (
    <div className="relative mx-auto mb-8 max-w-2xl">
      <div className="top-1/2 left-3 z-10 absolute -translate-y-1/2 pointer-events-none">
        <Search size={20} className="text-muted-foreground" />
      </div>
      {isLoading && (
        <div className="top-1/2 right-3 z-10 absolute -translate-y-1/2 pointer-events-none">
          <Loader2 size={20} className="text-muted-foreground animate-spin" />
        </div>
      )}
      <Input
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search characters (e.g., Luke, Vader, Leia)..."
        className={cn(
          'pl-10 h-12 bg-input border-border text-foreground placeholder:text-muted-foreground',
          'focus:border-ring focus:ring-1 focus:ring-ring theme-transition',
          'hover:border-border/80',
          isLoading && 'pr-10'
        )}
      />
    </div>
  );
}
