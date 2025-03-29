import clsx from "clsx";
import React, { forwardRef, JSX } from "react";
import { Input as AriaInput, InputProps as AriaInputProps } from "react-aria-components";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import useMeasure from "react-use-measure";

import { InlineIconButton, InlineIconButtonProps } from "@/components/ui/buttons/InlineIconButton/InlineIconButton";
import { Loader } from "@/components/ui/status/Loader/Loader";
import { Typography } from "@/components/ui/text/Typography/Typography";
import { ControlProps } from "@/types/form";
import { TailwindUtils } from "@/util/tailwind.utils";

import { TextInputVariantProps, TextInputWrapper, TextInputWrapperProps, textInput } from "./TextInputWrapper";

type TextInputInnerProps = {
  customRef?: React.ForwardedRef<HTMLInputElement>;
  unit?: string;
  isLoading?: boolean;
  action?: {
    icon: InlineIconButtonProps["icon"];
    onClick: () => void;
    altText: string;
    className?: string;
  };
  leadingIcon?: React.FC<React.SVGProps<SVGSVGElement>> | React.ReactElement;
  trailingIcon?: React.FC<React.SVGProps<SVGSVGElement>> | React.ReactElement;
  inputClassName?: string;
} & TextInputVariantProps &
  Omit<TextInputWrapperProps, "hideLabels" | "children"> &
  AriaInputProps;

const TextInputInner = ({
  customRef,
  variant,
  unit,
  isLoading,
  action,
  className,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  error,
  field,
  label,
  tooltipText,
  helperText,
  required,
  rightContent,
  isDisabled,
  inputClassName,
  hideLabel,
  ...inputProps
}: TextInputInnerProps) => {
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

  const [leadingContentRef, { width: leadingWidth }] = useMeasure();
  const [trailingContentRef, { width: trailingWidth }] = useMeasure();

  const isLeadingIconElement = LeadingIcon && typeof LeadingIcon !== "function";
  const isTrailingIconElement = TrailingIcon && typeof TrailingIcon !== "function";

  const sideSpacing =
    (TailwindUtils.resolvedConfig.theme?.spacing as Record<string, string>)["input-side-spacing"] || "0.75rem";
  const gap = "0.5rem";

  return (
    <TextInputWrapper {...wrapperProps}>
      <div className="relative">
        <AriaInput
          {...inputProps}
          ref={customRef}
          className={textInput({
            variant,
            className: inputClassName,
          })}
          style={{
            paddingLeft: `calc(${sideSpacing} + ${leadingWidth}px + ${leadingWidth > 0 ? gap : "0px"})`,
            paddingRight: `calc(${sideSpacing} + ${trailingWidth}px + ${trailingWidth > 0 ? gap : "0px"})`,
          }}
        />

        {LeadingIcon && (
          <div
            ref={leadingContentRef}
            className={clsx(
              "absolute left-input-side-spacing top-1/2 -translate-y-1/2",
              !isLeadingIconElement && "pointer-events-none",
            )}
          >
            {isLeadingIconElement ? LeadingIcon : <LeadingIcon className="size-6 text-interactive-icon-idle" />}
          </div>
        )}

        <div
          ref={trailingContentRef}
          className={clsx(
            "absolute right-input-side-spacing top-1/2 flex -translate-y-1/2 items-center gap-2",
            !isTrailingIconElement && !action && "pointer-events-none",
          )}
        >
          {unit && (
            <Typography as="span" size="label-2" variant="prominent-1" className="text-text-default-tertiary">
              {unit}
            </Typography>
          )}

          {isLoading && (
            <div className="inline-flex">
              <Loader />
            </div>
          )}

          {!isLoading && action && (
            <InlineIconButton
              icon={action.icon}
              onPress={action.onClick}
              label={action.altText}
              className={action.className}
            />
          )}

          {!isLoading &&
            !action &&
            TrailingIcon &&
            (isTrailingIconElement ? TrailingIcon : <TrailingIcon className="size-6 text-interactive-icon-idle" />)}
        </div>
      </div>
    </TextInputWrapper>
  );
};

export type TextInputProps = Omit<TextInputInnerProps, "customRef" | "field">;

export const TextInput = forwardRef(
  <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
    props: ControlProps<TextInputProps, TFieldValues, TName>,
    ref?: React.ForwardedRef<HTMLInputElement>,
  ) => {
    if ("formControl" in props && props.formControl) {
      const { formControl, ...innerProps } = props;

      return (
        <Controller
          control={formControl.control}
          name={formControl.name}
          render={({ field: { ref: controllerRef, disabled, ...field }, fieldState: { error } }) => (
            <TextInputInner
              {...innerProps}
              field={{
                ...field,
                value: field.value ?? "",
                onChange: (value) => {
                  if (props.type === "number" && !Number.isNaN(value)) {
                    field.onChange(value === "" ? null : Number(value));
                  } else {
                    field.onChange(value || null);
                  }
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

    return <TextInputInner {...props} customRef={ref} />;
  },
) as <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: ControlProps<TextInputProps, TFieldValues, TName> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => JSX.Element;
