import { forwardRef, useState, JSX } from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ViewIcon } from "@/assets/icons/general/View";
import { ViewOffIcon } from "@/assets/icons/general/ViewOff";
import { TextInput, TextInputProps } from "@/components/ui/inputs/TextInput/TextInput";
import { ControlProps } from "@/types/form";

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<
  ControlProps<TextInputProps, TFieldValues, TName>,
  "type" | "action" | "trailingIcon" | "unit"
>;

export const PasswordInput = forwardRef(
  <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
    props: Props<TFieldValues, TName>,
    ref?: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const { t } = useTranslation();
    const [isRevealed, setIsRevealed] = useState(false);

    return (
      <TextInput
        {...props}
        ref={ref}
        type={isRevealed ? "text" : "password"}
        action={{
          icon: isRevealed ? ViewIcon : ViewOffIcon,
          altText: t(isRevealed ? "ui.password.hide" : "ui.password.reveal"),
          onClick: () => setIsRevealed(!isRevealed),
        }}
      />
    );
  },
) as <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: ControlProps<TextInputProps, TFieldValues, TName> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => JSX.Element;
