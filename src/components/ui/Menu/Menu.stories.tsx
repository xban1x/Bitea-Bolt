import type { Meta, StoryObj } from "@storybook/react";

import { MenuIcon } from "@/assets/icons/general/Menu";
import { IconButton } from "@/components/ui/buttons/IconButton/IconButton";
import { PillButton } from "@/components/ui/buttons/PillButton/PillButton";

import { Menu } from "./Menu";

const meta: Meta<typeof Menu> = {
  component: Menu,
  args: {
    items: [
      { label: "Profile", href: "https://www.google.com", target: "_blank" },
      {
        content: <span className="text-info-error">Some other text</span>,
        label: "Some other text",
        className: "focus-visible:!bg-elevation-surface-2",
      },
      {
        label: "Disabled item",
        isDisabled: true,
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    trigger: <PillButton>Open menu</PillButton>,
  },
};

export const WithIconButton: Story = {
  args: {
    trigger: <IconButton icon={MenuIcon} label="Menu" />,
  },
};
