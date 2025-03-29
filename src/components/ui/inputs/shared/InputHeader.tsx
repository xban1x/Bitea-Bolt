import clsx from "clsx";
import { Button as AriaButton, Label as AriaLabel } from "react-aria-components";

import { InfoIcon } from "@/assets/icons/general/Info";
import { Tooltip } from "@/components/ui/overlays/Tooltip/Tooltip";
import { Typography } from "@/components/ui/text/Typography/Typography";

export interface InputHeaderProps {
  label: string;
  tooltipText?: string;
  helperText?: string;
  required?: boolean;
  rightContent?: React.ReactNode;
  hideLabels?: boolean;
  isDisabled?: boolean;
}

export const InputHeader = ({
  label,
  tooltipText,
  helperText,
  required,
  rightContent,
  hideLabels,
  isDisabled,
}: InputHeaderProps) => {
  return (
    <div className={clsx(hideLabels ? "sr-only" : "mb-1")}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-start gap-1">
            <AriaLabel className="flex items-start gap-1">
              <Typography
                as="span"
                size="input-label"
                variant="prominent-1"
                className={clsx(isDisabled ? "text-interactive-text-disabled" : "text-text-default-primary")}
              >
                {label}
              </Typography>

              {required && (
                <Typography
                  as="span"
                  size="input-label"
                  variant="prominent-1"
                  className={clsx(isDisabled ? "text-interactive-text-disabled" : "text-info-error")}
                >
                  *
                </Typography>
              )}
            </AriaLabel>

            {tooltipText && (
              <Tooltip text={tooltipText}>
                {/* needs to be a button; tooltips are not allowed on unfocusable elements */}
                <AriaButton>
                  <InfoIcon
                    className={clsx(
                      "size-6",
                      isDisabled ? "text-interactive-icon-disabled" : "text-interactive-icon-idle",
                    )}
                    tabIndex={0}
                  />
                </AriaButton>
              </Tooltip>
            )}
          </div>
        </div>
        {rightContent}
      </div>

      {helperText && (
        <Typography
          slot="description"
          size="input-helper"
          className={clsx(isDisabled ? "text-interactive-secondary-disabled" : "text-text-default-secondary")}
        >
          {helperText}
        </Typography>
      )}
    </div>
  );
};
