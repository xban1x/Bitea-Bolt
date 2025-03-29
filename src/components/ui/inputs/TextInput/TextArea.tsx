import { forwardRef, JSX } from "react";
import { TextArea as AriaTextArea, TextAreaProps as AriaTextAreaProps } from "react-aria-components";
import { Controller, FieldPath, FieldValues } from "react-hook-form";

import { ControlProps } from "@/types/form";

import { TextInputVariantProps, TextInputWrapper, TextInputWrapperProps, textInput } from "./TextInputWrapper";

type TextAreaInnerProps = {
  customRef?: React.ForwardedRef<HTMLTextAreaElement>;
} & TextInputVariantProps &
  Omit<TextInputWrapperProps, "hideLabels" | "children"> &
  AriaTextAreaProps;

const TextAreaInner = ({
  customRef,
  variant,
  className,
  error,
  field,
  label,
  tooltipText,
  helperText,
  required,
  rightContent,
  isDisabled,
  hideLabel,
  ...textAreaProps
}: TextAreaInnerProps) => {
  const wrapperProps: Omit<TextInputWrapperProps, "children"> = {
    className,
    error,
    field,
    label,
    tooltipText,
    helperText,
    required,
    rightContent,
    hideLabels: variant === "inline",
    hideLabel,
    isDisabled,
  };

  return (
    <TextInputWrapper {...wrapperProps}>
      <AriaTextArea {...textAreaProps} className={textInput({ variant })} ref={customRef} />
    </TextInputWrapper>
  );
};

export type TextAreaProps = Omit<TextAreaInnerProps, "customRef" | "field">;

export const TextArea = forwardRef(
  <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
    props: ControlProps<TextAreaProps, TFieldValues, TName>,
    ref?: React.ForwardedRef<HTMLTextAreaElement>,
  ) => {
    if ("formControl" in props && props.formControl) {
      const { formControl, ...innerProps } = props;

      return (
        <Controller
          control={formControl.control}
          name={formControl.name}
          render={({ field: { ref: controllerRef, disabled, ...field }, fieldState: { error } }) => (
            <TextAreaInner
              {...innerProps}
              field={{
                ...field,
                value: field.value ?? "",
                onChange: (value) => {
                  field.onChange(value || null);
                },
              }}
              isDisabled={disabled || props.isDisabled}
              customRef={controllerRef}
              error={props.error ?? error?.message}
            />
          )}
        />
      );
    }

    return <TextAreaInner {...props} customRef={ref} />;
  },
) as <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: ControlProps<TextAreaProps, TFieldValues, TName> & { ref?: React.ForwardedRef<HTMLTextAreaElement> },
) => JSX.Element;
