import type { Meta, StoryObj } from "@storybook/react";

import { ToggleButton } from "./ToggleButton";

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  args: {
    children: "Toggle me",
    isDisabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {};
