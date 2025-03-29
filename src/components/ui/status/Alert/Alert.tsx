import { cva, VariantProps } from "class-variance-authority";

import { TextButton } from "@/components/ui/buttons/TextButton/TextButton";
import { Loader } from "@/components/ui/status/Loader/Loader";
import { StatusParams, statusSeparator, statusText } from "@/components/ui/status/shared/status";
import { Typography } from "@/components/ui/text/Typography/Typography";

export const alert = cva("min-h-0 overflow-hidden rounded-sm border bg-elevation-background p-0", {
  variants: {
    variant: {
      neutral: "border-elevation-outline-1 bg-elevation-surface-1",
      success: "border-info-success-outline bg-elevation-green-surface-1",
      warning: "border-info-warning-outline bg-elevation-yellow-surface-1",
      error: "border-info-error-outline bg-elevation-red-surface-1",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

type AlertVariantProps = VariantProps<typeof alert>;

type AlertProps = AlertVariantProps &
  StatusParams & {
    className?: string;
  };

export const Alert = ({ variant, text, isLoading = false, actions = [], icon: Icon, className }: AlertProps) => {
  return (
    <div className={alert({ variant, className })}>
      <div className="flex w-auto flex-col items-center t:flex-row">
        <div className="flex w-full items-start gap-3 px-4 py-3-5">
          {isLoading && <Loader size="default" className="flex-shrink-0" />}
          {!isLoading && Icon && <Icon className={statusText({ variant, className: "h-6 w-6 flex-shrink-0" })} />}
          <Typography size="label-2" className={statusText({ variant })}>
            {text}
          </Typography>
        </div>
        {actions.length > 0 && (
          <>
            <div className={statusSeparator({ variant })} />
            <div className="flex w-full flex-shrink-0 flex-wrap items-center justify-end gap-4 px-4 py-3 t:w-auto t:justify-center">
              {actions.map(({ text: buttonText, icon, onPress }) => (
                <TextButton key={buttonText} onPress={onPress} color="secondary" icon={icon}>
                  {buttonText}
                </TextButton>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
