import clsx from "clsx";
import { useState } from "react";
import { Popover as AriaPopover, Dialog, DialogTrigger } from "react-aria-components";

import { FilterOptionProps } from "@/components/platform/masterData/accounting/filters/DateFilter";
import { PillButton } from "@/components/ui/buttons/PillButton/PillButton";
import { ExchangeFilters } from "@/data/exchangeRates/exchangeRates.store";

interface PillDropdownProps {
  placeholder: string;
  popoverClassName?: React.HTMLAttributes<HTMLElement>["className"];
  className?: string;
  disabled?: boolean;
  id: ExchangeFilters.FilterTypesSchema;
  filter: ({ onClose }: FilterOptionProps) => JSX.Element;
}

export const TableFilterPill = (props: PillDropdownProps) => {
  const { activeFilters } = ExchangeFilters.useStore();
  const { id, placeholder, filter: Filter } = props;
  const [isOpen, setIsOpen] = useState(false);
  const isActive = activeFilters.includes(id);

  return (
    <div className={clsx("flex", props.className)}>
      <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <PillButton
          isDisabled={props.disabled}
          className={clsx(isActive && "!bg-elevation-blue-surface-1 !text-interactive-text-on-bg-2")}
          dismissable={isActive}
        >
          {placeholder}
        </PillButton>

        <AriaPopover
          className={clsx("my-4 mt-1 pt-2 outline-none", props.popoverClassName)}
          offset={0}
          placement="bottom start"
          shouldCloseOnInteractOutside={() => false}
        >
          <Dialog className="outline-none">
            <div className="overflow-hidden rounded-input-rounding outline-none">
              <Filter onClose={setIsOpen} />
            </div>
          </Dialog>
        </AriaPopover>
      </DialogTrigger>
    </div>
  );
};
