import { VariantProps, cva } from "class-variance-authority";
import { ToastContainer as ToastifyToastContainer, TypeOptions as ToastifyVariants } from "react-toastify";

import { TextButton } from "@/components/ui/buttons/TextButton/TextButton";
import { Loader } from "@/components/ui/status/Loader/Loader";
import { StatusParams, statusSeparator, statusText } from "@/components/ui/status/shared/status";
import { Typography } from "@/components/ui/text/Typography/Typography";

const toastContainer = cva("m-8 w-auto p-0", {
  variants: {
    position: {
      "bottom-right": "bottom-0 right-0",
      "bottom-left": "bottom-0 left-0",
      "top-right": "right-0 top-0",
      "top-left": "left-0 top-0",
      "bottom-center": "bottom-0",
      "top-center": "top-0",
    },
  },
});

const toastWrapper = cva("min-h-0 max-w-toast overflow-hidden rounded-sm border bg-elevation-background p-0 shadow-4", {
  variants: {
    variant: {
      neutral: "border-elevation-outline-1 bg-elevation-surface-1",
      success: "border-info-success-outline bg-elevation-green-surface-1",
      warning: "border-info-warning-outline bg-elevation-yellow-surface-1",
      error: "border-info-error-outline bg-elevation-red-surface-1",
    },
    position: {
      "bottom-right": "mt-8",
      "bottom-left": "mt-8",
      "bottom-center": "mt-8",
      "top-right": "mb-8",
      "top-left": "mb-8",
      "top-center": "mb-8",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

type ToastVariantProps = VariantProps<typeof toastWrapper>;

export type ToastPosition = ToastVariantProps["position"];

type ToastProps = ToastVariantProps & StatusParams;

export const Toast = ({ variant, text, isLoading = false, actions = [], icon: Icon }: ToastProps) => {
  return (
    <div className="flex w-auto flex-col items-center t:flex-row">
      <div className="flex items-start gap-3 px-4 py-3">
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
            {actions.map(({ text: buttonText, onPress }) => (
              <TextButton key={buttonText} onPress={onPress} color="secondary">
                {buttonText}
              </TextButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const toastifyVariantToVariant: Record<ToastifyVariants, ToastVariantProps["variant"]> = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "neutral",
  default: "neutral",
};

export const ToastContainer = () => {
  return (
    <ToastifyToastContainer
      className={(params) => {
        return toastContainer({
          position: params?.position,
          className: params?.defaultClassName,
        });
      }}
      bodyClassName="p-0"
      toastClassName={(params) => {
        const variantParam: ToastifyVariants = params?.type || "default";
        const variant = toastifyVariantToVariant[variantParam];
        return toastWrapper({
          variant,
          position: params?.position,
          className: params?.defaultClassName,
        });
      }}
      autoClose={2500}
      icon={false}
      closeButton={false}
      hideProgressBar
    />
  );
};
