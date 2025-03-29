import clsx from "clsx";
import { FC, SVGProps } from "react";
import { Disclosure, DisclosurePanel, Heading, Button as AriaButton } from "react-aria-components";

import { CaretUpIcon } from "@/assets/icons/general/CaretUp";
import { TextButton } from "@/components/ui/buttons/TextButton/TextButton";
import { Typography } from "@/components/ui/text/Typography/Typography";

type BaseAccordionProps = {
  defaultExpanded?: boolean;
  label: string;
  items: {
    id: string;
    itemLabel: string;
    icon?: FC<SVGProps<SVGSVGElement>>;
    iconColor?: "primary" | "secondary" | "dual" | "danger";
    onClick?: () => void;
    disabled?: boolean;
  }[];
};

export const BaseAccordion = ({ defaultExpanded, label, items }: BaseAccordionProps) => {
  return (
    <Disclosure
      key={label}
      id={label}
      defaultExpanded={defaultExpanded}
      className="w-full rounded-xs bg-elevation-surface-0"
    >
      {({ isExpanded }) => (
        <>
          <Heading>
            <AriaButton
              slot="trigger"
              className="flex w-full items-center justify-between rounded-xs bg-elevation-surface-0 px-2 py-1 focus:outline-none"
            >
              <Typography variant="prominent-1" size="label-2" className="font-primary text-interactive-text-on-bg-2">
                {label}
              </Typography>
              <CaretUpIcon
                width={22}
                height={22}
                className={clsx(
                  "text-interactive-text-on-bg-2 transition-transform focus:!outline-none",
                  !isExpanded && "rotate-180",
                )}
              />
            </AriaButton>
          </Heading>
          <DisclosurePanel className="border-t border-solid border-t-elevation-surface-1">
            {items?.map((item, index) => {
              const { id, icon: Icon, iconColor, itemLabel, onClick, disabled } = item;
              return (
                <TextButton
                  key={id}
                  icon={Icon}
                  onPress={onClick}
                  iconColor={iconColor || "primary"}
                  className={clsx("py-1 pl-1 text-text-default-secondary", index === items.length - 1 && "pb-2")}
                  isDisabled={disabled}
                >
                  {itemLabel}
                </TextButton>
              );
            })}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};
