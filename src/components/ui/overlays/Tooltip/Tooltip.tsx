import { PropsWithChildren } from "react";
import {
  OverlayArrow as AriaOverlayArrow,
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  TooltipProps as AriaTooltipProps,
} from "react-aria-components";

import { PointerHorizontalIcon } from "@/assets/icons/ui/PointerHorizontal";
import { PointerVerticalIcon } from "@/assets/icons/ui/PointerVertical";
import { Typography } from "@/components/ui/text/Typography/Typography";

type TooltipProps = PropsWithChildren &
  AriaTooltipProps & {
    text: string | React.ReactNode;
  };

export const Tooltip = ({ children, text, ...tooltipProps }: TooltipProps) => {
  return (
    <AriaTooltipTrigger delay={0} closeDelay={0}>
      {children}
      <AriaTooltip
        className="group max-w-64 rounded-sm bg-interactive-secondary-idle px-3 py-2 shadow-2"
        {...tooltipProps}
        offset={13}
      >
        <AriaOverlayArrow>
          <PointerHorizontalIcon className="h-2-5 w-5 text-interactive-secondary-idle group-data-[placement=left]:hidden group-data-[placement=right]:hidden group-data-[placement=top]:rotate-180" />
          <PointerVerticalIcon className="h-5 w-2-5 text-interactive-secondary-idle group-data-[placement=bottom]:hidden group-data-[placement=top]:hidden group-data-[placement=left]:rotate-180" />
        </AriaOverlayArrow>
        <Typography size="label-2" className="text-text-inverted-tertiary">
          {text}
        </Typography>
      </AriaTooltip>
    </AriaTooltipTrigger>
  );
};
