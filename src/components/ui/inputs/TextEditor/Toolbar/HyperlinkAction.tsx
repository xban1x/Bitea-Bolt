import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { LinkIcon } from "@/assets/icons/ui/Link";
import { Button } from "@/components/ui/buttons/Button/Button";
import { InlineIconButton } from "@/components/ui/buttons/InlineIconButton/InlineIconButton";
import { TextEditorSharedProps } from "@/components/ui/inputs/TextEditor/TextEditor.types";
import { TextInput } from "@/components/ui/inputs/TextInput/TextInput";
import { ResponsiveDialog } from "@/components/ui/overlays/ResponsiveDialog/ResponsiveDialog";

export const HyperlinkAction = ({ editor }: TextEditorSharedProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const isLinkEnabled = !!editor.extensionManager.extensions.find((extension) => extension.name === "link");
  const linkHref = editor.getAttributes("link")?.href as string | undefined;

  useEffect(() => {
    setUrl(linkHref || "");
  }, [linkHref]);

  if (!isLinkEnabled) {
    return null;
  }

  const onRemove = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setIsOpen(false);
  };

  const onApply = () => {
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setIsOpen(false);
  };

  return (
    <ResponsiveDialog
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      drawerLabel={t("ui.textEditor.link.label")}
      trigger={
        <InlineIconButton
          label={t("ui.textEditor.link.label")}
          icon={LinkIcon}
          className={clsx(editor.isActive("link") && "text-interactive-icon-toggled")}
        />
      }
    >
      <TextInput
        variant="outlined"
        hideLabel
        label={t("ui.textEditor.link.urlLabel")}
        placeholder={t("ui.textEditor.link.urlPlaceholder")}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="mb-4"
      />
      <div className="flex justify-between">
        <Button variant="secondary" size="small" width="s" onPress={onApply} isDisabled={!url}>
          {t("ui.textEditor.link.apply")}
        </Button>
        <Button variant="outlined" size="small" width="s" onPress={onRemove} isDisabled={!editor.isActive("link")}>
          {t("ui.textEditor.link.remove")}
        </Button>
      </div>
    </ResponsiveDialog>
  );
};
