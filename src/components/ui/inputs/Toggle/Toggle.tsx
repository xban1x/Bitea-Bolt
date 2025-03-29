import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef, JSX } from "react";
import { Switch as AriaSwitch, SwitchProps as AriaSwitchProps } from "react-aria-components";
import { Controller, FieldPath, FieldValues } from "react-hook-form";

import { ErrorMessage } from "@/components/ui/inputs/shared/ErrorMessage";
import { RadioOrCheckboxLabel } from "@/components/ui/inputs/shared/radioOrCheckboxStyles";
import { ControlProps } from "@/types/form";

export const toggle = cva(
  "h-6 w-10 rounded-full before:m-0-5 before:block before:aspect-square before:h-5 before:rounded-full before:transition-transform before:content-[''] group-selected:before:translate-x-4",
  {
    variants: {
      variant: {
        default: [
          "bg-interactive-icon-idle",
          "group-disabled:bg-interactive-icon-disabled",
          "group-hover:bg-interactive-icon-hover",
          "group-pressed:bg-interactive-icon-pressed",
          "group-selected:bg-interactive-icon-toggled",
          "group-selected:group-hover:bg-interactive-icon-hover",
          "group-selected:group-pressed:bg-interactive-icon-pressed",
          "before:bg-interactive-icon-on",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ToggleVariantProps = VariantProps<typeof toggle>;

type ToggleInnerProps = ToggleVariantProps &
  AriaSwitchProps & {
    customRef?: React.ForwardedRef<HTMLLabelElement>;
    children?: string;
    error?: string;
  };

const ToggleInner = ({ children, variant, customRef, error, ...props }: ToggleInnerProps) => {
  return (
    <>
      <AriaSwitch
        {...props}
        ref={customRef}
        className={clsx("group flex items-center gap-2", !props.isDisabled && "cursor-pointer", props.className)}
      >
        <div className={toggle({ variant })} />
        <RadioOrCheckboxLabel>{children}</RadioOrCheckboxLabel>
      </AriaSwitch>
      <ErrorMessage error={error} isDisabled={props.isDisabled} />
    </>
  );
};

export type ToggleProps = Omit<ToggleInnerProps, "customRef">;

export const Toggle = forwardRef(
  <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
    props: ControlProps<ToggleProps, TFieldValues, TName>,
    ref?: React.ForwardedRef<HTMLLabelElement>,
  ) => {
    if ("formControl" in props && props.formControl) {
      return (
        <Controller
          control={props.formControl.control}
          name={props.formControl.name}
          render={({ field: { ref: controllerRef, disabled, ...field }, fieldState: { error } }) => (
            <ToggleInner
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

    return <ToggleInner {...props} customRef={ref} />;
  },
) as <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: ControlProps<ToggleProps, TFieldValues, TName> & { ref?: React.ForwardedRef<HTMLLabelElement> },
) => JSX.Element;
