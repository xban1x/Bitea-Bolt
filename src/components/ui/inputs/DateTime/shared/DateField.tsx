import { createCalendar } from "@internationalized/date";
import { DateFieldStateOptions } from "@react-stately/datepicker";
import { useRef } from "react";
import { useDateField, useLocale } from "react-aria";
import { useDateFieldState } from "react-stately";

import { DateSegmentItem } from "@/components/ui/inputs/DateTime/shared/DateSegmentItem";

type DateFieldProps = Omit<DateFieldStateOptions, "locale" | "createCalendar">;

export const DateField = (props: DateFieldProps) => {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div {...fieldProps} ref={ref} className="relative w-full">
      <div className="flex">
        {state.segments.map((segment, i) => (
          <DateSegmentItem
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            segment={segment}
            state={state}
            isDisabled={props.isDisabled}
          />
        ))}
      </div>
    </div>
  );
};
