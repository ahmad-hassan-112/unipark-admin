import React from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';
import Image from 'next/image';

import RequiredLabel from '@/components/Common/requiredLabel';
import RenderIf from '../Common/renderIf';
import RenderSelect from './renderSelect';
import { FormSelectProps } from '@/types/selectTypes';

const FormSelect: React.FC<FormSelectProps> = ({ name, label, placeholder = 'Select an option', options, className, value, onChange, useFormik = true, isError, multiSelect = false }) => {
  const showError = isError ?? false;

  return (
    <div>
      {label && <RequiredLabel name={label} />}
      <RenderIf
        isTrue={useFormik}
        fallback={<RenderSelect value={value} onChange={onChange as (val: string | string[]) => void} options={options} className={className} placeholder={placeholder} multiSelect={multiSelect} />}
      >
        <Field name={name}>
          {({ field, form }: FieldProps) => (
            <RenderSelect
              value={value || field.value}
              onChange={(val: string | string[]) => {
                form.setFieldValue(name, val);
                onChange?.(val);
              }}
              options={options}
              className={className}
              placeholder={placeholder}
              multiSelect={multiSelect}
            />
          )}
        </Field>
      </RenderIf>

      <RenderIf isTrue={showError}>
        <div className="flex items-center gap-2 mt-1.5">
          <Image src="/icons/alert-circle.svg" alt="alert" loading="lazy" width={18} height={18} />
          <ErrorMessage name={name} component="div" className="error-message" />
        </div>
      </RenderIf>
    </div>
  );
};

export default FormSelect;
