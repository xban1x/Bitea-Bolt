import { useState } from "react";
import { Key } from "react-aria-components";
import { useTranslation } from "react-i18next";

import { CloseIcon } from "@/assets/icons/general/Close";
import { ErrorMessage } from "@/components/ui/inputs/shared/ErrorMessage";
import { InputHeader } from "@/components/ui/inputs/shared/InputHeader";
import { Drawer } from "@/components/ui/overlays/Drawer/Drawer";

import { SelectInnerProps } from "./Select";
import { SelectButton } from "./SelectButton";
import { SelectListBox } from "./SelectListBox";

export const SelectMobile = <TKey extends Key = Key>({
  customRef,
  error,
  variant,
  isDisabled,
  className,
  hideLabel,
  ...props
}: SelectInnerProps<TKey>) => {
  const { label } = props;
  const { t } = useTranslation();

  const isMultiple = props.selectionMode === "multiple";

  const [isOpen, setIsOpen] = useState(false);

  const onChange: SelectInnerProps<TKey>["onChange"] = (val: typeof props.value) => {
    if (isMultiple) {
      props.onChange?.(val as TKey[]);
    } else {
      props.onChange?.(val as TKey);
      setIsOpen(false);
    }
  };

  const removeItem = (id: TKey) => {
    if (isMultiple && props.value) {
      props.onChange?.(props.value.filter((val) => val !== id));
    }
  };

  const listboxProps = {
    ...props,
    onChange,
  } as SelectInnerProps<TKey>;

  return (
    <div>
      <InputHeader label={label} isDisabled={isDisabled} hideLabels={variant === "inline" || hideLabel} />
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <SelectButton
            {...props}
            ref={customRef}
            variant={variant}
            error={error}
            isDisabled={isDisabled}
            isOpen={isOpen}
            removeItem={removeItem}
          />
        }
      >
        {(close) => (
          <div className="flex h-screen flex-col">
            <SelectListBox
              header={
                <div className="px-4 pt-3">
                  <InputHeader
                    label={label}
                    rightContent={
                      <button type="button" onClick={close} aria-label={t("ui.select.closeAlt")} className="shrink-0">
                        <CloseIcon className="size-6 text-interactive-icon-idle" />
                      </button>
                    }
                  />
                </div>
              }
              {...listboxProps}
            />
          </div>
        )}
      </Drawer>
      <ErrorMessage error={error} isDisabled={isDisabled} />
    </div>
  );
};
