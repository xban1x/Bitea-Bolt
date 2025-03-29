import type { Meta, StoryObj } from "@storybook/react";

import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  component: Toggle,
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    children: "Switch",
    onChange: (val) => console.log("onChange", val),
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: "This is an error message",
  },
};
