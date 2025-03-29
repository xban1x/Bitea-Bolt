import { Level } from "@tiptap/extension-heading";
import { useTranslation } from "react-i18next";

import { Select } from "@/components/ui/inputs/Select/Select";
import { TextEditorSharedProps } from "@/components/ui/inputs/TextEditor/TextEditor.types";
import { Typography } from "@/components/ui/text/Typography/Typography";

export const TextStyleSelect = ({ editor }: TextEditorSharedProps) => {
  const { t } = useTranslation();

  const isHeadingEnabled = !!editor.extensionManager.extensions.find((extension) => extension.name === "heading");

  if (!isHeadingEnabled) {
    return null;
  }

  const getItem = (level: Level) => {
    return {
      id: level,
      label: t(`ui.textEditor.textStyle.heading${level}`),
      content: <Typography size={`title-${level}`}>{t(`ui.textEditor.textStyle.heading${level}`)}</Typography>,
    };
  };

  const onChange = (val: number) => {
    if (val === 0) {
      const currentLevel = editor.getAttributes("heading")?.level as Level | undefined;
      if (!currentLevel) {
        return;
      }
      editor.chain().focus().toggleHeading({ level: currentLevel }).run();
      return;
    }

    if (!editor.can().setHeading({ level: val as Level })) {
      return;
    }

    editor
      .chain()
      .focus()
      .setHeading({ level: val as Level })
      .run();
  };

  return (
    <Select
      variant="inline"
      placeholder={t("ui.textEditor.textStyle.label")}
      label={t("ui.textEditor.textStyle.label")}
      hideLabel
      ignoreTriggerWidth
      onChange={onChange}
      items={[
        { id: 0, label: t("ui.textEditor.textStyle.normal") },
        ...(editor.can().toggleHeading({ level: 1 }) ? [getItem(1)] : []),
        ...(editor.can().toggleHeading({ level: 2 }) ? [getItem(2)] : []),
        ...(editor.can().toggleHeading({ level: 3 }) ? [getItem(3)] : []),
        ...(editor.can().toggleHeading({ level: 4 }) ? [getItem(4)] : []),
        ...(editor.can().toggleHeading({ level: 5 }) ? [getItem(5)] : []),
        ...(editor.can().toggleHeading({ level: 6 }) ? [getItem(6)] : []),
      ]}
      value={(editor.getAttributes("heading")?.level as Level | undefined) || 0}
    />
  );
};
