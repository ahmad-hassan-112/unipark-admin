import React from 'react';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/UiComponents/Select';
import { SelectOption } from '@/types/selectTypes';
import RenderIf from '../Common/renderIf';

const RenderSelect = ({
  value,
  onChange,
  options,
  className,
  placeholder,
  multiSelect = false,
}: {
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  options: SelectOption[];
  className?: string;
  placeholder?: string;
  multiSelect?: boolean;
}) => {
  const handleValueChange = (newValue: string) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      const valueSet = new Set(currentValues);

      if (valueSet.has(newValue)) {
        valueSet.delete(newValue);
      } else {
        valueSet.add(newValue);
      }

      onChange(Array.from(valueSet));
    } else {
      onChange(newValue);
    }
  };

  const renderSelectedLabels = () => {
    if (!multiSelect || !Array.isArray(value) || value.length === 0) {
      return placeholder || 'Select...';
    }

    const selectedLabels = options.filter(opt => value.includes(opt.value)).map(opt => opt.label);

    return selectedLabels.join(', ');
  };

  return (
    <Select value={!multiSelect ? (value as string) : undefined} onValueChange={!multiSelect ? handleValueChange : undefined}>
      <SelectTrigger className={className}>
        <RenderIf isTrue={!multiSelect} fallback={<div className="truncate text-sm text-gray-800">{renderSelectedLabels()}</div>}>
          <SelectValue placeholder={placeholder} />
        </RenderIf>
      </SelectTrigger>

      <SelectContent>
        {options.map(option => (
          <SelectItem
            key={option.value}
            value={option.value}
            {...(multiSelect ? { isSelected: Array.isArray(value) && value.includes(option.value) } : {})}
            className={multiSelect && Array.isArray(value) && value.includes(option.value) ? 'bg-[#E2E8F0]' : ''}
            onMouseDown={e => {
              if (multiSelect) {
                e.preventDefault();
                handleValueChange(option.value);
              }
            }}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RenderSelect;
