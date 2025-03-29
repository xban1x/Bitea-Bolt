import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Dialog as AriaDialog, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { useTranslation } from "react-i18next";

import { CloseIcon } from "@/assets/icons/general/Close";
import { IconButton } from "@/components/ui/buttons/IconButton/IconButton";
import { Typography } from "@/components/ui/text/Typography/Typography";

const modalContent = cva(
  ["relative", "w-full", "border-elevation-outline-1", "bg-elevation-background", "p-8", "pt-10"],
  {
    variants: {
      aside: {
        left: "h-screen rounded-none border-r",
        right: "h-screen rounded-none border-l",
        center: "rounded-ml border",
      },
    },
    defaultVariants: {
      aside: "center",
    },
  },
);

const modalOverlay = cva(
  [
    "fixed",
    "inset-0",
    "z-10",
    "flex",
    "h-[--visual-viewport-height]",
    "w-screen",
    "items-center",
    "bg-elevation-surface-2/80",
  ],
  {
    variants: {
      aside: {
        left: "justify-start p-0",
        right: "justify-end p-0",
        center: "justify-center p-4",
      },
    },
    defaultVariants: {
      aside: "center",
    },
  },
);

export type ModalProps = React.PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  aside?: "left" | "right";
  title?: string;
  backdropClose?: boolean;
  maxWidth?: number;
}>;

export const Modal = ({
  isOpen,
  onClose,
  aside,
  title,
  children,
  backdropClose,
  maxWidth,
}: React.PropsWithChildren<ModalProps>) => {
  const { t } = useTranslation();

  return (
    <AriaModalOverlay
      className={modalOverlay({ aside })}
      isDismissable={!!backdropClose}
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      style={{ zIndex: 101 }} // Needed to overlap drawer component
    >
      <AriaModal className={clsx(maxWidth ? "w-full" : "sm:max-w-[640px] w-fit max-w-[90%]")} style={{ maxWidth }}>
        <AriaDialog className={modalContent({ aside })} aria-label={title || "generic modal"}>
          {title && (
            <Typography as="h2" variant="prominent-1" size="title-5">
              {title}
            </Typography>
          )}

          <IconButton
            onPress={onClose}
            icon={CloseIcon}
            className="absolute right-4 top-4"
            label={t("ui.modal.closeBtn")}
          />

          {children}
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
};
