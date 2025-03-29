import React, { useCallback, useEffect, useRef, useState } from "react";

// Icons
import { DropdownDownFullIcon } from "@/assets/icons/general/DropdownDownFull";
// Components
import { Typography } from "@/components/ui/text/Typography/Typography";

interface Props {
  selected: string;
  isDisabled?: boolean;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  top?: number;
}

const Dropdown = (props: Props) => {
  const node = useRef(null);

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

  return (
    <div
      className={`relative flex flex-1 items-center justify-between gap-2 rounded-xs bg-elevation-surface-1 ${props.className || ""}`}
    >
      <button
        type="button"
        className="relative flex flex-1 items-center justify-between gap-2 rounded-[4px] disabled:cursor-not-allowed disabled:opacity-[0.3]"
        onClick={() => {
          setDropdownIsOpen(!dropdownIsOpen);
        }}
        ref={node}
        id="selection_btn_dropdown"
        disabled={!!props.isDisabled}
      >
        <div className="flex flex-1 items-center pr-1" id="selection_container">
          <div className="flex flex-1 items-center gap-1 rounded-[4px] p-1 pl-2" id="selection_sub_container">
            {props.icon && props.icon}
            <Typography
              variant="default"
              size="body-4"
              as="span"
              className="flex-1 text-left text-text-default-secondary"
              id="selection_toggle_dropdown"
            >
              {props.selected}
            </Typography>
          </div>
          <DropdownDownFullIcon
            width={20}
            height={20}
            className={`transition-all duration-300 ${!dropdownIsOpen ? "rotate-0" : "rotate-180"}`}
            id="selection_icon"
          />
        </div>

        {dropdownIsOpen ? (
          <div
            className="absolute z-10 max-h-[450px] w-full min-w-[150px] flex-1 flex-col items-start overflow-x-auto rounded-s border border-elevation-outline-1 bg-elevation-surface-0"
            style={{
              top: `${props.top || 40}px`,
              left: `0px`,
              boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            {props.children}
          </div>
        ) : null}
      </button>
    </div>
  );
};

export default Dropdown;
