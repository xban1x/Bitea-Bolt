import clsx from "clsx";
import { useEffect, useState } from "react";
import { Controller, FieldPath, FieldValues } from "react-hook-form";

import { DatePicker } from "@/components/ui/inputs/DateTime/DatePicker/DatePicker";
import { TimePicker, TimePickerProps } from "@/components/ui/inputs/DateTime/TimePicker/TimePicker";
import { textInputSize } from "@/components/ui/inputs/TextInput/TextInputWrapper";
import { ErrorMessage } from "@/components/ui/inputs/shared/ErrorMessage";
import { ControlProps, FormControl, FormControlProps } from "@/types/form";

type SplitDateTimePickerProps = Omit<TimePickerProps, "date"> & {
  separator?: string;
  className?: string;
};

const SplitDateTimePickerInner = ({ className, separator, error, hideLabel, ...props }: SplitDateTimePickerProps) => {
  const [date, setDate] = useState(props.value ?? null);
  const [time, setTime] = useState(props.value ?? null);
  useEffect(() => {
    if (date === undefined || time === undefined) {
      return;
    }
    props.onChange?.(date && time ? time : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time]);

  useEffect(() => {
    setDate(props.value ?? null);
    setTime(props.value ?? null);
  }, [props.value]);

  return (
    <div className={clsx("flex-1", className)}>
      <div className={clsx("flex items-center", separator ? "gap-1-5" : "gap-2")}>
        <DatePicker
          label={props.label}
          disableDropdown={props.disableDropdown}
          variant={props.variant}
          value={date}
          onChange={setDate}
          isDisabled={props.isDisabled}
          hideLabel={hideLabel}
        />

        {separator && <div className={textInputSize({ variant: props.variant })}>{separator}</div>}

        <div className="flex w-fit min-w-24 flex-shrink-0 items-center">
          <TimePicker {...props} value={time} onChange={setTime} date={date} hideLabel hourCycle={24} />
        </div>
      </div>
      <ErrorMessage error={error} isDisabled={props.isDisabled} />
    </div>
  );
};

const SplitDateTimePickerInnerFormControl = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  formControl,
  ...props
}: FormControlProps<SplitDateTimePickerProps, TFieldValues, TName> & {
  formControl: FormControl<TFieldValues, TName>;
}) => {
  return (
    <Controller
      control={formControl.control}
      name={formControl.name}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <SplitDateTimePickerInner
          {...props}
          {...field}
          isDisabled={field.disabled || props.isDisabled}
          error={props.error ?? error?.message}
        />
      )}
    />
  );
};

export const SplitDateTimePicker = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: ControlProps<SplitDateTimePickerProps, TFieldValues, TName>,
) => {
  if ("formControl" in props && props.formControl) {
    return <SplitDateTimePickerInnerFormControl {...props} />;
  }

  return <SplitDateTimePickerInner {...props} />;
};
