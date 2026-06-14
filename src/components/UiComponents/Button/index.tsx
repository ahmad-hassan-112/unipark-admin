'use client';

import React from 'react';
import Icon from '@mdi/react';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';

import Spinner from '@/components/UiComponents/Spinner';
import ButtonWrapper from './style';
import RenderIf from '@/components/Common/renderIf';

interface ButtonProps {
  text?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  arrowRight?: boolean;
  arrowLeft?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  iconRight?: string;
  iconLeft?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, className, onClick, arrowRight, arrowLeft, type = 'button', disabled = false, iconRight, iconLeft, isLoading = false }) => {
  return (
    <ButtonWrapper className={className} onClick={onClick} type={type} disabled={disabled}>
      <RenderIf isTrue={isLoading}>
        <Spinner className="text-white" size="sm" />
      </RenderIf>
      <RenderIf isTrue={!isLoading}>
        <>
          <RenderIf isTrue={arrowLeft || false}>
            <div>
              <Icon path={iconLeft || mdiChevronLeft} size={0.7} />
            </div>
          </RenderIf>

          {text}
          <RenderIf isTrue={arrowRight || false}>
            <div>
              <Icon path={iconRight || mdiChevronRight} size={0.7} />
            </div>
          </RenderIf>
        </>
      </RenderIf>
    </ButtonWrapper>
  );
};

export default Button;
