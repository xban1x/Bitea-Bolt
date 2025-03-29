import { Time } from "@internationalized/date";
import { AriaButtonProps } from "@react-aria/button";
import { useDateFormatter } from "@react-aria/i18n";
import { CalendarState } from "@react-stately/calendar";
import { Button as AriaButton } from "react-aria-components";
import { DatePickerState } from "react-stately";

import { ChevronLeftIcon } from "@/assets/icons/general/ChevronLeft";
import { ChevronRightIcon } from "@/assets/icons/general/ChevronRight";
import { PillButton } from "@/components/ui/buttons/PillButton/PillButton";
import { ToggleState } from "@/components/ui/inputs/DateTime/shared/Calendar";

const HourCycle = {
  12: "h12",
  24: "h23",
} as const;

interface CalendarProps {
  calendarState: CalendarState;
  datePickerState?: DatePickerState;
  prevButtonProps: AriaButtonProps;
  nextButtonProps: AriaButtonProps;
  includesTime?: boolean;
  hourCycle?: 12 | 24;
  toggleState: ToggleState | null;
  setToggleState: (state: ToggleState | null) => void;
}

export const CalendarHeader = ({
  calendarState,
  datePickerState,
  prevButtonProps,
  nextButtonProps,
  includesTime,
  hourCycle,
  toggleState,
  setToggleState,
}: CalendarProps) => {
  const formatter = useDateFormatter({
    month: "long",
    timeZone: calendarState.timeZone,
  });
  const timeFormatter = useDateFormatter({
    timeStyle: "short",
    timeZone: calendarState.timeZone,
    hourCycle: hourCycle ? HourCycle[hourCycle] : undefined,
  });

  const year = calendarState.focusedDate.year.toString();
  const month = formatter.format(calendarState.focusedDate.toDate(calendarState.timeZone));

  const timeValue = datePickerState?.timeValue || new Time();
  const date = new Date();
  date.setHours(timeValue.hour, timeValue.minute);

  return (
    <div className="inline-flex w-full items-center justify-between border-b border-solid border-elevation-outline-1 px-1">
      <div className="inline-flex h-12 items-center p-3">
        {!toggleState && (
          <AriaButton {...prevButtonProps}>
            <ChevronLeftIcon className="size-6 text-interactive-icon-idle" />
          </AriaButton>
        )}
      </div>
      <div className="flex gap-2">
        <PillButton
          toggle
          isSelected={toggleState === "month"}
          onChange={(isSelected) => setToggleState(isSelected ? "month" : null)}
        >
          {month}
        </PillButton>
        <PillButton
          toggle
          isSelected={toggleState === "year"}
          onChange={(isSelected) => setToggleState(isSelected ? "year" : null)}
        >
          {year}
        </PillButton>
        {includesTime && (
          <PillButton
            toggle
            isSelected={toggleState === "time"}
            onChange={(isSelected) => setToggleState(isSelected ? "time" : null)}
          >
            {timeFormatter.format(date)}
          </PillButton>
        )}
      </div>
      <div className="inline-flex h-12 items-center p-3">
        {!toggleState && (
          <AriaButton {...nextButtonProps}>
            <ChevronRightIcon className="size-6 text-interactive-icon-idle" />
          </AriaButton>
        )}
      </div>
    </div>
  );
};
