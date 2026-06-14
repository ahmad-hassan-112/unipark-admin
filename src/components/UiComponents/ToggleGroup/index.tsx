'use client';

import React from 'react';
import cn from 'classnames';
import { type VariantProps } from 'class-variance-authority';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

import { toggleVariants } from '../Toggle';

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default',
});

const ToggleGroup = React.forwardRef<React.ElementRef<typeof ToggleGroupPrimitive.Root>, React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>>(
  ({ className, variant, size, children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root ref={ref} className={cn('flex items-center justify-center max-w-max gap-1 bg-[var(--neutral50)] rounded-lg p-1', className)} {...props}>
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  ),
);

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<React.ElementRef<typeof ToggleGroupPrimitive.Item>, React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>>(
  ({ className, children, variant, size, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);

    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
          'w-[104px] font-medium px-2.5 py-2 data-[state=on]:bg-[var(--secondaryBase)] data-[state=on]:text-white text-[var(--neutral500_2)] rounded-lg data-[state=on]:shadow-[0px_1px_2px_#00000026] cursor-pointer',
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    );
  },
);

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
