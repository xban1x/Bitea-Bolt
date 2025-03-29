import React from "react";
import { MenuItemProps } from "react-aria-components";

import { MenuDesktop } from "@/components/ui/Menu/MenuDesktop";
import { MenuMobile } from "@/components/ui/Menu/MenuMobile";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface MenuItem extends Omit<MenuItemProps, "aria-label" | "textValue" | "children"> {
  label: string;
  content?: string | React.ReactElement;
}

export interface MenuProps {
  trigger: React.ReactElement;
  items: MenuItem[];
}

export const Menu = (props: MenuProps) => {
  const isDesktop = useBreakpoint("t");

  if (isDesktop) {
    return <MenuDesktop {...props} />;
  }

  return <MenuMobile {...props} />;
};
