import clsx from "clsx";
import { ColorSwatch, ColorSwatchPicker, ColorSwatchPickerItem } from "react-aria-components";

interface ColorPickerProps {
  colors: string[];
  value: string | undefined;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ colors, value, onChange }: ColorPickerProps) => {
  return (
    <ColorSwatchPicker
      value={value}
      onChange={(color) => onChange(color.toString("hex"))}
      className="grid w-full grid-cols-[repeat(auto-fit,minmax(1rem,1fr))] gap-1"
    >
      {colors.map((color) => (
        <ColorSwatchPickerItem key={color} color={color} className="group">
          <ColorSwatch
            className={clsx(
              "size-4 rounded-xs border border-solid border-interactive-outlined-on",
              "group-selected:border-interactive-outlined-pressed group-selected:shadow-2",
              "cursor-pointer",
            )}
          />
        </ColorSwatchPickerItem>
      ))}
    </ColorSwatchPicker>
  );
};
