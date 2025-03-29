import { useState } from "react";

import { MenuProps } from "@/components/ui/Menu/Menu";
import { MenuList } from "@/components/ui/Menu/MenuList";
import { Drawer } from "@/components/ui/overlays/Drawer/Drawer";

export const MenuMobile = ({ trigger, items }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer isOpen={isOpen} onOpenChange={setIsOpen} trigger={trigger}>
      {() => <MenuList items={items} />}
    </Drawer>
  );
};
