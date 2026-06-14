import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import cn from 'classnames';

import type { ComponentPropsWithoutRef, ElementRef } from 'react';

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<ElementRef<typeof HoverCardPrimitive.Content>, ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>>(
  ({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-max rounded-md border border-[var(--neutral250)] bg-white py-1.5 text-xs px-3 text-[var(--neutral550)] font-semibold shadow-md outline-none animate-in fade-in-0 zoom-in-95',
        className,
      )}
      {...props}
    />
  ),
);

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
