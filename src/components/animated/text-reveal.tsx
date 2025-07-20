'use client';

import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from 'react';

import { cn } from '@/lib/utils';

export interface TextRevealProps extends ComponentPropsWithoutRef<'div'> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 0.4', 'end 0.6'],
  });

  if (typeof children !== 'string') {
    throw new Error('TextReveal: children must be a string');
  }

  const words = children.split(' ');

  return (
    <div
      ref={targetRef}
      className={cn(
        'relative z-0',
        'mobile_s:h-[400vh]',
        'mobile_m:h-[300vh]',
        'mobile_l:h-[200vh]',
        'tablet:h-[100vh]',
        'laptop:h-[50vh]',
        'desktop:h-[25vh]',
        'desktop_l:h-[10vh]',
        className
      )}
    >
      <div className="top-0 sticky flex items-center bg-transparent mx-auto px-[0.2rem] py-[5rem] max-w-4xl h-[50%]">
        <span
          ref={targetRef}
          className="flex flex-wrap p-1 md:p-2 lg:p-4 font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-balance"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1 lg:mx-1.5 xl:mx-2">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};
