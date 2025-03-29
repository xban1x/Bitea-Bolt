import clsx from "clsx";
import { ListBoxItem as AriaListBoxItem } from "react-aria-components";

import { CheckboxCheckmark } from "@/components/ui/inputs/Checkbox/CheckboxCheckmark";
import { typography } from "@/components/ui/text/Typography/Typography";

import { SelectItem } from "./Select";

interface Props extends SelectItem {
  isMultiple?: boolean;
}

export const SelectListItem = ({ isMultiple, ...item }: Props) => {
  return (
    <AriaListBoxItem
      id={item.id}
      className={clsx(
        "group flex cursor-pointer items-center gap-2 px-4 py-2",
        "border-b border-b-elevation-outline-1 outline-none last:border-b-0",
        "bg-elevation-background text-interactive-text-on-bg",
        "disabled:cursor-default disabled:text-interactive-text-disabled",
        "hover:text-interactive-text-hover",
        "focus-visible:bg-interactive-primary-focus focus-visible:text-interactive-text-on-inverted",
        !isMultiple && "selected:bg-interactive-primary-idle selected:text-interactive-text-on-inverted",
      )}
      textValue={item.label}
      isDisabled={item.isDisabled}
    >
      <CheckboxCheckmark variant="default" className="group-data-[selection-mode='single']:hidden" />
      <div className={clsx(typography({ size: "input-text" }), "text-input-text")}>{item.content ?? item.label}</div>
    </AriaListBoxItem>
  );
};
