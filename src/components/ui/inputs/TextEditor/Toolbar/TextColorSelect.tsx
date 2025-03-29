import { TextColorIcon } from "@/assets/icons/ui/TextColor";
import { defaultColors, TextEditorSharedProps } from "@/components/ui/inputs/TextEditor/TextEditor.types";
import { ColorPickerDropdown } from "@/components/ui/inputs/TextEditor/Toolbar/ColorPickerDropdown";

export const TextColorSelect = ({ editor }: TextEditorSharedProps) => {
  const isColorEnabled = editor.extensionManager.extensions.some((extension) => extension.name === "color");
  if (!isColorEnabled) {
    return null;
  }

  const onChange = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  const textColor = (editor.getAttributes("textStyle").color as string) || "#000000";

  return (
    <ColorPickerDropdown value={textColor} onChange={onChange} colors={defaultColors}>
      <TextColorIcon className="size-6" textColor={textColor} />
    </ColorPickerDropdown>
  );
};
