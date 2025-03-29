import { cva } from "class-variance-authority";
import {
  Button as AriaButton,
  ToggleButton as AriaToggleButton,
  ToggleButtonProps as AriaToggleButtonProps,
  ButtonProps as AriaButtonProps,
} from "react-aria-components";

import { CloseIcon } from "@/assets/icons/general/Close";
import { ButtonContent } from "@/components/ui/buttons/shared/ButtonContent";
import { uiOutlineClass } from "@/components/ui/global/outline";
import { TooltipEllipsis } from "@/components/ui/overlays/Tooltip/TooltipEllipsis";

const pillButton = cva(
  [
    uiOutlineClass,
    "flex",
    "flex-row-reverse",
    "justify-center",
    "items-center",
    "gap-1",
    "px-2",
    "p-height-xs",
    "rounded-button-rounding",

    "text-text-default-tertiary",
    "disabled:text-interactive-tertiary-on-disabled",
    "bg-interactive-tertiary-idle",
    "hover:bg-interactive-tertiary-hover",
    "focus-visible:outline-interactive-tertiary-focus",
  ],
  {
    variants: {
      variant: {
        pill: ["pressed:bg-interactive-tertiary-pressed"],
        pillToggle: [
          "selected:bg-interactive-tertiary-toggled",
          "selected:text-interactive-tertiary-on-toggled",
          "selected:hover:text-interactive-tertiary-hover",
        ],
      },
    },
  },
);

type PillButtonProps = AriaButtonProps &
  AriaToggleButtonProps & {
    children: string;
    dismissable?: boolean;
    toggle?: boolean;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  };

export const PillButton = ({ children, dismissable, icon: Icon, toggle, ...props }: PillButtonProps) => {
  const Component: any = toggle ? AriaToggleButton : AriaButton;

  return (
    <TooltipEllipsis text={children}>
      {(onContentRef) => (
        <Component
          {...props}
          className={pillButton({
            variant: toggle ? "pillToggle" : "pill",
            className: props.className,
          })}
        >
          <ButtonContent text={children} ref={onContentRef} icon={dismissable ? CloseIcon : Icon || undefined} />
        </Component>
      )}
    </TooltipEllipsis>
  );
};
