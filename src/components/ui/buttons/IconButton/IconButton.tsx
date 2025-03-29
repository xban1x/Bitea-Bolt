import { VariantProps, cva } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { Button as AriaButton, ButtonProps as AriaButtonProps } from "react-aria-components";

import { uiOutlineClass } from "@/components/ui/global/outline";

const iconButton = cva(uiOutlineClass, {
  variants: {
    iconSize: {
      small: "h-4 w-4",
      normal: "h-6 w-6",
    },
    variant: {
      default: [
        "text-interactive-icon-idle",
        "disabled:text-interactive-icon-disabled",
        "hover:text-interactive-icon-hover",
        "active:text-interactive-icon-pressed",
        "focus:outline-interactive-primary-focus",
        "disabled:cursor-not-allowed",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    iconSize: "normal",
  },
});

type IconButtonVariantProps = VariantProps<typeof iconButton>;

type IconButtonProps = IconButtonVariantProps &
  AriaButtonProps & {
    label?: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>> | React.ReactElement;
    link?: LinkProps & { target?: string };
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  };

export const IconButton = ({ label, icon: Icon, children, variant, link, iconSize, ...props }: IconButtonProps) => {
  const Component: any = link ? Link : AriaButton;
  return (
    <Component {...props} {...link} className={iconButton({ variant, className: props.className })} aria-label={label}>
      {typeof Icon === "function" ? <Icon className={iconButton({ iconSize })} /> : Icon}
    </Component>
  );
};
