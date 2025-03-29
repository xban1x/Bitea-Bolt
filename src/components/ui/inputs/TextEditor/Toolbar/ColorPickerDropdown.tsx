import clsx from "clsx";
import { useState } from "react";
import { Dialog, Popover, DialogTrigger, Button as AriaButton } from "react-aria-components";

import { ArrowDropDownIcon } from "@/assets/icons/general/ArrowDropDown";
import { ColorPicker } from "@/components/ui/inputs/TextEditor/Toolbar/ColorPicker";
import { textInput } from "@/components/ui/inputs/TextInput/TextInputWrapper";
import { Typography } from "@/components/ui/text/Typography/Typography";

interface ColorPickerDropdownProps {
  colors: string[];
  value: string | undefined;
  onChange: (color: string) => void;
  children: React.ReactElement;
}

export const ColorPickerDropdown = ({ colors, value, onChange, children }: ColorPickerDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (color: string) => {
    onChange(color);
    setIsOpen(false);
  };

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <AriaButton
        className={textInput({
          variant: "inline",
          className: clsx("flex items-center justify-between gap-2"),
        })}
      >
        <Typography size="label-1" className="truncate">
          {children}
        </Typography>

        <ArrowDropDownIcon className={clsx("size-6 shrink-0", isOpen && "rotate-180")} aria-hidden="true" />
      </AriaButton>

      <Popover className="my-4 w-40 outline-none" offset={0} placement="bottom start">
        <Dialog className="outline-none">
          <div
            className={clsx(
              "flex justify-center overflow-hidden p-2 shadow-5 outline-none",
              "rounded-input-rounding border border-elevation-outline-1 bg-elevation-background",
            )}
          >
            <ColorPicker colors={colors} value={value} onChange={handleChange} />
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
