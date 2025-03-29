import clsx from "clsx";
import { forwardRef, useState } from "react";
import { DateFieldAria, useFocusWithin, useHover } from "react-aria";
import { TimeFieldState } from "react-stately";

import { ClockIcon } from "@/assets/icons/general/Clock";
import { InlineIconButton } from "@/components/ui/buttons/InlineIconButton/InlineIconButton";
import { TimeField } from "@/components/ui/inputs/DateTime/shared/TimeField";
import { textInput, TextInputVariantProps } from "@/components/ui/inputs/TextInput/TextInputWrapper";
import { InputHeader } from "@/components/ui/inputs/shared/InputHeader";

interface DatePickerInputProps extends TextInputVariantProps {
  label: string;
  labelProps: DateFieldAria["labelProps"];
  fieldProps: DateFieldAria["fieldProps"];
  state: TimeFieldState;
  isDisabled?: boolean;
  isInvalid?: boolean;
  disableDropdown?: boolean;
  hideLabel?: boolean;
  onPress: () => void;
}

export const TimePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
  (
    { label, labelProps, fieldProps, state, isDisabled, isInvalid, disableDropdown, variant, hideLabel, onPress },
    ref,
  ) => {
    const { hoverProps, isHovered } = useHover({});
    const [isFocused, setIsFocused] = useState(false);
    const { focusWithinProps } = useFocusWithin({ onFocusWithinChange: setIsFocused });

    return (
      <div className="flex flex-col">
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
          {...focusWithinProps}
          {...hoverProps}
        >
          <TimeField fieldProps={fieldProps} state={state} isDisabled={isDisabled} />
          {!disableDropdown && <InlineIconButton label="" onPress={onPress} icon={ClockIcon} isDisabled={isDisabled} />}
        </div>
      </div>
    );
  },
);
