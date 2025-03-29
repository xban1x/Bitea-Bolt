import { cva, VariantProps } from "class-variance-authority";
import { useHover } from "react-aria";
import { useTranslation } from "react-i18next";

import { CloseIcon } from "@/assets/icons/general/Close";
import { uiOutlineClass } from "@/components/ui/global/outline";
import { TooltipEllipsis } from "@/components/ui/overlays/Tooltip/TooltipEllipsis";
import { Typography } from "@/components/ui/text/Typography/Typography";

const tag = cva(
  [
    uiOutlineClass,
    "inline-flex items-center gap-1",
    "px-1-5",
    "rounded-button-rounding",
    "overflow-hidden",
    "disabled:cursor-default disabled:text-interactive-text-disabled",
  ],
  {
    variants: {
      variant: {
        blue: [
          "bg-elevation-blue-surface-1 text-interactive-primary-idle",
          "hover:bg-elevation-blue-surface-2 pressed:text-interactive-primary-pressed",
        ],
        green: [
          "bg-elevation-green-surface-1 text-info-success",
          "hover:bg-elevation-green-surface-2 pressed:text-elevation-green-surface-3",
        ],
        purple: [
          "bg-elevation-purple-surface-1 text-elevation-purple-surface-2",
          "hover:bg-elevation-purple-surface-2 pressed:bg-elevation-purple-surface-4 pressed:text-elevation-purple-surface-3",
        ],
        red: [
          "bg-elevation-red-surface-1 text-info-error",
          "hover:bg-elevation-red-surface-2 pressed:bg-elevation-red-surface-4 pressed:text-elevation-red-surface-3",
        ],
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  },
);

type TagProps = VariantProps<typeof tag> & {
  children: string;
  dismissable?: boolean;
  onDismiss?: () => void;
  className?: string;
  isDisabled?: boolean;
};

export const Tag = ({ variant, children, dismissable, onDismiss, className, isDisabled }: TagProps) => {
  const { t } = useTranslation();
  const { hoverProps, isHovered } = useHover({});

  const onDismissClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (isDisabled) {
      return;
    }
    e.stopPropagation();
    onDismiss?.();
  };

  return (
    <TooltipEllipsis text={children}>
      {(onContentRef) => (
        <div
          ref={onContentRef}
          className={tag({
            variant,
            className,
          })}
          data-rac=""
          data-disabled={isDisabled || undefined}
          data-hovered={isHovered || undefined}
          {...hoverProps}
        >
          <Typography variant="default" size="label-2" as="span" className="truncate">
            {children}
          </Typography>

          {dismissable && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
            <span role="button" onClick={onDismissClick} aria-label={t("ui.tag.dismiss")} className="shrink-0">
              <CloseIcon className="size-4" />
            </span>
          )}
        </div>
      )}
    </TooltipEllipsis>
  );
};
