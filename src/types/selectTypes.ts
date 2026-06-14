export type SelectOption = {
  value: string;
  label: string;
};

export type FormSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  className?: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  useFormik?: boolean;
  isError?: boolean;
  multiSelect?: boolean;
};
