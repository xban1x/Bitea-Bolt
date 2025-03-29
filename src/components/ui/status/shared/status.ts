import { cva } from "class-variance-authority";

export const statusText = cva("", {
  variants: {
    variant: {
      neutral: "text-interactive-icon-idle",
      success: "text-info-success",
      warning: "text-info-warning",
      error: "text-info-error",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export const statusSeparator = cva("h-px flex-shrink-0 self-stretch t:h-auto t:w-px", {
  variants: {
    variant: {
      neutral: "bg-elevation-outline-1",
      success: "bg-info-success-outline",
      warning: "bg-info-warning-outline",
      error: "bg-info-error-outline",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export type StatusAction = {
  text: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onPress: () => void;
};

export type StatusParams = {
  text: string;
  isLoading?: boolean;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  actions?: StatusAction[];
};
