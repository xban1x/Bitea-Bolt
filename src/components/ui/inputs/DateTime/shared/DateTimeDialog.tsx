import React from "react";
import { AriaDialogProps } from "react-aria";
import { Dialog as AriaDialog, Popover as AriaPopover } from "react-aria-components";
import { useTranslation } from "react-i18next";

import { CloseIcon } from "@/assets/icons/general/Close";
import { InputHeader } from "@/components/ui/inputs/shared/InputHeader";
import { Drawer } from "@/components/ui/overlays/Drawer/Drawer";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface DateTimeDialogProps {
  children: React.ReactNode;
  footer: React.ReactNode;
  label: string;
  isOpen: boolean;
  triggerRef?: React.RefObject<HTMLElement | null>;
  dialogProps?: AriaDialogProps;
  onOpenChange: (open: boolean) => void;
}

export const DateTimeDialog = ({
  children,
  footer,
  label,
  isOpen,
  triggerRef,
  dialogProps,
  onOpenChange,
}: DateTimeDialogProps) => {
  const { t } = useTranslation();
  const isDesktop = useBreakpoint("t");

  if (isDesktop) {
    if (!isOpen) {
      return null;
    }
    return (
      <AriaPopover triggerRef={triggerRef} isOpen={isOpen} placement="bottom start" onOpenChange={onOpenChange}>
        <AriaDialog {...dialogProps} className="!outline-none">
          <div className="overflow-hidden rounded-button-rounding border border-solid border-elevation-outline-1 bg-elevation-background shadow-5">
            {children}
            {footer}
          </div>
        </AriaDialog>
      </AriaPopover>
    );
  }

  return (
    <Drawer trigger={null} isOpen={isOpen} onOpenChange={onOpenChange}>
      {(close) => (
        <div className="flex h-screen flex-col">
          <div className="min-h-0 flex-1 overflow-auto">
            <div className="mb-8 px-4 pt-3">
              <InputHeader
                label={label}
                rightContent={
                  <button type="button" onClick={close} aria-label={t("ui.select.closeAlt")} className="shrink-0">
                    <CloseIcon className="size-6 text-interactive-icon-idle" />
                  </button>
                }
              />
            </div>
            {children}
          </div>
          {footer}
        </div>
      )}
    </Drawer>
  );
};
