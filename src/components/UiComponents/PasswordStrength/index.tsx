import React from 'react';
import cn from 'classnames';
import Image from 'next/image';

import { passwordCriteria } from '@/constants';
import StrengthWrapper from './style';

interface PasswordStrengthProps {
  passwordStrength: number;
}

const getStrengthLabel = (strength: number): string => {
  if (strength <= 1) return 'Very weak';
  if (strength === 2) return 'Weak';
  if (strength === 3) return 'Moderate';
  return 'Strong';
};

const strengthLevels: { id: string; color: string }[] = [
  { id: 'very-weak', color: 'bg-red-500' },
  { id: 'weak', color: 'bg-yellow-500' },
  { id: 'moderate', color: 'bg-blue-500' },
  { id: 'strong', color: 'bg-green-500' },
];

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ passwordStrength }) => {
  return (
    <StrengthWrapper>
      <div className="mt-2 flex items-center space-x-2">
        <div className="flex gap-1 w-full justify-between">
          {strengthLevels.map((level, index) => (
            <div key={level.id} className={cn('h-2 w-1/4 rounded transition-all duration-300', index < passwordStrength ? level.color : 'bg-[#F5F7F9]')} />
          ))}
        </div>
        <span className="strength-text">{getStrengthLabel(passwordStrength)}</span>
      </div>
      <div className="mt-2 password-hint">
        <p className="mb-2 font-semibold">Strong password contains:</p>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {passwordCriteria.map((rule: { id: string; label: string }) => (
            <div key={rule.id} className="flex items-center space-x-2">
              <Image src="/icons/circle-check-outlined.svg" alt="check" loading="lazy" width={16} height={16} />
              <span>{rule.label}</span>
            </div>
          ))}
        </div>
      </div>
    </StrengthWrapper>
  );
};

export default PasswordStrength;
