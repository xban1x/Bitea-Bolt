import clsx from "clsx";

import { Button } from "@/components/ui/buttons/Button/Button";
import { Typography } from "@/components/ui/text/Typography/Typography";

import { Modal, ModalProps } from "./Modal";

export type ActionModalProps = {
  heading: string;
  description?: string;
  children?: React.ReactNode;
  primaryAction: {
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "outlined";
    className?: string;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "outlined";
    className?: string;
  };
} & ModalProps;

export const ActionModal = ({
  heading,
  description,
  children,
  primaryAction,
  secondaryAction,
  ...modalProps
}: ActionModalProps) => {
  return (
    <Modal {...modalProps}>
      <Typography size="title-5" variant="prominent-1" as="h2" className="mb-4">
        {heading}
      </Typography>
      {children || (
        <Typography size="body-3" className="mb-4">
          {description}
        </Typography>
      )}
      <div className="flex flex-wrap gap-4 py-1">
        <Button
          variant={primaryAction.variant ?? "secondary"}
          size="small"
          onPress={primaryAction.onPress}
          className={clsx("min-w-[10rem] flex-1 flex-shrink-0", primaryAction.className)}
        >
          {primaryAction.label}
        </Button>

        {secondaryAction && (
          <Button
            variant={secondaryAction.variant ?? "outlined"}
            size="small"
            onPress={secondaryAction?.onPress}
            className={clsx("min-w-[10rem] flex-1 flex-shrink-0", secondaryAction.className)}
          >
            {secondaryAction?.label}
          </Button>
        )}
      </div>
    </Modal>
  );
};
