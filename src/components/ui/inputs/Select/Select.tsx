import React, { forwardRef, JSX } from "react";
import { Key } from "react-aria-components";
import { Controller, FieldPath, FieldValues } from "react-hook-form";

import { SelectButtonProps } from "@/components/ui/inputs/Select/SelectButton";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { ControlProps } from "@/types/form";

import { SelectDesktop } from "./SelectDesktop";
import { SelectMobile } from "./SelectMobile";

export interface SelectItem<TKey extends Key = Key> {
  id: TKey;
  label: string;
  content?: string | React.ReactElement;
  isDisabled?: boolean;
}

export interface SingleSelectProps<TKey extends Key = Key> {
  value?: TKey | undefined;
  onChange?: (value: TKey) => void;
  selectionMode?: "single";
  showSelectionBar?: never;
  showAllOption?: never;
  showSelectionContent?: boolean;
}

export interface MultiSelectProps<TKey extends Key = Key> {
  value?: TKey[];
  onChange?: (value: TKey[]) => void;
  selectionMode: "multiple";
  showSelectionBar?: boolean;
  showAllOption?: boolean;
  showSelectionContent?: never;
}

export type GroupedSelectProps<TKey extends Key = Key> = MultiSelectProps<TKey> | SingleSelectProps<TKey>;

export type SelectInnerProps<TKey extends Key = Key> = GroupedSelectProps<TKey> &
  SelectButtonProps & {
    customRef?: React.ForwardedRef<HTMLButtonElement>;
    label: string;
    placeholder: string;
    items: SelectItem<TKey>[];
    showSelectionBar?: boolean;
    showAllOption?: boolean;
    error?: string;
    isDisabled?: boolean;
    hideLabel?: boolean;
    hideDropdownIcon?: boolean;
    showSearch?: boolean;
    customTrigger?: React.ReactElement;
    ignoreTriggerWidth?: boolean;
    containerClassName?: string;
  };

const SelectInner = <TKey extends Key = Key>({ selectionMode = "single", ...dProps }: SelectInnerProps<TKey>) => {
  const props = {
    selectionMode,
    ...dProps,
  } as SelectInnerProps<TKey>;

  const isDesktop = useBreakpoint("t");

  if (isDesktop) {
    return <SelectDesktop {...props} />;
  }

  return <SelectMobile {...props} />;
};

export type SelectProps<TKey extends Key = Key> = Omit<SelectInnerProps<TKey>, "customRef">;

export const Select = forwardRef(
  <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>, TKey extends Key = Key>(
    props: ControlProps<SelectProps<TKey>, TFieldValues, TName>,
    ref?: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    if ("formControl" in props && props.formControl) {
      return (
        <Controller
          control={props.formControl.control}
          name={props.formControl.name}
          render={({ field, fieldState: { error } }) => (
            <SelectInner
              {...(props as SelectInnerProps<TKey>)}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isDisabled={field.disabled || props.isDisabled}
              customRef={field.ref}
              error={props.error ?? error?.message}
            />
          )}
        />
      );
    }

    return <SelectInner {...(props as SelectInnerProps<TKey>)} customRef={ref} />;
  },
) as <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>, TKey extends Key = Key>(
  props: ControlProps<SelectProps<TKey>, TFieldValues, TName> & { ref?: React.ForwardedRef<HTMLButtonElement> },
) => JSX.Element;
