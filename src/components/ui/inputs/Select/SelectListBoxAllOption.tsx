import { Key } from "react-aria-components";
import { useTranslation } from "react-i18next";

import { Checkbox } from "@/components/ui/inputs/Checkbox/Checkbox";

import { SelectInnerProps, MultiSelectProps } from "./Select";

type Props<TKey extends Key = Key> = Pick<MultiSelectProps<TKey>, "onChange" | "value"> &
  Pick<SelectInnerProps<TKey>, "items">;

export const SelectListBoxAllOption = <TKey extends Key = Key>({ onChange, value = [], items }: Props<TKey>) => {
  const { t } = useTranslation();

  return (
    <div className="border-b border-elevation-outline-1 px-4 py-2">
      <Checkbox
        onChange={(isChecked) => {
          if (isChecked) {
            onChange?.(items.map((item) => item.id));
            return;
          }

          onChange?.([]);
        }}
        isSelected={value.length === items.length}
        isIndeterminate={value.length > 0 && value.length < items.length}
      >
        {t("ui.select.allOption")}
      </Checkbox>
    </div>
  );
};
