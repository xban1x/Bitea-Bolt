import clsx from "clsx";
import React, { forwardRef, JSX, useState } from "react";
import { ComboBox, ComboBoxProps, Key, ListBox, ListLayout, Popover, Virtualizer } from "react-aria-components";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import useMeasure from "react-use-measure";

import { ArrowDropDownIcon } from "@/assets/icons/general/ArrowDropDown";
import { AutocompleteListItem } from "@/components/ui/inputs/Autocomplete/AutocompleteListItem";
import { TextInput } from "@/components/ui/inputs/TextInput/TextInput";
import { TextInputVariantProps } from "@/components/ui/inputs/TextInput/TextInputWrapper";
import { ControlProps } from "@/types/form";

const NEW_ITEM_ID = "new-item-id";
const NEW_ITEM_MIN_LENGTH = 3;

export interface AutocompleteItem<TKey extends Key = Key> {
  id: TKey;
  label: string;
  content?: string | React.ReactElement;
  isDisabled?: boolean;
}

type AutocompleteInnerProps<TKey extends Key = Key> = Omit<ComboBoxProps<AutocompleteItem<TKey>>, "children"> &
  TextInputVariantProps & {
    customRef?: React.ForwardedRef<HTMLDivElement>;
    label: string;
    placeholder?: string;
    items: AutocompleteItem<TKey>[];
    isDisabled?: boolean;
    error?: string;
    hideLabel?: boolean;
    hideDropdownIcon?: boolean;
    isLoading?: boolean;
    className?: string;
    containerClassName?: string;
    inputClassName?: string;
    ignoreTriggerWidth?: boolean;
    showNewItemOption?: boolean;
    customNewItemMinLength?: number;
    onCreateNewOption?: (value: string) => void;
    newItemRender?: (label: string) => React.ReactElement;
  };

const AutocompleteInner = <TKey extends Key = Key>({
  customRef,
  variant,
  label,
  placeholder,
  items,
  isDisabled,
  error,
  isLoading,
  hideLabel,
  hideDropdownIcon,
  className,
  containerClassName,
  inputClassName,
  ignoreTriggerWidth,
  showNewItemOption,
  customNewItemMinLength,
  onCreateNewOption,
  newItemRender,
  onSelectionChange,
  onInputChange,
  ...props
}: AutocompleteInnerProps<TKey>) => {
  const [triggerRef, { width }] = useMeasure();

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const showNewItem =
    showNewItemOption &&
    value.length >= (customNewItemMinLength || NEW_ITEM_MIN_LENGTH) &&
    !items.find((item) => item.label.toLowerCase() === value.trim().toLowerCase());

  const newItems: (AutocompleteItem & { isNewItem?: boolean })[] = [
    ...items,
    ...(showNewItem ? [{ id: NEW_ITEM_ID, label: value, isNewItem: true }] : []),
  ];

  const inputChangeHandler = (val: string) => {
    setValue(val);
    onInputChange?.(val);
  };

  const selectionChangeHandler = (id: Key | null) => {
    if (id === NEW_ITEM_ID) {
      onCreateNewOption?.(value);
    } else {
      onSelectionChange?.(id);
    }
  };

  return (
    <ComboBox
      {...props}
      aria-label={label}
      onInputChange={inputChangeHandler}
      onSelectionChange={selectionChangeHandler}
      allowsEmptyCollection={showNewItem}
      isDisabled={isDisabled}
      isInvalid={!!error}
      ref={customRef}
      className={clsx("w-full", containerClassName)}
      onOpenChange={setIsOpen}
    >
      <TextInput
        ref={triggerRef}
        variant={variant}
        action={
          !hideDropdownIcon
            ? {
                icon: ArrowDropDownIcon,
                altText: "",
                onClick: () => {},
                className: clsx(isOpen && "rotate-180"),
              }
            : undefined
        }
        label={label}
        placeholder={placeholder}
        isDisabled={isDisabled}
        error={error}
        className={className}
        inputClassName={inputClassName}
        isLoading={isLoading}
        hideLabel={hideLabel}
      />

      <Popover
        className={clsx(
          "my-4 overflow-auto outline-none [scrollbar-width:thin]",
          ignoreTriggerWidth && "w-full max-w-80",
        )}
        style={{ width: !ignoreTriggerWidth ? width : undefined }}
        offset={0}
      >
        <Virtualizer
          layout={ListLayout}
          layoutOptions={{
            estimatedRowHeight: 48,
          }}
        >
          <ListBox
            className="max-h-[300px] overflow-x-hidden overflow-y-scroll rounded-input-rounding border border-elevation-outline-1 shadow-5 outline-none"
            items={newItems}
          >
            {({ isNewItem, ...item }) => (
              <AutocompleteListItem key={item.id} item={item} isNewItem={isNewItem} newItemRender={newItemRender} />
            )}
          </ListBox>
        </Virtualizer>
      </Popover>
    </ComboBox>
  );
};

export type AutocompleteProps<TKey extends Key = Key> = Omit<AutocompleteInnerProps<TKey>, "customRef">;

export const Autocomplete = forwardRef(
  <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>, TKey extends Key = Key>(
    props: ControlProps<AutocompleteProps<TKey>, TFieldValues, TName>,
    ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    if ("formControl" in props && props.formControl) {
      return (
        <Controller
          control={props.formControl.control}
          name={props.formControl.name}
          render={({ field: { ref: controllerRef, disabled, ...field }, fieldState: { error } }) => (
            <AutocompleteInner
              {...props}
              selectedKey={field.value}
              onSelectionChange={field.onChange}
              isDisabled={disabled || props.isDisabled}
              customRef={controllerRef}
              error={props.error ?? error?.message}
            />
          )}
        />
      );
    }

    return <AutocompleteInner {...props} customRef={ref} />;
  },
) as <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>, TKey extends Key = Key>(
  props: ControlProps<AutocompleteProps<TKey>, TFieldValues, TName> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => JSX.Element;
