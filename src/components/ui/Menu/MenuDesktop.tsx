import { MenuTrigger as AriaMenuTrigger, Popover as AriaPopover } from "react-aria-components";

import { MenuProps } from "@/components/ui/Menu/Menu";
import { MenuList } from "@/components/ui/Menu/MenuList";

export const MenuDesktop = ({ trigger, items }: MenuProps) => {
  return (
    <AriaMenuTrigger>
      {trigger}
      <AriaPopover className="outline-none">
        <div className="overflow-hidden rounded-input-rounding border border-elevation-outline-1 shadow-5 outline-none">
          <MenuList items={items} />
        </div>
      </AriaPopover>
    </AriaMenuTrigger>
  );
};
