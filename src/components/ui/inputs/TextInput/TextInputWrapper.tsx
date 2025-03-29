import { VariantProps, cva, cx } from "class-variance-authority";
import { ClassProp } from "class-variance-authority/types";
import clsx from "clsx";
import { TextField, FieldError } from "react-aria-components";
import { ControllerRenderProps } from "react-hook-form";

import { uiOutlineClass } from "@/components/ui/global/outline";
import { ErrorMessage } from "@/components/ui/inputs/shared/ErrorMessage";
import { InputHeader, InputHeaderProps } from "@/components/ui/inputs/shared/InputHeader";

export const textInputBase = cva(
  [
    "w-full",
    "rounded-input-rounding",
    "bg-elevation-background",
    "px-input-side-spacing",
    "font-primary",
    "font-labels-default",
    "placeholder:text-text-default-tertiary",
    "text-text-default-primary",
    uiOutlineClass,
    "invalid:border invalid:border-info-error-outline",
    "focus:border focus:border-interactive-primary-idle",
    "focus-within:border focus-within:border-interactive-primary-idle",
    "focus-visible:outline-interactive-primary-focus",
    "hover:border hover:border-interactive-primary-hover",
    "disabled:text-interactive-text-disabled",
  ],
  {
    variants: {
      variant: {
        outlined: ["border border-elevation-outline-2 disabled:hover:border-elevation-outline-2"],
        filled: [
          "border border-elevation-surface-1 disabled:hover:border-elevation-surface-1",
          "bg-elevation-surface-1 focus:bg-elevation-background",
        ],
        inline: ["border border-transparent bg-transparent disabled:hover:border-transparent"],
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  },
);
type TextInputBaseProps = VariantProps<typeof textInputBase>;

export const textInputSize = cva("", {
  variants: {
    variant: {
      outlined: "py-height-s text-input-label",
      filled: "py-height-s text-input-label",
      inline: "text-input-label",
    },
  },
  defaultVariants: {
    variant: "outlined",
  },
});
type TextInputSizeProps = VariantProps<typeof textInputSize>;

export interface TextInputVariantProps extends TextInputBaseProps, TextInputSizeProps {}
export const textInput = (props: TextInputVariantProps & ClassProp) => cx(textInputBase(props), textInputSize(props));

export type TextInputWrapperProps = InputHeaderProps & {
  error?: string;
  children: React.ReactNode;
  className?: string;
  field?: Omit<ControllerRenderProps, "ref">;
  hideLabel?: boolean;
};

export const TextInputWrapper = ({
  label,
  tooltipText,
  helperText,
  required,
  error,
  className,
  children,
  hideLabels,
  hideLabel,
  isDisabled,
  ...props
}: TextInputWrapperProps) => {
  return (
    <div className={clsx("w-full", className)}>
      <TextField {...props.field} isInvalid={!!error} isDisabled={isDisabled}>
        <InputHeader
          label={label}
          tooltipText={tooltipText}
          helperText={helperText}
          required={required}
          hideLabels={hideLabels || hideLabel}
          isDisabled={isDisabled}
        />
        {children}
        <ErrorMessage
          error={<FieldError>{error}</FieldError>}
          isDisabled={isDisabled}
          className={clsx(hideLabels && "hidden")}
        />
      </TextField>
    </div>
  );
};
