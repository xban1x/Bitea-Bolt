import { VariantProps } from "class-variance-authority";
import { ToggleButton as AriaToggleButton, ToggleButtonProps as AriaToggleButtonProps } from "react-aria-components";

import { button } from "@/components/ui/buttons/Button/Button";
import { ButtonContent } from "@/components/ui/buttons/shared/ButtonContent";
import { TooltipEllipsis } from "@/components/ui/overlays/Tooltip/TooltipEllipsis";

type ButtonVariantProps = VariantProps<typeof button>;

type ToggleButtonVariantProps = Pick<ButtonVariantProps, "width" | "size">;

type ToggleButtonProps = ToggleButtonVariantProps &
  AriaToggleButtonProps & {
    children: string;
  };

export const ToggleButton = ({ width, size, children, ...props }: ToggleButtonProps) => {
  return (
    <TooltipEllipsis text={children}>
      {(onContentRef) => (
        <AriaToggleButton
          {...props}
          className={button({
            width,
            size,
            variant: "outlined",
            className: props.className,
          })}
        >
          <ButtonContent text={children} ref={onContentRef} />
        </AriaToggleButton>
      )}
    </TooltipEllipsis>
  );
};
