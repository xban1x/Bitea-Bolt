import { getLocalTimeZone, now, toTime } from "@internationalized/date";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
import { AriaTimeFieldProps, TimeValue, useLocale, useTimeField } from "react-aria";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import { useTimeFieldState } from "react-stately";

import { DateTimeDialog } from "@/components/ui/inputs/DateTime/shared/DateTimeDialog";
import { TimePickerFooter } from "@/components/ui/inputs/DateTime/shared/TimePickerFooter";
import { TimePickerForm } from "@/components/ui/inputs/DateTime/shared/TimePickerForm";
import { TimePickerInput } from "@/components/ui/inputs/DateTime/shared/TimePickerInput";
import { DateTimeUtils } from "@/components/ui/inputs/DateTime/shared/date-time.utils";
import { TextInputVariantProps } from "@/components/ui/inputs/TextInput/TextInputWrapper";
import { ErrorMessage } from "@/components/ui/inputs/shared/ErrorMessage";
import { ControlProps } from "@/types/form";

type TimePickerInnerProps = AriaTimeFieldProps<TimeValue> & {
  label: string;
  hideLabel?: boolean;
  disableDropdown?: boolean;
  error?: string;
  date?: string | null;
} & TextInputVariantProps;

const TimePickerInner = ({
  onChange,
  value,
  disableDropdown,
  error,
  variant,
  hideLabel,
  ...props
}: TimePickerInnerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const skipOnChangeRef = useRef(false);
  const initialDateEmitRef = useRef(true);

  const { locale } = useLocale();

  const dialogState = useTimeFieldState({
    ...props,
    defaultValue: value || props.defaultValue,
    locale,
  });
  const state = useTimeFieldState({
    ...props,
    value,
    onChange: (val) => {
      // First change value is 00:00 due to the below mentioned bug so we should ignore it
      if (!skipOnChangeRef.current) {
        onChange?.(val);
      }
    },
    locale,
  });

  useEffect(() => {
    if (initialDateEmitRef.current) {
      initialDateEmitRef.current = false;
      return;
    }

    if (state.timeValue) {
      onChange?.(state.timeValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.date]);

  useEffect(() => {
    if (dialogState.timeValue || !state.value) {
      return;
    }
    // Similar logic as onApply
    state.segments.forEach((segment) => {
      if (segment.isEditable && segment.value != null) {
        dialogState.setSegment(segment.type, segment.value);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.value]);

  const ref = useRef<HTMLDivElement | null>(null);
  const { labelProps, fieldProps } = useTimeField(props, state, ref);

  const onApply = () => {
    // Due to a bug in react stately, if the timeValue is not set, setting value on state doesn't properly update it (https://github.com/adobe/react-spectrum/issues/4791)
    // To work around this we manually set each segment and skip the first on change event
    if (!state.timeValue) {
      skipOnChangeRef.current = true;
      dialogState.segments.forEach((segment) => {
        if (segment.isEditable && segment.value != null) {
          state.setSegment(segment.type, segment.value);
        }
      });
      skipOnChangeRef.current = false;
    }

    state.setValue(dialogState.value);

    setIsOpen(false);
  };

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!isOpen) {
      dialogState.setValue(state.value);
    }
  };

  const onOpen = () => {
    dialogState.setValue(state.value);
    setIsOpen(true);
  };

  return (
    <div className="relative inline-flex w-full flex-col text-left">
      <TimePickerInput
        ref={ref}
        label={props.label}
        labelProps={labelProps}
        fieldProps={fieldProps}
        state={state}
        onPress={onOpen}
        isDisabled={props.isDisabled}
        isInvalid={!!error}
        disableDropdown={disableDropdown}
        variant={variant}
        hideLabel={hideLabel}
      />
      <ErrorMessage error={error} isDisabled={props.isDisabled} />

      {!disableDropdown && (
        <DateTimeDialog
          footer={<TimePickerFooter onApply={onApply} />}
          label={props.label}
          triggerRef={ref}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <TimePickerForm state={dialogState} />
        </DateTimeDialog>
      )}
    </div>
  );
};

export type TimePickerProps = Omit<TimePickerInnerProps, "value" | "onChange"> & {
  value?: string | null;
  onChange?: (value: string | null) => void;
  fullIso?: boolean;
};

export const TimePicker = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: ControlProps<TimePickerProps, TFieldValues, TName>,
) => {
  const formatTimeValue = (timeValue: TimeValue | null): string | null => {
    if (timeValue === null) {
      return null;
    }
    const parsedDate = props.date ? DateTime.fromISO(props.date).toJSDate() : undefined;
    const dateValue = parsedDate ? DateTimeUtils.fromLocalToZonedDateTime(parsedDate) : now(getLocalTimeZone());
    const dateTimeValue = dateValue.set(timeValue);
    return DateTimeUtils.fromDateValueToISO(dateTimeValue);
  };

  const parseTimeValue = (isoString?: string | null): TimeValue | null | undefined => {
    if (isoString == null) {
      return isoString;
    }
    const zonedDateTime = DateTimeUtils.fromISOtoZonedDateTime(isoString);
    return toTime(zonedDateTime);
  };

  if ("formControl" in props && props.formControl) {
    return (
      <Controller
        control={props.formControl.control}
        name={props.formControl.name}
        render={({ field: { disabled, ...field }, fieldState: { error } }) => (
          <TimePickerInner
            {...props}
            value={parseTimeValue(field.value)}
            onChange={(value) => field.onChange(formatTimeValue(value))}
            isDisabled={disabled || props.isDisabled}
            error={props.error ?? error?.message}
          />
        )}
      />
    );
  }

  return (
    <TimePickerInner
      {...props}
      value={parseTimeValue(props.value)}
      onChange={(value) => props.onChange?.(formatTimeValue(value))}
    />
  );
};
