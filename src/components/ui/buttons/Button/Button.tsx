import { VariantProps, cva } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { Button as AriaButton, ButtonProps as AriaButtonProps } from "react-aria-components";

import { ButtonContent } from "@/components/ui/buttons/shared/ButtonContent";
import { TooltipEllipsis } from "@/components/ui/overlays/Tooltip/TooltipEllipsis";

export const button = cva(
  "flex items-center justify-center gap-icon-to-label-spacing rounded-button-rounding outline-2 outline-offset-2 disabled:cursor-not-allowed",
  {
    variants: {
      width: {
        s: "w-full max-w-4-5xs",
        m: "w-full max-w-3-5xs",
        l: "w-full max-w-3xs",
        fit: "w-full",
        auto: "w-auto",
      },
      size: {
        xs: "h-6 px-height-xs py-0",
        small: "h-8 p-height-s",
        default: "p-height-m",
        large: "p-height-l",
      },
      iconPosition: {
        left: "flex-row",
        right: "flex-row-reverse",
      },
      variant: {
        primary: [
          "bg-interactive-primary-idle",
          "text-interactive-primary-on",
          "hover:bg-interactive-primary-hover",
          "active:bg-interactive-primary-pressed",
          // "focus:outline-interactive-primary-focus",
          "disabled:bg-interactive-primary-disabled",
          "outline-none",
        ],
        secondary: [
          "bg-interactive-secondary-idle",
          "text-interactive-secondary-on",
          "hover:bg-interactive-secondary-hover",
          "active:bg-interactive-secondary-pressed",
          // "focus:outline-interactive-secondary-focus",
          "disabled:bg-interactive-secondary-disabled",
          "outline-none",
        ],
        outlined: [
          "border",
          "border-interactive-tertiary-on",
          "text-interactive-outlined-on",
          "hover:border-interactive-outlined-hover",
          "hover:text-interactive-outlined-hover",
          "active:border-interactive-outlined-pressed",
          "active:text-interactive-outlined-pressed",
          // "focused:outline-interactive-outlined-focus",
          "disabled:border-interactive-outlined-disabled",
          "disabled:text-interactive-outlined-disabled",
          // styles for ToggleButton - we include them here to avoid code duplication
          "data-[selected]:bg-interactive-outlined-toggled",
          "data-[selected]:text-interactive-outlined-on-toggled",
          "data-[selected]:data-[hovered]:bg-interactive-outlined-hover",
          "data-[selected]:data-[hovered]:text-interactive-outlined-on-toggled",
          "data-[selected]:data-[disabled]:bg-interactive-outlined-disabled",
          "outline-none",
        ],
        "text-only": [
          "text-interactive-primary-idle",
          "disabled:border-interactive-outlined-disabled",
          "disabled:text-interactive-outlined-disabled",
        ],
        danger: [
          "bg-elevation-red-surface-2",
          "text-info-error",
          "disabled:border-interactive-outlined-disabled",
          "disabled:text-interactive-outlined-disabled",
          "outline-none",
        ],
      },
    },
    defaultVariants: {
      width: "fit",
      size: "default",
      variant: "primary",
      iconPosition: "left",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof button>;

type ButtonProps = ButtonVariantProps &
  AriaButtonProps & {
    children: string;
    isLoading?: boolean;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    link?: LinkProps & { target?: string };
    hideText?: boolean;
    noDisableWhenLoading?: boolean;
    isDisabled?: boolean;
    iconClassName?: string;
  };

export const Button = ({
  width,
  size,
  variant,
  icon: Icon,
  iconPosition,
  children,
  isLoading,
  className,
  link,
  iconClassName,
  hideText,
  noDisableWhenLoading,
  isDisabled,
  ...props
}: ButtonProps) => {
  const Component: any = link ? Link : AriaButton;

  return (
    <TooltipEllipsis text={children}>
      {(onContentRef) => (
        <Component
          {...props}
          {...link}
          isDisabled={isDisabled || (isLoading && !noDisableWhenLoading)}
          className={button({ width, size, variant, iconPosition, className })}
          disabled={isDisabled}
        >
          <ButtonContent
            iconClassName={iconClassName}
            isLoading={isLoading}
            icon={Icon}
            text={children}
            ref={onContentRef}
            hideText={hideText}
            size={size}
          />
        </Component>
      )}
    </TooltipEllipsis>
  );
};
