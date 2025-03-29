import { clsx } from "clsx";
import { forwardRef } from "react";

import { Loader } from "@/components/ui/status/Loader/Loader";
import { Typography } from "@/components/ui/text/Typography/Typography";

interface ButtonContentProps {
  text: string;
  isLoading?: boolean;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  hideText?: boolean;
  size?: "xs" | "small" | "default" | "large" | null;
}

export const ButtonContent = forwardRef<HTMLHeadingElement, ButtonContentProps>(
  ({ text, isLoading, icon: Icon, iconClassName, hideText, size }, ref) => {
    let iconOrLoader = null;
    if (isLoading) {
      iconOrLoader = <Loader className="flex-shrink-0" color="light" />;
    } else if (Icon) {
      iconOrLoader = <Icon className={clsx("flex-shrink-0", size === "xs" ? "h-4 w-4" : "h-6 w-6", iconClassName)} />;
    }
    let typographySize = "button-3";
    if (size === "default") {
      typographySize = "button-2";
    } else if (size === "large") {
      typographySize = "button-1";
    }

    return (
      <>
        {iconOrLoader}
        <Typography
          size={typographySize as any}
          variant="default"
          className={`hyphens-auto t:truncate ${hideText ? "sr-only" : ""}`}
          ref={ref}
        >
          {text}
        </Typography>
      </>
    );
  },
);
