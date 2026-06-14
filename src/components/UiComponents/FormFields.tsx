import React from 'react';
import { Field, FieldProps } from 'formik';
import Input from './Input';
import RequiredLabel from '@/components/Common/requiredLabel';
import PasswordStrength from './PasswordStrength';
import RenderIf from '../Common/renderIf';
import { PRICE_REGEX } from '@/constants';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  isPassword?: boolean;
  showPasswordStrength?: boolean;
  passwordStrength?: number;
  onPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  isPassword = false,
  showPasswordStrength = false,
  passwordStrength = 0,
  onPasswordChange,
  className,
  required = true,
  disabled = false,
}) => {
  return (
    <div>
      <RenderIf isTrue={required || false}>
        <RequiredLabel name={label} />
      </RenderIf>
      <RenderIf isTrue={!required || false}>
        <label>{label}</label>
      </RenderIf>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            isError={Boolean(form.errors[name] && form.touched[name])}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (type === 'number') {
                const val = e.target.value;

                if (val === '' || PRICE_REGEX.test(val)) {
                  field.onChange(e);
                }
              } else {
                field.onChange(e);
              }

              if (onPasswordChange) {
                onPasswordChange(e);
              }
            }}
            className={className}
            disabled={disabled}
            onKeyDown={e => {
              if (type === 'number' && [ '-', 'e' ].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        )}
      </Field>
      {showPasswordStrength && isPassword && <PasswordStrength passwordStrength={passwordStrength} />}
    </div>
  );
};

export default FormField;
