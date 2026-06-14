import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import cn from 'classnames';

import { StyledContent, StyledTrigger } from './style';

type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
  size?: 'default' | 'sm' | 'lg';
};

type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
  position?: 'popper' | 'item-aligned';
};

function Select (props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup (props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue (props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger ({ className, size = 'default', children, ...props }: SelectTriggerProps) {
  return (
    <StyledTrigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        'flex w-full text-sm items-center data-[placeholder]:!text-[#94A3B8] justify-between cursor-pointer rounded-[10px] border bg-transparent px-4 py-3.5 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-5" />
      </SelectPrimitive.Icon>
    </StyledTrigger>
  );
}

function SelectContent ({ className, children, position = 'popper', ...props }: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <StyledContent
        data-slot="select-content"
        className={cn(
          'bg-white z-[9999] max-h-[320px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative min-w-[8rem] origin-[--radix-select-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-[10px]',
          position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className={cn('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1')}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </StyledContent>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel (props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label data-slot="select-label" className={cn('text-muted-foreground px-2 py-1.5 text-xs', props.className)} {...props} />;
}

function SelectItem ({ className, children, isSelected, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & { isSelected?: boolean }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        '[&_svg:not([class*=\'text-\'])]:text-muted-foreground cursor-pointer text-sm relative flex w-full items-center gap-2 py-1.5 pr-8 pl-4 outline-hidden select-none hover:bg-[#E2E8F0] hover:text-[#186AFF] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        {typeof isSelected === 'undefined' ? (
          <SelectPrimitive.ItemIndicator>
            <CheckIcon className="size-4" />
          </SelectPrimitive.ItemIndicator>
        ) : (
          isSelected && <CheckIcon className="size-4" />
        )}
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator (props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator data-slot="select-separator" className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', props.className)} {...props} />;
}

function SelectScrollUpButton (props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton data-slot="select-scroll-up-button" className={cn('flex cursor-default items-center justify-center py-1', props.className)} {...props}>
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton (props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton data-slot="select-scroll-down-button" className={cn('flex cursor-default items-center justify-center py-1', props.className)} {...props}>
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue };
