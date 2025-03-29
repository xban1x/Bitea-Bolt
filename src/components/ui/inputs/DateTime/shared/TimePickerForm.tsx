import { Time } from "@internationalized/date";
import { DatePickerState, DateSegment, TimeFieldState, useTimeFieldState } from "@react-stately/datepicker";
import clsx from "clsx";
import { useRef } from "react";
import { useDateSegment, useLocale, useTimeField } from "react-aria";

import { ChevronDownIcon } from "@/assets/icons/general/ChevronDown";
import { ChevronUpIcon } from "@/assets/icons/general/ChevronUp";
import { InlineIconButton } from "@/components/ui/buttons/InlineIconButton/InlineIconButton";
import { getPlaceholder } from "@/components/ui/inputs/DateTime/shared/DateSegmentItem";
import { Typography } from "@/components/ui/text/Typography/Typography";

type TimePickerFormProps =
  | { state: TimeFieldState; datePickerState?: never }
  | { state?: never; datePickerState: DatePickerState };

export const TimePickerForm = ({ state, datePickerState }: TimePickerFormProps) => {
  const { locale } = useLocale();
  const fieldState = useTimeFieldState({
    locale,
    defaultValue: datePickerState?.timeValue,
    onChange: (value) => {
      datePickerState?.setTimeValue(value ?? new Time(0, 0));
    },
    hideTimeZone: true,
  });
  const ref = useRef<HTMLDivElement | null>(null);
  const innerState = state ?? fieldState;
  const { fieldProps } = useTimeField({}, innerState, ref);

  return (
    <div className="p-8">
      <div className="flex items-center justify-center gap-4">
        {innerState.segments.map((segment, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <TimeSegmentButton key={i} segment={segment} state={innerState} type="increment" />
        ))}
      </div>
      <div ref={ref} {...fieldProps} className="flex items-center justify-center gap-4 py-2">
        {innerState.segments.map((segment, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <TimeSegmentInput key={i} segment={segment} state={innerState} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        {innerState.segments.map((segment, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <TimeSegmentButton key={i} segment={segment} state={innerState} type="decrement" />
        ))}
      </div>
    </div>
  );
};

interface TimeSegmentProps {
  segment: DateSegment;
  state: TimeFieldState;
}

const TimeSegmentInput = ({ segment, state }: TimeSegmentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  if (!["literal", "hour", "minute", "dayPeriod"].includes(segment.type)) {
    return null;
  }

  if (segment.type === "literal") {
    return (
      <div className="flex w-6 flex-col text-center" ref={ref}>
        <Typography as="span" variant="prominent-1" size="label-2" className="text-text-default-secondary">
          {segment.text}
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        ref={ref}
        {...segmentProps}
        className={clsx(
          "w-11 rounded-input-rounding bg-elevation-surface-2 py-height-s text-center",
          "font-labels-default text-text-default-tertiary",
          "border border-solid border-transparent",
          "hover:border-interactive-primary-hover",
          "focus-within:border-interactive-primary-idle focus-within:outline-none",
        )}
      >
        {getPlaceholder(segment) ?? segment.text}
      </div>
    </div>
  );
};

const TimeSegmentButton = ({ segment, state, type }: TimeSegmentProps & { type: "increment" | "decrement" }) => {
  if (!["literal", "hour", "minute", "dayPeriod"].includes(segment.type)) {
    return null;
  }

  if (segment.type === "literal") {
    return <div className="flex w-6" />;
  }

  const onPress = () => {
    if (type === "increment") {
      state.increment(segment.type);
    } else {
      state.decrement(segment.type);
    }
  };

  const Icon = type === "increment" ? ChevronUpIcon : ChevronDownIcon;

  return (
    <div className="flex w-11 items-center justify-center">
      <InlineIconButton label="" onPress={onPress} icon={Icon} />
    </div>
  );
};
