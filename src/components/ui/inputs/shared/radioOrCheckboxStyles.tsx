import { VariantProps, cva } from "class-variance-authority";
import { PropsWithChildren } from "react";

import { typography } from "@/components/ui/text/Typography/Typography";

export const radioOrCheckbox = cva("flex items-center justify-center border-2", {
  variants: {
    variant: {
      default: [
        "border-interactive-icon-idle",
        "group-disabled:border-interactive-icon-disabled",
        "group-hover:border-interactive-icon-hover",
        "group-pressed:border-interactive-icon-pressed",
        "group-selected:border-interactive-icon-toggled",
        "group-selected:bg-interactive-icon-toggled",
        "group-selected:group-hover:bg-interactive-icon-hover",
        "group-selected:group-hover:border-interactive-icon-hover",
        "group-selected:group-pressed:bg-interactive-icon-pressed",
        "group-selected:group-pressed:border-interactive-icon-pressed",
        "group-indeterminate:border-interactive-icon-toggled",
        "group-indeterminate:bg-interactive-icon-toggled",
        "group-indeterminate:group-hover:bg-interactive-icon-hover",
        "group-indeterminate:group-hover:border-interactive-icon-hover",
        "group-indeterminate:group-pressed:bg-interactive-icon-pressed",
        "group-indeterminate:group-pressed:border-interactive-icon-pressed",
        "group-invalid:border-info-error-outline",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type RadioOrCheckboxVariantProps = VariantProps<typeof radioOrCheckbox>;

export const radioOrCheckboxIndicatorClass = "group flex items-center gap-2";

export const RadioOrCheckboxLabel = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={typography({
        size: "label-1",
        className: "text-interactive-text-on-bg group-disabled:text-interactive-text-disabled",
      })}
    >
      {children}
    </div>
  );
};
