import React, { useRef } from 'react';
import { useOverlay, useModal, DismissButton } from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { overlayProps, underlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      isDismissable: true
    },
    ref
  );
  
  const { modalProps } = useModal();
  const { dialogProps, titleProps } = useDialog({}, ref);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        {...underlayProps}
        className="fixed inset-0 bg-black/50 transition-opacity"
      />

      {/* Drawer */}
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-xl transform transition-transform duration-200 ease-in-out"
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 {...titleProps} className="text-lg font-semibold">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </div>
          <DismissButton onDismiss={onClose} />
        </div>
      </FocusScope>
    </div>
  );
}