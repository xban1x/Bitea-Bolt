import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { BoldIcon } from "@/assets/icons/ui/Bold";
import { ItalicIcon } from "@/assets/icons/ui/Italic";
import { StrikethroughIcon } from "@/assets/icons/ui/Strikethrough";
import { UnderlinedIcon } from "@/assets/icons/ui/Underlined";
import { InlineIconButton } from "@/components/ui/buttons/InlineIconButton/InlineIconButton";
import { TextEditorSharedProps } from "@/components/ui/inputs/TextEditor/TextEditor.types";

export const TextMarksActions = ({ editor }: TextEditorSharedProps) => {
  const { t } = useTranslation();

  const actions = [
    {
      can: !!editor.extensionManager.extensions.find((extension) => extension.name === "bold"),
      isEnabled: () => editor.can().toggleBold(),
      label: t("ui.textEditor.marks.bold"),
      icon: BoldIcon,
      onPress: () => {
        editor.chain().focus().toggleBold().run();
      },
      isActive: () => editor.isActive("bold"),
    },
    {
      can: !!editor.extensionManager.extensions.find((extension) => extension.name === "italic"),
      isEnabled: () => editor.can().toggleItalic(),
      label: t("ui.textEditor.marks.italic"),
      icon: ItalicIcon,
      onPress: () => {
        editor.chain().focus().toggleItalic().run();
      },
      isActive: () => editor.isActive("italic"),
    },
    {
      can: !!editor.extensionManager.extensions.find((extension) => extension.name === "strike"),
      isEnabled: () => editor.can().toggleStrike(),
      label: t("ui.textEditor.marks.strikethrough"),
      icon: StrikethroughIcon,
      onPress: () => {
        editor.chain().focus().toggleStrike().run();
      },
      isActive: () => editor.isActive("strike"),
    },
    {
      can: !!editor.extensionManager.extensions.find((extension) => extension.name === "underline"),
      isEnabled: () => editor.can().toggleUnderline(),
      label: t("ui.textEditor.marks.underline"),
      icon: UnderlinedIcon,
      onPress: () => {
        editor.chain().focus().toggleUnderline().run();
      },
      isActive: () => editor.isActive("underline"),
    },
  ];

  const enabledActions = actions.filter((action) => action.can);

  if (enabledActions.length === 0) {
    return null;
  }

  return (
    <div className="flex h-full items-center gap-3">
      {enabledActions.map((action) => (
        <InlineIconButton
          key={action.label}
          label={action.label}
          onPress={action.onPress}
          icon={action.icon}
          isDisabled={!action.isEnabled()}
          className={clsx(action.isActive() && "text-interactive-icon-toggled")}
        />
      ))}
    </div>
  );
};
