import clsx from "clsx";
import React, { forwardRef, JSX } from "react";
import {
  Label as AriaLabel,
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  RadioGroupProps as AriaRadioGroupProps,
} from "react-aria-components";
import { Controller, FieldPath, FieldValues } from "react-hook-form";

import { ErrorMessage } from "@/components/ui/inputs/shared/ErrorMessage";
import {
  RadioOrCheckboxLabel,
  RadioOrCheckboxVariantProps,
  radioOrCheckbox,
  radioOrCheckboxIndicatorClass,
} from "@/components/ui/inputs/shared/radioOrCheckboxStyles";
import { Typography } from "@/components/ui/text/Typography/Typography";
import { ControlProps } from "@/types/form";

type RadioGroupInnerProps = RadioOrCheckboxVariantProps &
  AriaRadioGroupProps & {
    customRef?: React.ForwardedRef<HTMLDivElement>;
    label: string;
    hideLabel?: boolean;
    options: {
      label: string | React.ReactElement;
      value: string;
    }[];
    error?: string;
  };

const RadioGroupInner = ({ customRef, variant, label, hideLabel, options, error, ...props }: RadioGroupInnerProps) => {
  return (
    <AriaRadioGroup {...props} ref={customRef} isInvalid={!!error}>
      <AriaLabel className={clsx(hideLabel ? "sr-only" : "mb-2-5")}>
        <Typography
          size="label-2"
          variant="prominent-1"
          className={clsx(props.isDisabled ? "text-interactive-text-disabled" : "text-text-default-primary")}
        >
          {label}
        </Typography>
      </AriaLabel>
      <div className="flex flex-col">
        {options.map((option) => (
          <AriaRadio value={option.value} className={radioOrCheckboxIndicatorClass} key={option.value}>
            <div
              className={radioOrCheckbox({
                variant,
                className: "relative h-3-5 w-3-5 rounded-full p-1-5",
              })}
            >
              <div className="absolute hidden size-1 rounded-full bg-interactive-icon-on group-selected:block" />
            </div>

            <RadioOrCheckboxLabel>{option.label}</RadioOrCheckboxLabel>
          </AriaRadio>
        ))}
      </div>
      <ErrorMessage error={error} isDisabled={props.isDisabled} />
    </AriaRadioGroup>
  );
};

export type RadioGroupProps = Omit<RadioGroupInnerProps, "customRef">;

export const RadioGroup = forwardRef(
  <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
    props: ControlProps<RadioGroupProps, TFieldValues, TName>,
    ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    if ("formControl" in props && props.formControl) {
      return (
        <Controller
          control={props.formControl.control}
          name={props.formControl.name}
          render={({ field: { ref: controllerRef, disabled, ...field }, fieldState: { error } }) => (
            <RadioGroupInner
              {...props}
              value={field.value}
              onChange={field.onChange}
              isDisabled={disabled || props.isDisabled}
              customRef={controllerRef}
              error={props.error ?? error?.message}
            />
          )}
        />
      );
    }

    return <RadioGroupInner {...props} customRef={ref} />;
  },
) as <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: ControlProps<RadioGroupProps, TFieldValues, TName> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => JSX.Element;
