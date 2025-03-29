import { getWeeksInMonth } from "@internationalized/date";
import { useCalendarGrid, AriaCalendarGridProps } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { CalendarState } from "@react-stately/calendar";

import { CalendarCell } from "@/components/ui/inputs/DateTime/shared/CalendarCell";
import { Typography } from "@/components/ui/text/Typography/Typography";

interface CalendarGridProps extends AriaCalendarGridProps {
  state: CalendarState;
  onApply: () => void;
}

export const CalendarGrid = ({ state, onApply, ...props }: CalendarGridProps) => {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid({ ...props, weekdayStyle: "short" }, state);

  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <div className="h-72 w-80 px-3 py-1">
      <table {...gridProps} cellPadding="0" className="w-full">
        <thead {...headerProps}>
          <tr>
            {weekDays.map((day) => (
              <th key={day}>
                <Typography size="label-2" className="bg-elevation-background py-2 text-interactive-text-on-bg">
                  {day.substring(0, 2)}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
            <tr key={weekIndex}>
              {state
                .getDatesInWeek(weekIndex)

                .map((date, i) =>
                  // eslint-disable-next-line react/no-array-index-key, jsx-a11y/control-has-associated-label
                  date ? <CalendarCell key={i} state={state} date={date} onApply={onApply} /> : <td key={i} />,
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
