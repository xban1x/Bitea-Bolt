import clsx from "clsx";
import { ListBoxItem } from "react-aria-components";
import { useTranslation } from "react-i18next";

import { AutocompleteItem } from "@/components/ui/inputs/Autocomplete/Autocomplete";

interface Props {
  item: AutocompleteItem;
  isNewItem?: boolean;
  newItemRender?: (label: string) => React.ReactElement;
}

export const AutocompleteListItem = ({ item, isNewItem, newItemRender }: Props) => {
  const { t } = useTranslation();

  const getContent = () => {
    if (isNewItem) {
      return newItemRender?.(item.label) ?? `${t("ui.autocomplete.createNewBtn")} '${item.label}'`;
    }

    return item.content ?? item.label;
  };

  return (
    <ListBoxItem
      id={item.id}
      className={clsx(
        "text-default-label-2 font-labels-default",
        "group flex cursor-pointer items-center px-4 py-2",
        "border-b border-b-elevation-outline-1 outline-none last:border-b-0",
        "bg-elevation-background",
        "hover:text-interactive-text-hover",
        "focus-visible:bg-interactive-primary-focus focus-visible:text-interactive-text-on-inverted",
        "selected:bg-interactive-primary-idle selected:text-interactive-text-on-inverted",
        "disabled:cursor-default disabled:text-interactive-text-disabled",
        "text-interactive-text-on-bg",
      )}
      textValue={item.label}
      isDisabled={item.isDisabled}
    >
      {getContent()}
    </ListBoxItem>
  );
};
