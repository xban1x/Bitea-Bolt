import type { Meta, StoryObj } from "@storybook/react";

import { PillButton } from "./PillButton";

const meta: Meta<typeof PillButton> = {
  component: PillButton,
  args: {
    children: "Log in",
  },
};

export default meta;

type Story = StoryObj<typeof PillButton>;

export const PillButtonStory: Story = {};
