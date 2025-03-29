import clsx from "clsx";
import { Menu as AriaMenu, MenuItem as AriaMenuItem } from "react-aria-components";

import { MenuProps } from "@/components/ui/Menu/Menu";
import { Typography } from "@/components/ui/text/Typography/Typography";

type Props = Pick<MenuProps, "items">;

export const MenuList = ({ items }: Props) => {
  return (
    <AriaMenu>
      {items.map(({ label, content, ...item }, index) => (
        <AriaMenuItem
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          {...item}
          textValue={label}
          aria-label={label}
          className={clsx(
            "flex cursor-pointer items-center gap-2 px-4 py-2",
            "border-b border-b-elevation-outline-1 outline-none last:border-b-0",
            "bg-elevation-background text-interactive-text-on-bg",
            "disabled:cursor-default disabled:text-interactive-text-disabled",
            "hover:text-interactive-text-hover",
            "focus-visible:bg-interactive-primary-focus focus-visible:text-interactive-text-on-inverted",
            item.className,
          )}
        >
          <Typography as="div" size="label-2" className="flex">
            {content ?? label}
          </Typography>
        </AriaMenuItem>
      ))}
    </AriaMenu>
  );
};
