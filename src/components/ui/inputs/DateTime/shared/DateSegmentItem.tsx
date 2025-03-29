import { DateFieldState, DateSegment } from "@react-stately/datepicker";
import clsx from "clsx";
import { useRef } from "react";
import { useDateSegment } from "react-aria";

interface DateSegmentProps {
  state: DateFieldState;
  segment: DateSegment;
  isDisabled?: boolean;
  timePickerOnly?: boolean;
}

export const getPlaceholder = (segment: DateSegment): string | null => {
  if (!segment.isPlaceholder) {
    return null;
  }

  switch (segment.type) {
    case "hour":
      return "hh";
    case "minute":
      return "mm";
    case "second":
      return "ss";
    default:
      return segment.placeholder;
  }
};

export const DateSegmentItem = ({ segment, state, isDisabled, timePickerOnly }: DateSegmentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  const isInputEmpty = !state.value;

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={clsx(
        "box-content",
        isDisabled && "text-interactive-text-disabled",
        !isDisabled && isInputEmpty && "text-text-default-tertiary group-focus-within:text-text-default-primary",
        !isDisabled && !isInputEmpty && "text-text-default-primary",
        "focus-within:outline focus-within:outline-1 focus-within:outline-interactive-primary-idle",
        ["hour", "dayPeriod"].includes(segment.type) && !timePickerOnly && "ml-1",
      )}
    >
      {segment.isPlaceholder && (
        <span aria-hidden="true" className="pointer-events-none">
          {getPlaceholder(segment)}
        </span>
      )}
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
};
