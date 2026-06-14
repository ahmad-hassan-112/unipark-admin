'use client';

import React, { ReactNode, forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cn from 'classnames';

interface BaseProps {
  className?: string;
  children?: ReactNode;
}

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
};

const DialogTrigger = DialogPrimitive.Trigger;

const DialogOverlay = forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn('fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all', className)} {...props} />
));

DialogOverlay.displayName = 'DialogOverlay';

const DialogContent = forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 transition-all" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn('fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-full max-w-xs xxs:max-w-sm sm:max-w-xl shadow-lg duration-200 rounded-xl overflow-auto', className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

DialogContent.displayName = 'DialogContent';

const DialogHeader = ({ className, ...props }: BaseProps) => <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />;

DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: BaseProps) => <div className={cn('flex justify-end space-x-2 border-t border-[var(--neutral250)] p-4', className)} {...props} />;

DialogFooter.displayName = 'DialogFooter';

const DialogTitle = forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn('!text-lg font-semibold mb-4 text-[var(--neutral850)] !tracking-normal leading-6', className)} {...props} />
));

DialogTitle.displayName = 'DialogTitle';

const DialogDescription = forwardRef<React.ElementRef<typeof DialogPrimitive.Description>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));

DialogDescription.displayName = 'DialogDescription';

export { Dialog, DialogTrigger, DialogOverlay, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
