import type { Meta, StoryObj } from "@storybook/react";

import { CalendarIcon } from "@/assets/icons/general/Calendar";

import { InlineIconButton } from "./InlineIconButton";

const meta: Meta<typeof InlineIconButton> = {
  component: InlineIconButton,
  args: {
    icon: CalendarIcon,
  },
};

export default meta;

type Story = StoryObj<typeof InlineIconButton>;

export const IconButtonStory: Story = {
  args: {
    icon: CalendarIcon,
  },
};

export const IconLinkButtonStory: Story = {
  args: {
    icon: CalendarIcon,
    link: {
      href: "https://example.com",
    },
  },
};
