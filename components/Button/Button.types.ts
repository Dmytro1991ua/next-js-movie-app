export type ButtonType = "submit" | "button" | "reset";
export type ButtonVariant = "primary" | "secondary" | "danger" | "tertiary";
export type ButtonSize = "small" | "normal" | "large";
export type RoundedButton = "sm" | "md" | "lg";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children?: React.ReactNode;
  type?: ButtonType;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: RoundedButton;
  disabled?: boolean;
  fullWidth?: boolean;
}
