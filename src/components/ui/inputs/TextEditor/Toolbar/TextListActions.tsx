import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { BulletedListIcon } from "@/assets/icons/ui/BulletedList";
import { NumberedListIcon } from "@/assets/icons/ui/NumberedList";
import { InlineIconButton } from "@/components/ui/buttons/InlineIconButton/InlineIconButton";
import { TextEditorSharedProps } from "@/components/ui/inputs/TextEditor/TextEditor.types";

export const TextListActions = ({ editor }: TextEditorSharedProps) => {
  const { t } = useTranslation();

  const actions = [
    {
      can: !!editor.extensionManager.extensions.find((extension) => extension.name === "bulletList"),
      isEnabled: () => editor.can().toggleBulletList(),
      label: t("ui.textEditor.marks.bold"),
      icon: BulletedListIcon,
      onPress: () => {
        editor.chain().focus().toggleBulletList().run();
      },
      isActive: () => editor.isActive("bulletList"),
    },
    {
      can: !!editor.extensionManager.extensions.find((extension) => extension.name === "orderedList"),
      isEnabled: () => editor.can().toggleOrderedList(),
      label: t("ui.textEditor.marks.italic"),
      icon: NumberedListIcon,
      onPress: () => {
        editor.chain().focus().toggleOrderedList().run();
      },
      isActive: () => editor.isActive("orderedList"),
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
