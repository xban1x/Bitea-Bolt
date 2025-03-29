import { today } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { CalendarState } from "@react-stately/calendar";
import clsx from "clsx";
import { Key, useMemo, useRef } from "react";
import { ListBox, ListBoxItem } from "react-aria-components";

import { Typography } from "@/components/ui/text/Typography/Typography";

interface YearPickerProps {
  state: CalendarState;
  onSelectionChange: (key: Set<Key>) => void;
}

export const YearPicker = ({ state, onSelectionChange }: YearPickerProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const formatter = useDateFormatter({
    year: "numeric",
    timeZone: state.timeZone,
  });

  const years = useMemo(() => {
    const arr: { value: number; formatted: string }[] = [];
    for (let i = -100; i <= 100; i++) {
      const date = today(state.timeZone).add({ years: i });
      arr.push({
        value: date.year,
        formatted: formatter.format(date.toDate(state.timeZone)),
      });
    }

    return arr;
  }, [state.timeZone, formatter]);

  const selectedYear = years.findIndex((year) => year.value === state.focusedDate.year);

  const onChildRef = (child: HTMLDivElement) => {
    if (!child || !parentRef.current) {
      return;
    }

    if (child.dataset.selected !== "true") {
      return;
    }

    const parentRect = parentRef.current.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    const isVisible = childRect.top >= parentRect.top && childRect.bottom <= parentRect.bottom;

    if (isVisible) {
      return;
    }

    child.scrollIntoView({
      behavior: "instant",
      block: "nearest",
      inline: "nearest",
    });
  };

  return (
    <ListBox
      ref={parentRef}
      aria-label="Year"
      selectionMode="single"
      selectionBehavior="replace"
      selectedKeys={[selectedYear]}
      onSelectionChange={(key) => {
        if (key === "all") {
          return;
        }
        const index = [...key][0] as number;
        if (index == null) {
          return;
        }

        const date = state.focusedDate.set({ year: years[index].value });
        state.setFocusedDate(date);
        onSelectionChange(key);
      }}
      className="h-72 w-80 overflow-auto"
    >
      {years.map((year, index) => (
        <ListBoxItem
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          ref={onChildRef}
          id={index}
          textValue={year.formatted}
          className={clsx(
            "flex cursor-pointer px-4 py-2 text-interactive-text-on-bg",
            "border-b border-solid border-elevation-outline-1 bg-elevation-background",
            "hover:text-interactive-text-hover",
            "selected:bg-interactive-primary-idle selected:text-interactive-text-on-inverted",
          )}
        >
          <Typography as="span" size="label-2">
            {year.formatted}
          </Typography>
        </ListBoxItem>
      ))}
    </ListBox>
  );
};
