import { CalendarDate, CalendarDateTime, createCalendar, getLocalTimeZone, now, today } from "@internationalized/date";
import { useRef } from "react";
import { DateValue, useDatePicker, useLocale } from "react-aria";
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
const PLACEHOLDER_VALUE = new CalendarDateTime(2024, 1, 1);

type DateTimePickerInnerProps = Omit<DatePickerStateOptions<DateValue>, "granularity" | "shouldCloseOnSelect"> & {
  label: string;
  hideLabel?: boolean;
  disableDropdown?: boolean;
  error?: string;
} & TextInputVariantProps;

const DateTimePickerInner = ({
  label,
  hideLabel,
  onChange,
  value,
  disableDropdown,
  error,
  variant,
  ...props
}: DateTimePickerInnerProps) => {
  const dialogState = useDatePickerState({
    ...props,
    defaultValue: value || props.defaultValue,
    shouldCloseOnSelect: false,
    granularity: "minute",
    hideTimeZone: true,
  });
  const state = useDatePickerState({
    ...props,
    value,
    onChange: (val) => {
      onChange?.(val);
      dialogState.setValue(val);
      calendarState.setFocusedDate((val as CalendarDate) || today(getLocalTimeZone()));
    },
    shouldCloseOnSelect: false,
    granularity: "minute",
    hideTimeZone: true,
  });

  const ref = useRef<HTMLDivElement>(null);

  const { groupProps, labelProps, fieldProps, buttonProps, dialogProps } = useDatePicker(
    { ...props, granularity: "minute", hideTimeZone: true },
    state,
    ref,
  );
  const { calendarProps } = useDatePicker(props, dialogState, ref);

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
    dialogState.setValue(now(getLocalTimeZone()));
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
    <div className="relative inline-flex w-full flex-col text-left">
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
        isDateTime
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
          <Calendar
            state={calendarState}
            calendarProps={calendarProps}
            includesTime
            datePickerState={dialogState}
            onApply={onApply}
          />
        </DateTimeDialog>
      )}
    </div>
  );
};

export type DateTimePickerProps = Omit<DateTimePickerInnerProps, "value" | "onChange"> & {
  value?: string | null;
  onChange?: (value: string | null) => void;
};

export const DateTimePicker = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: ControlProps<DateTimePickerProps, TFieldValues, TName>,
) => {
  const formatDateValue = (dateValue: DateValue | null): string | null => {
    if (dateValue === null) {
      return null;
    }
    return DateTimeUtils.fromDateValueToISO(dateValue);
  };

  const parseDateValue = (isoString?: string | null): DateValue | null | undefined => {
    if (isoString == null) {
      return isoString;
    }
    return DateTimeUtils.fromISOtoZonedDateTime(isoString);
  };

  if ("formControl" in props && props.formControl) {
    return (
      <Controller
        control={props.formControl.control}
        name={props.formControl.name}
        render={({ field: { disabled, ...field }, fieldState: { error } }) => (
          <DateTimePickerInner
            {...props}
            value={parseDateValue(field.value)}
            onChange={(value) => field.onChange(formatDateValue(value))}
            isDisabled={disabled || props.isDisabled}
            error={props.error ?? error?.message}
          />
        )}
      />
    );
  }

  return (
    <DateTimePickerInner
      {...props}
      value={parseDateValue(props.value)}
      onChange={(value) => props.onChange?.(formatDateValue(value))}
    />
  );
};
