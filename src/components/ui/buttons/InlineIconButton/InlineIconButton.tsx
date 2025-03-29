import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { Button as AriaButton, ButtonProps as AriaButtonProps } from "react-aria-components";

import { uiOutlineClass } from "@/components/ui/global/outline";

export type InlineIconButtonProps = AriaButtonProps & {
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>> | React.ReactElement;
  link?: LinkProps & { target?: string };
};

export const InlineIconButton = ({ label, icon: Icon, children, link, ...props }: InlineIconButtonProps) => {
  const Component: any = link ? Link : AriaButton;

  return (
    <Component
      {...props}
      {...link}
      isDisabled={props.isDisabled}
      className={clsx(
        "inline-flex rounded-button-rounding text-interactive-icon-idle",
        "active:text-interactive-icon-pressed",
        "hover:text-interactive-icon-hover",
        "focus-visible:outline-interactive-icon-focus",
        "disabled:text-interactive-icon-disabled",
        uiOutlineClass,
        props.className,
      )}
      aria-label={label}
    >
      {typeof Icon === "function" ? <Icon className="size-6" /> : Icon}
    </Component>
  );
};
