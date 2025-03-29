import clsx from "clsx";
import { Dialog, DialogTrigger, Modal, ModalOverlay as AriaModalOverlay } from "react-aria-components";

type DrawerProps = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  trigger?: React.ReactNode;
  children: (close: () => void) => React.ReactNode;
  fitContent?: boolean;
  isDismissable?: boolean;
  className?: string;
};

export const Drawer = ({
  isOpen,
  onOpenChange,
  trigger,
  children,
  fitContent,
  isDismissable,
  className,
}: DrawerProps) => {
  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
      {trigger}

      <AriaModalOverlay
        className="fixed inset-0 z-10 flex h-[--visual-viewport-height] w-screen items-center justify-center bg-elevation-surface-2/80"
        isDismissable={isDismissable}
      >
        <Modal
          className={clsx(
            fitContent ? "w-fit" : "w-screen",
            "fixed bottom-0 right-0 top-0 flex justify-end entering:animate-drawer-enter exiting:animate-drawer-exit",
            className,
          )}
        >
          <Dialog className="w-full border-none bg-elevation-surface-0 outline-none">
            {({ close }) => children(close)}
          </Dialog>
        </Modal>
      </AriaModalOverlay>
    </DialogTrigger>
  );
};
