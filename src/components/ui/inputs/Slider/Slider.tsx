import clsx from "clsx";
import { forwardRef, JSX } from "react";
import {
  Slider as AriaSlider,
  SliderProps as AriaSliderProps,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
} from "react-aria-components";
import { Controller, FieldPath, FieldValues } from "react-hook-form";

import { uiOutlineClass } from "@/components/ui/global/outline";
import { ErrorMessage } from "@/components/ui/inputs/shared/ErrorMessage";
import { InputHeader } from "@/components/ui/inputs/shared/InputHeader";
import { Typography } from "@/components/ui/text/Typography/Typography";
import { ControlProps } from "@/types/form";

type SliderInnerProps<T extends number | number[]> = AriaSliderProps<T> & {
  label: string;
  hideLabel?: boolean;
  unit?: string;
  customRef?: React.ForwardedRef<HTMLDivElement>;
  error?: string;
};

const SliderInner = <T extends number | number[]>({
  label,
  hideLabel,
  unit,
  minValue = 0,
  maxValue = 100,
  customRef,
  error,
  ...props
}: SliderInnerProps<T>) => {
  return (
    <AriaSlider<T> {...props} ref={customRef} minValue={minValue} maxValue={maxValue}>
      <InputHeader label={label} isDisabled={props.isDisabled} hideLabels={hideLabel} />
      <div className="flex items-center justify-between">
        <Typography className="px-2 py-height-s text-text-default-tertiary" size="label-2">
          {minValue}
          {unit}
        </Typography>

        <AriaSliderTrack className="relative mx-2 h-6 w-full before:absolute before:top-1/2 before:block before:h-1 before:w-full before:-translate-y-1/2 before:bg-elevation-outline-1 before:content-['']">
          {({ state }) => (
            <>
              <AriaSliderThumb
                className={clsx(
                  "absolute top-1/2 size-4 rounded-full bg-interactive-primary-idle",
                  "hover:bg-interactive-primary-hover focus-visible:outline-interactive-primary-focus dragging:bg-interactive-primary-pressed disabled:bg-interactive-primary-disabled",
                  uiOutlineClass,
                )}
              />

              {/* fill */}
              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-interactive-primary-idle"
                style={{
                  width: state ? `${state.getThumbPercent(0) * 100}%` : 0,
                }}
              />
            </>
          )}
        </AriaSliderTrack>

        <Typography className="px-2 py-height-s text-text-default-tertiary" size="label-2">
          {maxValue}
          {unit}
        </Typography>
      </div>
      <ErrorMessage error={error} isDisabled={props.isDisabled} />
    </AriaSlider>
  );
};

export type SliderProps<T extends number | number[]> = Omit<SliderInnerProps<T>, "customRef">;

export const Slider = forwardRef(
  <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>, T extends number | number[]>(
    props: ControlProps<SliderProps<T>, TFieldValues, TName>,
    ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    if ("formControl" in props && props.formControl) {
      return (
        <Controller
          control={props.formControl.control}
          name={props.formControl.name}
          render={({ field: { ref: controllerRef, disabled, ...field }, fieldState: { error } }) => (
            <SliderInner
              {...props}
              value={field.value}
              onChange={field.onChange}
              customRef={controllerRef}
              isDisabled={disabled || props.isDisabled}
              error={props.error ?? error?.message}
            />
          )}
        />
      );
    }

    return <SliderInner {...props} customRef={ref} />;
  },
) as <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>, T extends number | number[]>(
  props: ControlProps<SliderProps<T>, TFieldValues, TName> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => JSX.Element;
