import { HighlightIcon } from "@/assets/icons/ui/Highlight";
import { HighlightOnIcon } from "@/assets/icons/ui/HighlightOn";
import { defaultColors, TextEditorSharedProps } from "@/components/ui/inputs/TextEditor/TextEditor.types";
import { ColorPickerDropdown } from "@/components/ui/inputs/TextEditor/Toolbar/ColorPickerDropdown";

export const TextHighlightSelect = ({ editor }: TextEditorSharedProps) => {
  const isHighlightEnabled = editor.extensionManager.extensions.some((extension) => extension.name === "highlight");
  if (!isHighlightEnabled) {
    return null;
  }

  const onChange = (color: string) => {
    if (color === "#FFFFFF") {
      editor.chain().focus().unsetHighlight().run();
    } else {
      editor.chain().focus().setHighlight({ color }).run();
    }
  };

  const highlightColor = (editor.getAttributes("highlight").color as string | undefined) || "#FFFFFF";

  return (
    <ColorPickerDropdown value={highlightColor} onChange={onChange} colors={defaultColors}>
      {highlightColor ? (
        <HighlightOnIcon className="size-6" highlightColor={highlightColor} />
      ) : (
        <HighlightIcon className="size-6" />
      )}
    </ColorPickerDropdown>
  );
};
