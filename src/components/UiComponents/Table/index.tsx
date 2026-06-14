import * as React from 'react';
import { JSX } from 'react';
import cn from 'classnames';

type ElementProps<T extends keyof JSX.IntrinsicElements> = React.ComponentPropsWithoutRef<T>;

function Table ({ className, ...props }: ElementProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table data-slot="table" className={cn('w-full caption-bottom border-collapse', className)} {...props} />
    </div>
  );
}

function TableHeader ({ className, ...props }: ElementProps<'thead'>) {
  return <thead data-slot="table-header" className={cn('', className)} {...props} />;
}

function TableBody ({ className, ...props }: ElementProps<'tbody'>) {
  return <tbody data-slot="table-body" className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

function TableFooter ({ className, ...props }: ElementProps<'tfoot'>) {
  return <tfoot data-slot="table-footer" className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)} {...props} />;
}

function TableRow ({ className, ...props }: ElementProps<'tr'>) {
  return <tr data-slot="table-row" className={cn('hover:bg-muted/50 border-b border-[var(--neutral250)] data-[state=selected]:bg-muted transition-colors', className)} {...props} />;
}

function TableHead ({ className, ...props }: ElementProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'bg-[var(--neutral50)] text-[var(--neutral550)] text-sm h-12.5 px-6 py-4 text-left align-middle font-semibold whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

function TableCell ({ className, ...props }: ElementProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn('py-5 px-6 text-base text-[var(--neutral850)] align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)}
      {...props}
    />
  );
}

function TableCaption ({ className, ...props }: ElementProps<'caption'>) {
  return <caption data-slot="table-caption" className={cn('text-muted-foreground mt-4 text-sm', className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
