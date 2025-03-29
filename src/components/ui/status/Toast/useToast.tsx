import { useCallback } from "react";
import { ToastPosition, toast as showToast } from "react-toastify";

import { StatusParams } from "@/components/ui/status/shared/status";

import { Toast } from "./Toast";

type IShowToast = StatusParams & {
  position?: ToastPosition;
};

export const useToast = () => {
  const successToast = useCallback((params: IShowToast) => {
    showToast.success(<Toast variant="success" {...params} />, {
      position: params.position,
    });
  }, []);

  const errorToast = useCallback((params: IShowToast) => {
    showToast.error(<Toast variant="error" {...params} />, {
      position: params.position,
    });
  }, []);

  const warningToast = useCallback((params: IShowToast) => {
    showToast.warning(<Toast variant="warning" {...params} />, {
      position: params.position,
    });
  }, []);

  const neutralToast = useCallback((params: IShowToast) => {
    showToast.info(<Toast variant="neutral" {...params} />, {
      position: params.position,
    });
  }, []);

  return {
    successToast,
    errorToast,
    warningToast,
    neutralToast,
  };
};
