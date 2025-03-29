import clsx from "clsx";
import { forwardRef, useMemo, JSX } from "react";
import { Button as AriaButton, ButtonProps as AriaButtonProps, Key } from "react-aria-components";

import { ArrowDropDownIcon } from "@/assets/icons/general/ArrowDropDown";
import { Typography } from "@/components/ui//text/Typography/Typography";
import { Tag } from "@/components/ui/Tag/Tag";
import { GroupedSelectProps, SelectProps } from "@/components/ui/inputs/Select/Select";
import { textInput, TextInputVariantProps } from "@/components/ui/inputs/TextInput/TextInputWrapper";

export type SelectButtonProps = TextInputVariantProps &
  Pick<AriaButtonProps, "onBlur"> & {
    className?: string;
  };

type SelectButtonInnerProps<TKey extends Key = Key> = SelectButtonProps & {
  isOpen?: boolean;
  removeItem: (item: TKey) => void;
} & GroupedSelectProps<TKey> &
  Pick<SelectProps<TKey>, "items" | "placeholder" | "hideDropdownIcon" | "error" | "isDisabled">;

export const SelectButton = forwardRef(
  <TKey extends Key = Key>(
    {
      variant,
      onBlur,
      className,
      isOpen,
      removeItem,
      placeholder,
      hideDropdownIcon,
      error,
      isDisabled,
      showSelectionContent,
      ...props
    }: SelectButtonInnerProps<TKey>,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const isMultiple = props.selectionMode === "multiple";

    const selectedItems = useMemo(
      () => props.items.filter((item) => (isMultiple ? props.value?.includes(item.id) : item.id === props.value)),
      [props.items, props.value, isMultiple],
    );

    const isEmpty = selectedItems.length === 0;

    return (
      <AriaButton
        ref={ref}
        isDisabled={isDisabled}
        className={textInput({
          variant,
          className: clsx(
            "flex items-center justify-between gap-2",
            isEmpty ? "!text-text-default-tertiary" : "!text-text-default-primary",
            !!error && "border border-info-error-outline",
            className,
          ),
        })}
        onBlur={onBlur}
      >
        {(isEmpty || !isMultiple) && (
          <Typography size="input-label" className="truncate">
            {isEmpty && placeholder}
            {!isEmpty && (showSelectionContent ? selectedItems[0].content : selectedItems[0].label)}
          </Typography>
        )}
        {!isEmpty && isMultiple && (
          <div className="flex w-full min-w-0 flex-wrap gap-1">
            {selectedItems.map((item) => (
              <Tag key={item.id} dismissable onDismiss={() => removeItem(item.id)}>
                {item.label}
              </Tag>
            ))}
          </div>
        )}
        {!hideDropdownIcon && (
          <ArrowDropDownIcon
            className={clsx(
              "size-6 shrink-0",
              isOpen && "rotate-180",
              isDisabled ? "text-interactive-icon-disabled" : "text-interactive-icon-idle",
            )}
            aria-hidden="true"
          />
        )}
      </AriaButton>
    );
  },
) as <TKey extends Key = Key>(
  props: SelectButtonInnerProps<TKey> & { ref?: React.ForwardedRef<HTMLButtonElement> },
) => JSX.Element;
