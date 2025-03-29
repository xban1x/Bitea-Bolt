import React from 'react';
import { useDialog } from '@react-aria/dialog';
import { useOverlay, useModal, DismissButton } from '@react-aria/overlays';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { FocusScope } from '@react-aria/focus';

interface DialogProps {
  title?: string;
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog({ title, isOpen, onClose, children }: DialogProps) {
  const state = useOverlayTriggerState({
    isOpen,
    onOpenChange: (isOpen) => !isOpen && onClose(),
  });

  const ref = React.useRef<HTMLDivElement>(null);
  const { dialogProps, titleProps } = useDialog({}, ref);
  const { overlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose,
      isDismissable: true,
    },
    ref
  );
  const { modalProps } = useModal();

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="presentation"
    >
      <div className="min-h-screen px-4 text-center">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />

        {/* Dialog */}
        <FocusScope contain restoreFocus autoFocus>
          <div
            {...overlayProps}
            {...dialogProps}
            {...modalProps}
            ref={ref}
            className="inline-block w-full max-w-md my-8 p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
          >
            <DismissButton onDismiss={onClose} />
            {title && (
              <h2 {...titleProps} className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {children}
            <DismissButton onDismiss={onClose} />
          </div>
        </FocusScope>
      </div>
    </div>
  );
}