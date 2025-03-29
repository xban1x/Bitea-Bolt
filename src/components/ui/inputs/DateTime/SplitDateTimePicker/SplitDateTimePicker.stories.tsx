import type { Meta, StoryObj } from "@storybook/react";

import { SplitDateTimePicker } from "./SplitDateTimePicker";

const meta: Meta<typeof SplitDateTimePicker> = {
  component: SplitDateTimePicker,
  args: {},
};

export default meta;

type Story = StoryObj<typeof SplitDateTimePicker>;

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

export const WithSeparator: Story = {
  args: {
    ...Default.args,
    separator: "at",
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
