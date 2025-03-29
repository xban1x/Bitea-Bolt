import clsx from "clsx";
import { forwardRef, useState } from "react";
import { DatePickerAria, useFocusWithin, useHover } from "react-aria";

import { CalendarIcon } from "@/assets/icons/general/Calendar";
import { DateTimeIcon } from "@/assets/icons/general/DateTime";
import { InlineIconButton } from "@/components/ui/buttons/InlineIconButton/InlineIconButton";
import { DateField } from "@/components/ui/inputs/DateTime/shared/DateField";
import { textInput, TextInputVariantProps } from "@/components/ui/inputs/TextInput/TextInputWrapper";
import { InputHeader } from "@/components/ui/inputs/shared/InputHeader";

interface DatePickerInputProps extends TextInputVariantProps {
  label: string;
  labelProps: DatePickerAria["labelProps"];
  groupProps: DatePickerAria["groupProps"];
  fieldProps: DatePickerAria["fieldProps"];
  buttonProps: DatePickerAria["buttonProps"];
  isDisabled?: boolean;
  isInvalid?: boolean;
  disableDropdown?: boolean;
  hideLabel?: boolean;
  isDateTime?: boolean;
}

export const DatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
  (
    {
      label,
      labelProps,
      groupProps,
      fieldProps,
      buttonProps,
      isDisabled,
      isInvalid,
      disableDropdown,
      variant,
      hideLabel,
      isDateTime,
    },
    ref,
  ) => {
    const { hoverProps, isHovered } = useHover({});
    const [isFocused, setIsFocused] = useState(false);
    const { focusWithinProps } = useFocusWithin({ onFocusWithinChange: setIsFocused });

    return (
      <div>
        <div {...labelProps}>
          <InputHeader label={label} isDisabled={isDisabled} hideLabels={variant === "inline" || hideLabel} />
        </div>
        <div
          ref={ref}
          className={textInput({
            variant,
            className: clsx("group flex items-center justify-between gap-2"),
          })}
          data-rac=""
          data-hovered={isHovered || undefined}
          data-disabled={isDisabled || undefined}
          data-invalid={isInvalid || undefined}
          data-focus-within={isFocused || undefined}
          {...groupProps}
          {...focusWithinProps}
          {...hoverProps}
        >
          <DateField {...fieldProps} label={label} isDisabled={isDisabled} isInvalid={isInvalid} />
          {!disableDropdown && (
            <InlineIconButton
              label=""
              {...buttonProps}
              icon={isDateTime ? DateTimeIcon : CalendarIcon}
              isDisabled={isDisabled}
            />
          )}
        </div>
      </div>
    );
  },
);
