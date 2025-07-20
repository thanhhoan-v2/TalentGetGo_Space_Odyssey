import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

// Heading component variants
const headingVariants = cva(
  'font-bold text-foreground leading-tight tracking-tight theme-transition',
  {
    variants: {
      size: {
        '4xl': 'text-4xl md:text-5xl lg:text-6xl',
        '3xl': 'text-3xl md:text-4xl lg:text-5xl',
        '2xl': 'text-2xl md:text-3xl lg:text-4xl',
        xl: 'text-xl md:text-2xl lg:text-3xl',
        lg: 'text-lg md:text-xl lg:text-2xl',
        md: 'text-base md:text-lg lg:text-xl',
        sm: 'text-sm md:text-base lg:text-lg',
        xs: 'text-xs md:text-sm lg:text-base',
      },
      variant: {
        default: 'text-foreground',
        gradient: 'star-wars-gradient font-extrabold',
        primary: 'text-primary',
        secondary: 'text-secondary',
        muted: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      size: 'lg',
      variant: 'default',
    },
  }
);

// Text component variants
const textVariants = cva('text-foreground leading-relaxed theme-transition', {
  variants: {
    size: {
      xl: 'text-xl md:text-2xl',
      lg: 'text-lg md:text-xl',
      md: 'text-base md:text-lg',
      sm: 'text-sm md:text-base',
      xs: 'text-xs md:text-sm',
    },
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent-foreground',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    weight: 'normal',
  },
});

export interface HeadingProps
  extends React.ComponentPropsWithoutRef<'h1'>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, variant, as: Comp = 'h1', ...props }, ref) => {
    return (
      <Comp
        className={cn(headingVariants({ size, variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Heading.displayName = 'Heading';

export interface TextProps
  extends Omit<React.ComponentPropsWithoutRef<'p'>, 'as'>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'label';
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, size, variant, weight, as = 'p', children, ...props }, ref) => {
    const Component = as;

    return React.createElement(
      Component,
      {
        className: cn(textVariants({ size, variant, weight, className })),
        ref,
        ...props,
      },
      children
    );
  }
);

Text.displayName = 'Text';

// Specialized Star Wars components
export interface StarWarsHeadingProps extends HeadingProps {
  glowing?: boolean;
}

export const StarWarsHeading = React.forwardRef<
  HTMLHeadingElement,
  StarWarsHeadingProps
>(({ className, glowing = false, ...props }, ref) => {
  return (
    <Heading
      className={cn(
        'font-extrabold star-wars-gradient',
        glowing && 'filter drop-shadow-lg',
        className
      )}
      variant="gradient"
      ref={ref}
      {...props}
    />
  );
});

StarWarsHeading.displayName = 'StarWarsHeading';

export interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl';
  centerContent?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = '7xl', centerContent = false, ...props }, ref) => {
    const sizeClasses = {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-8xl',
      '7xl': 'max-w-7xl',
    };

    return (
      <div
        className={cn(
          'mx-auto px-4',
          sizeClasses[size],
          centerContent && 'flex items-center justify-center',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

export interface FlexProps extends React.ComponentPropsWithoutRef<'div'> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    { className, direction = 'row', align, justify, wrap, gap, ...props },
    ref
  ) => {
    const directionClasses = {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    };

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    };

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const wrapClasses = {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
      'wrap-reverse': 'flex-wrap-reverse',
    };

    const gapClasses = {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };

    return (
      <div
        className={cn(
          'flex',
          directionClasses[direction],
          align && alignClasses[align],
          justify && justifyClasses[justify],
          wrap && wrapClasses[wrap],
          gap && (typeof gap === 'number' ? `gap-${gap}` : gapClasses[gap]),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Flex.displayName = 'Flex';

// VStack and HStack shortcuts
export const VStack = React.forwardRef<
  HTMLDivElement,
  Omit<FlexProps, 'direction'>
>((props, ref) => <Flex direction="column" ref={ref} {...props} />);

VStack.displayName = 'VStack';

export const Box = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div className={cn('theme-transition', className)} ref={ref} {...props} />
  );
});

Box.displayName = 'Box';
