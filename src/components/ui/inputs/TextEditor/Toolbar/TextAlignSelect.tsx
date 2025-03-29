import React from "react";
import { useTranslation } from "react-i18next";

import { AlignCenterIcon } from "@/assets/icons/ui/AlignCenter";
import { AlignLeftIcon } from "@/assets/icons/ui/AlignLeft";
import { AlignLeftRightIcon } from "@/assets/icons/ui/AlignLeftRight";
import { AlignRightIcon } from "@/assets/icons/ui/AlignRight";
import { Select } from "@/components/ui/inputs/Select/Select";
import { TextEditorSharedProps } from "@/components/ui/inputs/TextEditor/TextEditor.types";

type TextAlign = "left" | "center" | "right" | "justify";

export const TextAlignSelect = ({ editor }: TextEditorSharedProps) => {
  const { t } = useTranslation();

  const isAlignEnabled = !!editor.extensionManager.extensions.find((extension) => extension.name === "textAlign");

  if (!isAlignEnabled) {
    return null;
  }

  const onChange = (val: string) => {
    editor.chain().focus().setTextAlign(val).run();
  };

  const getItem = (id: TextAlign, Icon: React.FC<React.SVGProps<SVGSVGElement>>) => {
    return {
      id,
      label: t(`ui.textEditor.textAlign.${id}`),
      content: <Icon className="size-6" />,
      isActive: editor.isActive({ textAlign: id }),
      can: editor.can().setTextAlign(id),
    };
  };

  const items = [
    getItem("left", AlignLeftIcon),
    getItem("center", AlignCenterIcon),
    getItem("right", AlignRightIcon),
    getItem("justify", AlignLeftRightIcon),
  ];

  const enabledItems = items.filter((item) => item.can);

  return (
    <Select
      variant="inline"
      label={t("ui.textEditor.textAlign.label")}
      placeholder={t("ui.textEditor.textAlign.label")}
      hideLabel
      ignoreTriggerWidth
      showSelectionContent
      onChange={onChange}
      items={enabledItems}
      value={enabledItems.find((item) => item.isActive)?.id || "left"}
    />
  );
};
