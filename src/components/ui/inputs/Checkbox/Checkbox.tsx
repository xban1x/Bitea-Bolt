import clsx from "clsx";
import React, { forwardRef, JSX } from "react";
import { Checkbox as AriaCheckbox, CheckboxProps as AriaCheckboxProps } from "react-aria-components";
import { Controller, FieldPath, FieldValues } from "react-hook-form";

import { ErrorMessage } from "@/components/ui/inputs/shared/ErrorMessage";
import {
  RadioOrCheckboxLabel,
  RadioOrCheckboxVariantProps,
  radioOrCheckboxIndicatorClass,
} from "@/components/ui/inputs/shared/radioOrCheckboxStyles";
import { ControlProps } from "@/types/form";

import { CheckboxCheckmark } from "./CheckboxCheckmark";

type CheckboxInnerProps = RadioOrCheckboxVariantProps &
  AriaCheckboxProps & {
    customRef?: React.ForwardedRef<HTMLLabelElement>;
    children?: string | React.ReactElement;
    error?: string;
  };

const CheckboxInner = ({ children, variant, customRef, error, ...props }: CheckboxInnerProps) => {
  return (
    <>
      <AriaCheckbox
        {...props}
        isInvalid={!!error}
        ref={customRef}
        className={clsx(radioOrCheckboxIndicatorClass, props.className)}
      >
        <CheckboxCheckmark variant={variant} />
        <RadioOrCheckboxLabel>{children}</RadioOrCheckboxLabel>
      </AriaCheckbox>
      <ErrorMessage error={error} isDisabled={props.isDisabled} />
    </>
  );
};

export type CheckboxProps = Omit<CheckboxInnerProps, "customRef">;

export const Checkbox = forwardRef(
  <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
    props: ControlProps<CheckboxProps, TFieldValues, TName>,
    ref?: React.ForwardedRef<HTMLLabelElement>,
  ) => {
    if ("formControl" in props && props.formControl) {
      return (
        <Controller
          control={props.formControl.control}
          name={props.formControl.name}
          render={({ field: { ref: controllerRef, disabled, ...field }, fieldState: { error } }) => (
            <CheckboxInner
              {...props}
              isSelected={field.value}
              onChange={field.onChange}
              customRef={controllerRef}
              isDisabled={disabled || props.isDisabled}
              error={props.error ?? error?.message}
            />
          )}
        />
      );
    }

    return <CheckboxInner {...props} customRef={ref} />;
  },
) as <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: ControlProps<CheckboxProps, TFieldValues, TName> & { ref?: React.ForwardedRef<HTMLLabelElement> },
) => JSX.Element;
