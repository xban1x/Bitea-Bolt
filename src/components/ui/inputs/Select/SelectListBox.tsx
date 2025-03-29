import { useState } from "react";
import { ListBox as AriaListBox, Key, ListLayout, Virtualizer } from "react-aria-components";
import { useTranslation } from "react-i18next";

import { CloseIcon } from "@/assets/icons/general/Close";
import { SelectInnerProps } from "@/components/ui/inputs/Select/Select";
import { TextInput } from "@/components/ui/inputs/TextInput/TextInput";

import { SelectListBoxAllOption } from "./SelectListBoxAllOption";
import { SelectListBoxSelectionBar } from "./SelectListBoxSelectionBar";
import { SelectListItem } from "./SelectListItem";

type SelectListBoxProps<TKey extends Key = Key> = SelectInnerProps<TKey> & {
  header?: React.ReactNode;
};

export const SelectListBox = <TKey extends Key = Key>({
  selectionMode,
  value,
  onChange,
  items,
  showSelectionBar,
  showAllOption,
  showSearch,
  header,
}: SelectListBoxProps<TKey>) => {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const isMultiple = selectionMode === "multiple";

  const filteredItems = !searchQuery
    ? items
    : items.filter((item) => item.label.toLowerCase().includes(searchQuery.trim().toLowerCase()));

  const getSelectedKeys = () => {
    if (isMultiple) {
      return value;
    }

    return typeof value === "undefined" ? [] : [value];
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto outline-none">
        {header}

        {isMultiple && showSelectionBar && (
          <SelectListBoxSelectionBar onChange={onChange} items={items} className="hidden t:flex" />
        )}

        {showSearch && (
          <div className="border-b border-b-elevation-outline-1 bg-elevation-surface-1 px-4 py-2">
            <TextInput
              variant="outlined"
              label={t("ui.select.search")}
              placeholder={t("ui.select.search")}
              hideLabel
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              action={
                searchQuery
                  ? { icon: CloseIcon, altText: t("ui.select.clearSearch"), onClick: () => setSearchQuery("") }
                  : undefined
              }
              inputClassName="!py-height-xs"
            />
          </div>
        )}

        {isMultiple && showAllOption && <SelectListBoxAllOption value={value} onChange={onChange} items={items} />}
        <Virtualizer
          layout={ListLayout}
          layoutOptions={{
            estimatedRowHeight: 48,
          }}
        >
          <AriaListBox
            autoFocus
            selectionMode={selectionMode}
            items={filteredItems}
            selectedKeys={getSelectedKeys()}
            onSelectionChange={(id) => {
              if (id === "all" && isMultiple) {
                onChange?.(items.map((item) => item.id));
                return;
              }

              const selectedIds = Array.from(id);
              if (!isMultiple && selectedIds.length === 0) {
                if (value) {
                  onChange?.(value);
                }
                return;
              }

              if (isMultiple) {
                onChange?.(selectedIds as TKey[]);
              } else {
                onChange?.(selectedIds[0] as TKey);
              }
            }}
          >
            {(item) => <SelectListItem key={item.id} {...item} isMultiple={isMultiple} />}
          </AriaListBox>
        </Virtualizer>
      </div>

      {isMultiple && (
        <SelectListBoxSelectionBar onChange={onChange} items={items} className="bg-elevation-surface-1 t:hidden" />
      )}
    </>
  );
};
