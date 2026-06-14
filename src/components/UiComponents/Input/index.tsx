import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiMagnify, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
import { ErrorMessage } from 'formik';
import cn from 'classnames';
import Image from 'next/image';
import { InputProps } from '@/types';
import RenderIf from '@/components/Common/renderIf';

import InputWrapper from './style';

const Index: React.FC<InputProps> = ({
  className,
  type,
  disabled,
  icon,
  placeholder,
  name,
  label,
  onChange,
  isError,
  iconColor,
  value,
  onKeyDown,
  maxLength,
  inputMode,
  onBlur,
  symbolPosition,
  searchIconPosition,
}) => {
  const [ showPassword, setShowPassword ] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <>
      {label && <label>{label}</label>}
      <div className="relative grow">
        <InputWrapper
          className={cn(className, {
            'font-medium': type === 'search',
            'font-normal': type !== 'search',
          })}
          type={inputType}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          inputMode={inputMode}
          onBlur={onBlur}
          min={type === 'number' ? 0 : undefined}
          step={type === 'number' ? 'any' : undefined}
        />
        <RenderIf isTrue={type === 'search' || false}>
          <div className={`absolute top-2.5 ${searchIconPosition || 'right-4'}`}>
            <Icon path={icon || mdiMagnify} size={0.9} color={iconColor || 'rgb(134, 140, 152)'} />
          </div>
        </RenderIf>
        <RenderIf isTrue={name === 'price' || false}>
          <div className={`absolute top-3.5 left-4 text-sm text-[var(--neutral650)] ${symbolPosition}`}>£</div>
        </RenderIf>
        <RenderIf isTrue={isPassword || false}>
          <div className="absolute top-3.5 right-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            <Icon path={showPassword ? mdiEyeOutline : mdiEyeOffOutline} size={0.9} color="#111827" />
          </div>
        </RenderIf>
      </div>
      <RenderIf isTrue={isError || false}>
        <div className="flex items-center gap-2 mt-1.5">
          <Image src="/icons/alert-circle.svg" alt="alert" loading="lazy" width={18} height={18} />
          <ErrorMessage name={name || ''} component="div" className="error-message" />
        </div>
      </RenderIf>
    </>
  );
};

export default Index;
