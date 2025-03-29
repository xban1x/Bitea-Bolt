import clsx from "clsx";
import { Key } from "react-aria-components";
import { useTranslation } from "react-i18next";

import { TextButton } from "@/components/ui/buttons/TextButton/TextButton";

import { SelectInnerProps, MultiSelectProps } from "./Select";

type SelectListBoxSelectionBarProps<TKey extends Key = Key> = Pick<MultiSelectProps<TKey>, "onChange"> &
  Pick<SelectInnerProps<TKey>, "items"> & {
    className?: string;
  };

export const SelectListBoxSelectionBar = <TKey extends Key = Key>({
  className,
  onChange,
  items,
}: SelectListBoxSelectionBarProps<TKey>) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx("flex items-center justify-between border-b border-elevation-outline-1 px-4 py-1-5", className)}
    >
      <TextButton
        type="button"
        color="primary"
        onPress={() => {
          onChange?.(items.map((item) => item.id));
        }}
      >
        {t("ui.select.selectAll")}
      </TextButton>
      <TextButton
        type="button"
        color="secondary"
        onPress={() => {
          onChange?.([]);
        }}
      >
        {t("ui.select.clearSelection")}
      </TextButton>
    </div>
  );
};
