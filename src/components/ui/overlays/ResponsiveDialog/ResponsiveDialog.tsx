import clsx from "clsx";
import React from "react";
import { Dialog, DialogTrigger, Popover } from "react-aria-components";
import { useTranslation } from "react-i18next";

import { CloseIcon } from "@/assets/icons/general/Close";
import { InputHeader } from "@/components/ui/inputs/shared/InputHeader";
import { Drawer } from "@/components/ui/overlays/Drawer/Drawer";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface ResponsiveDialogProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  popoverClassName?: string;
  drawerLabel: string;
}

export const ResponsiveDialog = ({
  trigger,
  isOpen,
  onOpenChange,
  children,
  popoverClassName,
  drawerLabel,
}: ResponsiveDialogProps) => {
  const { t } = useTranslation();
  const isDesktop = useBreakpoint("t");

  if (!isDesktop) {
    return (
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} trigger={trigger}>
        {(close) => (
          <>
            <div className="px-4 pt-3">
              <InputHeader
                label={drawerLabel}
                rightContent={
                  <button type="button" onClick={close} aria-label={t("ui.select.closeAlt")} className="shrink-0">
                    <CloseIcon className="size-6 text-interactive-icon-idle" />
                  </button>
                }
              />
            </div>
            <div className="p-4">{children}</div>
          </>
        )}
      </Drawer>
    );
  }

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
      {trigger}

      <Popover className={clsx("my-4 outline-none", popoverClassName)} offset={0} placement="bottom start">
        <Dialog className="outline-none">
          <div
            className={clsx(
              "overflow-hidden p-2 shadow-5 outline-none",
              "rounded-input-rounding border border-elevation-outline-1 bg-elevation-background",
            )}
          >
            {children}
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
