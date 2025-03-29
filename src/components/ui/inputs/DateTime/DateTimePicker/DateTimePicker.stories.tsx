import type { Meta, StoryObj } from "@storybook/react";

import { DateTimePicker } from "./DateTimePicker";

const meta: Meta<typeof DateTimePicker> = {
  component: DateTimePicker,
  args: {},
};

export default meta;

type Story = StoryObj<typeof DateTimePicker>;

export const Default: Story = {
  args: {
    label: "Date",
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
