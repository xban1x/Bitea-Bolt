import clsx from "clsx";

import { Typography } from "@/components/ui/text/Typography/Typography";

interface ErrorMessageProps {
  error?: string | React.ReactElement;
  isDisabled?: boolean;
  className?: string;
}

export const ErrorMessage = ({ error, isDisabled, className }: ErrorMessageProps) => {
  if (!error || isDisabled) {
    return null;
  }

  return (
    <Typography className={clsx("mt-1-5 text-info-error", className)} size="label-3">
      {error}
    </Typography>
  );
};
