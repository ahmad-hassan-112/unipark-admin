'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import cn from 'classnames';

const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={cn('inline-flex gap-8 pl-8 mb-8 border-b border-[var(--neutral100)] w-full', className)} {...props} />
));

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center gap-2 pb-4 mb-[-1px] text-base font-medium text-[var(--neutral450)] border-b-2 border-transparent cursor-pointer data-[state=active]:border-[var(--secondaryBase)] data-[state=active]:text-[var(--neutral700)]',
      className,
    )}
    {...props}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = TabsPrimitive.Content;

export { Tabs, TabsList, TabsTrigger, TabsContent };
