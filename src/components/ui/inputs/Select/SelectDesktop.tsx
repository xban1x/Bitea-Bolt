import clsx from "clsx";
import { useState } from "react";
import { Popover as AriaPopover, Dialog, DialogTrigger, Key } from "react-aria-components";
import useMeasure from "react-use-measure";

import { ErrorMessage } from "@/components/ui/inputs/shared/ErrorMessage";
import { InputHeader } from "@/components/ui/inputs/shared/InputHeader";

import { SelectInnerProps } from "./Select";
import { SelectButton } from "./SelectButton";
import { SelectListBox } from "./SelectListBox";

export const SelectDesktop = <TKey extends Key = Key>({
  customRef,
  error,
  customTrigger,
  ignoreTriggerWidth,
  hideLabel,
  isDisabled,
  variant,
  className,
  containerClassName,
  ...props
}: SelectInnerProps<TKey>) => {
  const { label } = props;

  const isMultiple = props.selectionMode === "multiple";

  const [wrapperRef, { width }] = useMeasure();

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
    <div ref={wrapperRef} className={clsx("w-full", containerClassName)}>
      <InputHeader label={label} isDisabled={isDisabled} hideLabels={variant === "inline" || hideLabel} />
      <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        {customTrigger ?? (
          <SelectButton
            {...props}
            ref={customRef}
            variant={variant}
            error={error}
            isDisabled={isDisabled}
            isOpen={isOpen}
            removeItem={removeItem}
          />
        )}

        <ErrorMessage error={error} isDisabled={isDisabled} />

        <AriaPopover
          className={clsx("my-4 outline-none", (customTrigger || ignoreTriggerWidth) && "w-full max-w-80")}
          style={{ width: !customTrigger && !ignoreTriggerWidth ? width : undefined }}
          offset={0}
        >
          <Dialog className="outline-none">
            <div className="max-h-[300px] overflow-x-hidden overflow-y-scroll rounded-input-rounding border border-elevation-outline-1 shadow-5 outline-none">
              <SelectListBox {...listboxProps} />
            </div>
          </Dialog>
        </AriaPopover>
      </DialogTrigger>
    </div>
  );
};
