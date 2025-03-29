import { useTranslation } from "react-i18next";

import { TextButton } from "@/components/ui/buttons/TextButton/TextButton";

interface TimePickerFooterProps {
  onApply: () => void;
}

export const TimePickerFooter = ({ onApply }: TimePickerFooterProps) => {
  const { t } = useTranslation();

  return (
    <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-solid border-elevation-outline-1 bg-elevation-surface-1 px-4 py-3 t:bg-elevation-background t:py-1-5">
      <TextButton type="button" color="secondary" onPress={onApply}>
        {t("ui.datePicker.save")}
      </TextButton>
    </footer>
  );
};
