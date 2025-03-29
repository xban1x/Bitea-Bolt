import { CalendarDate, createCalendar, getLocalTimeZone, toCalendarDate, today } from "@internationalized/date";
import clsx from "clsx";
import { DateTime } from "luxon";
import { useRef } from "react";
import { useDatePicker, useLocale } from "react-aria";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import { DatePickerStateOptions, useCalendarState, useDatePickerState } from "react-stately";

import { Calendar } from "@/components/ui/inputs/DateTime/shared/Calendar";
import { DatePickerFooter } from "@/components/ui/inputs/DateTime/shared/DatePickerFooter";
import { DatePickerInput } from "@/components/ui/inputs/DateTime/shared/DatePickerInput";
import { DateTimeDialog } from "@/components/ui/inputs/DateTime/shared/DateTimeDialog";
import { DateTimeUtils } from "@/components/ui/inputs/DateTime/shared/date-time.utils";
import { TextInputVariantProps } from "@/components/ui/inputs/TextInput/TextInputWrapper";
import { ErrorMessage } from "@/components/ui/inputs/shared/ErrorMessage";
import { ControlProps } from "@/types/form";

// Workaround for bug in React Aria (https://github.com/adobe/react-spectrum/issues/3256#issuecomment-1825942096)
const PLACEHOLDER_VALUE = new CalendarDate(2024, 1, 1);

type DatePickerInnerProps = Omit<DatePickerStateOptions<CalendarDate>, "granularity" | "shouldCloseOnSelect"> & {
  label: string;
  hideLabel?: boolean;
  disableDropdown?: boolean;
  error?: string;
  className?: string;
} & TextInputVariantProps;

const DatePickerInner = ({
  label,
  hideLabel,
  onChange,
  value,
  disableDropdown,
  error,
  variant,
  className,
  ...props
}: DatePickerInnerProps) => {
  const dialogState = useDatePickerState({
    ...props,
    defaultValue: value || props.defaultValue,
    shouldCloseOnSelect: false,
  });
  const state = useDatePickerState({
    ...props,
    value,
    onChange: (val) => {
      onChange?.(val);
      dialogState.setValue(val);
      calendarState.setFocusedDate(val || today(getLocalTimeZone()));
    },
    shouldCloseOnSelect: false,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { groupProps, labelProps, fieldProps, buttonProps, dialogProps } = useDatePicker(
    { ...props, label },
    state,
    ref,
  );
  const { calendarProps } = useDatePicker({ ...props, label }, dialogState, ref);

  const { locale } = useLocale();
  const calendarState = useCalendarState({
    ...calendarProps,
    locale,
    createCalendar,
  });

  const onApply = () => {
    state.setValue(dialogState.value);
    state.toggle();
  };

  const onTodayPress = () => {
    dialogState.setValue(today(getLocalTimeZone()));
    calendarState.setFocusedDate(today(getLocalTimeZone()));
  };

  const onOpenChange = (isOpen: boolean) => {
    state.toggle();
    calendarState.setFocusedDate((state.value as CalendarDate) || today(getLocalTimeZone()));
    if (!isOpen) {
      dialogState.setValue(state.value);
    }
  };

  return (
    <div className={clsx("relative inline-flex w-full flex-col text-left", className)}>
      <DatePickerInput
        ref={ref}
        label={label}
        labelProps={labelProps}
        groupProps={groupProps}
        fieldProps={{ ...fieldProps, placeholderValue: PLACEHOLDER_VALUE }}
        buttonProps={buttonProps}
        isDisabled={props.isDisabled}
        isInvalid={!!error}
        disableDropdown={disableDropdown}
        variant={variant}
        hideLabel={hideLabel}
      />
      <ErrorMessage error={error} isDisabled={props.isDisabled} />
      {!disableDropdown && (
        <DateTimeDialog
          footer={
            <DatePickerFooter
              isValid={!dialogState.isInvalid && !!dialogState.value}
              onTodayPress={onTodayPress}
              onApply={onApply}
            />
          }
          label={label}
          triggerRef={ref}
          dialogProps={dialogProps}
          isOpen={state.isOpen}
          onOpenChange={onOpenChange}
        >
          <Calendar state={calendarState} calendarProps={calendarProps} onApply={onApply} />
        </DateTimeDialog>
      )}
    </div>
  );
};

export type DatePickerProps = Omit<DatePickerInnerProps, "value" | "onChange"> & {
  value?: string | null;
  onChange?: (value: string | null) => void;
  fullIso?: boolean;
};

export const DatePicker = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  fullIso = true,
  ...props
}: ControlProps<DatePickerProps, TFieldValues, TName>) => {
  const formatCalendarDate = (calendarDate: CalendarDate | null): string | null => {
    if (calendarDate === null) {
      return null;
    }
    const date = DateTimeUtils.fromDateValueToLocal(calendarDate);
    return fullIso ? date.toISOString() : DateTime.fromJSDate(date).toISODate();
  };

  const parseCalendarDate = (formattedDate?: string | null): CalendarDate | null | undefined => {
    if (formattedDate == null) {
      return formattedDate;
    }
    const date = DateTime.fromISO(formattedDate).toJSDate();
    const zonedDateTime = DateTimeUtils.fromLocalToZonedDateTime(date);
    return toCalendarDate(zonedDateTime);
  };
  if ("formControl" in props && props.formControl) {
    return (
      <Controller
        control={props.formControl.control}
        name={props.formControl.name}
        render={({ field: { disabled, ...field }, fieldState: { error } }) => (
          <DatePickerInner
            {...props}
            value={parseCalendarDate(field.value)}
            onChange={(value) => field.onChange(formatCalendarDate(value))}
            isDisabled={disabled || props.isDisabled}
            error={props.error ?? error?.message}
          />
        )}
      />
    );
  }

  return (
    <DatePickerInner
      {...props}
      value={parseCalendarDate(props.value)}
      onChange={(value) => props.onChange?.(formatCalendarDate(value))}
    />
  );
};
