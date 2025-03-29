import type { Meta, StoryObj } from "@storybook/react";

import { InfoIcon } from "@/assets/icons/general/Info";

import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: InfoIcon,
    label: "More info",
  },
};

export const AsLink: Story = {
  args: {
    icon: InfoIcon,
    label: "To Google",
    link: {
      href: "https://www.google.com",
    },
  },
};
