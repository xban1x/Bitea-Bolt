import type { Meta, StoryObj } from "@storybook/react";

import { TimePicker } from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
  component: TimePicker,
  args: {},
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    label: "Time",
    disableDropdown: false,
    onChange: (val) => console.log("onChange", val),
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    variant: "filled",
  },
};

export const Inline: Story = {
  args: {
    ...Default.args,
    variant: "inline",
  },
};

export const HiddenLabel: Story = {
  args: {
    ...Default.args,
    hideLabel: true,
  },
};

export const WithDate: Story = {
  args: {
    ...Default.args,
    date: "2025-01-01",
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
