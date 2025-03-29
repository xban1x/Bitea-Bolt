import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Icons
import { DropdownDownFullIcon } from "@/assets/icons/general/DropdownDownFull";
import { Checkbox } from "@/components/ui/inputs/Checkbox/Checkbox";
import { SelectItem } from "@/components/ui/inputs/Select/Select";
// Components
import { Typography } from "@/components/ui/text/Typography/Typography";

interface Props {
  top: number;
  left: number;
  onChange: (value: SelectItem) => void;
  selectedItemIds: SelectItem["id"][];
  items: SelectItem[];
  placeholder: string;
  maxHeight?: number;
  showSelectAll?: boolean;
}

const MultiSelectDropdown = (props: Props) => {
  const node = useRef(null);
  const selectedItems = props.items.filter((item) => props.selectedItemIds.includes(item.id));
  const { t } = useTranslation();

  // UI
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  useEffect(() => {
    document.removeEventListener("mousedown", handleOutsideClick, false);
    // Added so that we can listen for click events
    document.addEventListener("mousedown", handleOutsideClick, false);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOutsideClick = useCallback(
    (e: any) => {
      // @ts-expect-error
      if (node && node.current && node.current.contains(e.target)) {
        return;
      }

      if (e.target.id.includes("selection_") || !e.target.id) {
        setDropdownIsOpen(false);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleSelectAll = () => {
    if (selectedItems.length !== props.items.length) {
      // Select all
      props.items.forEach((opt) => {
        if (!selectedItems.find((itm) => itm.id === opt.id)) {
          props.onChange(opt);
        }
      });
    } else {
      // Deselect all
      props.items.forEach((opt) => {
        props.onChange(opt);
      });
    }
  };

  return (
    <div className="relative flex flex-1 items-center justify-between gap-2 rounded-xs bg-elevation-surface-1">
      <button
        type="button"
        className="flex flex-1 items-center justify-between gap-2 rounded-[4px]"
        onClick={() => {
          setDropdownIsOpen(!dropdownIsOpen);
        }}
        ref={node}
        id="selection_btn"
      >
        <div className="flex flex-1 items-center pr-1" id="selection_container">
          <div className="flex flex-1 items-center gap-1 rounded-[4px] p-1 pl-2" id="selection_sub_container">
            <Typography
              variant="default"
              size="body-4"
              as="span"
              className="flex-1 text-left text-text-default-secondary"
              id="selection_toggle"
            >
              {selectedItems.length > 0 ? selectedItems.map((item) => item.label).join(", ") : props.placeholder}
            </Typography>
          </div>
          <DropdownDownFullIcon
            width={20}
            height={20}
            className={`transition-all duration-300 ${!dropdownIsOpen ? "rotate-0" : "rotate-180"}`}
            id="selection"
          />
        </div>

        {dropdownIsOpen ? (
          <div
            className="absolute z-10 w-full min-w-[150px] flex-1 flex-col items-start rounded-s border border-elevation-outline-1 bg-elevation-surface-0"
            style={{
              top: `${props.top}px`,
              left: `${props.left}px`,
              boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
              maxHeight: props.maxHeight ? `${props.maxHeight}px` : "auto",
              overflowX: props.maxHeight ? "auto" : "hidden",
            }}
          >
            {props.showSelectAll && (
              <div className="flex items-center justify-between border-b-[1px] border-b-elevation-outline-1">
                <button type="button" className="p-2 hover:text-interactive-text-hover" onClick={handleSelectAll}>
                  <Typography size="label-2">
                    {selectedItems.length !== props.items.length ? t("shared.selectAll") : t("shared.deselectAll")}
                  </Typography>
                </button>
                <button
                  type="button"
                  className="p-2 hover:text-interactive-text-hover"
                  onClick={() => {
                    setDropdownIsOpen(false);
                  }}
                >
                  <Typography size="label-2">{t("shared.apply")}</Typography>
                </button>
              </div>
            )}

            {props.items.map((option, index) => (
              <button
                key={`item_${option.id}`}
                type="button"
                onClick={() => {
                  props.onChange(option);
                }}
                className={`w-full flex-1 ${props.items.length - 1 !== index ? "border-b-[1px] border-b-elevation-outline-1" : ""}`}
                id="multiple_dropdown_button"
              >
                <Checkbox
                  className="flex w-full cursor-pointer items-center p-2 text-interactive-text-on-bg hover:text-interactive-text-hover"
                  onChange={() => {
                    props.onChange(option);
                  }}
                  isSelected={!!selectedItems.find((itm) => itm.id === option.id)}
                >
                  {option.label}
                </Checkbox>
              </button>
            ))}
          </div>
        ) : null}
      </button>
    </div>
  );
};

export default MultiSelectDropdown;
