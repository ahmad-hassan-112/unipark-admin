import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';

export interface FilterConfig {
  label: string;
  key: string;
  options: Array<{ value: string; label: string }>;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageLimit?: string;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: string) => void;
  paginationName?: string;
}

export interface InputProps {
  className?: string;
  type: string;
  disabled?: boolean;
  icon?: string;
  placeholder?: string;
  name?: string;
  label?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  iconColor?: string;
  value?: string | number;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  symbolPosition?: string;
  searchIconPosition?: string;
}

export interface MapFieldsProps {
  csvData: {
    headers: string[];
    rows: string[][];
  } | null;
  selectedFields: Record<string, string>;
  setSelectedFields: (fields: Record<string, string>) => void;
}
