import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import cn from 'classnames';
import { buttonVariants } from './button';

interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

type PaginationNavProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Pagination: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) => {
  return <nav role="navigation" aria-label="pagination" data-slot="pagination" className={cn('flex justify-center', className)} {...props} />;
};

const PaginationContent: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({ className, ...props }) => {
  return <ul data-slot="pagination-content" className={cn('flex flex-row items-center gap-1', className)} {...props} />;
};

const PaginationItem: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = ({ ...props }) => {
  return <li data-slot="pagination-item" {...props} />;
};

const PaginationLink: React.FC<PaginationLinkProps> = ({ className, isActive, size = 'icon', ...props }) => {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        isActive && '!bg-red-600',
        className,
      )}
      {...props}
    />
  );
};

const PaginationPrevious: React.FC<PaginationNavProps> = ({ className, ...props }) => {
  return (
    <PaginationLink aria-label="Go to previous page" size="default" className={cn('gap-1 px-2.5 sm:pl-2.5', className)} {...props}>
      <ChevronLeftIcon />
    </PaginationLink>
  );
};

const PaginationNext: React.FC<PaginationNavProps> = ({ className, ...props }) => {
  return (
    <PaginationLink aria-label="Go to next page" size="default" className={cn('gap-1 px-2.5 sm:pr-2.5', className)} {...props}>
      <ChevronRightIcon />
    </PaginationLink>
  );
};

const PaginationEllipsis: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => {
  return (
    <span aria-hidden data-slot="pagination-ellipsis" className={cn('flex size-9 items-center justify-center', className)} {...props}>
      <MoreHorizontalIcon className="size-4" />
    </span>
  );
};

export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis };
