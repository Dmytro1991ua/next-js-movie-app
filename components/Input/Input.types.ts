type RoundedInput = "sm" | "md" | "lg";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  name?: string;
  id?: string;
  type?: string;
  label?: string;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  rounded?: RoundedInput;
  placeholder?: string;
  className?: string;
  isBaseInput?: boolean;
  fullWidth?: boolean;
}
