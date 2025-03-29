import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    label: "Percentage",
    unit: "%",
    onChange: (val) => console.log("onChange", val),
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
    label: "No unit",
    isDisabled: true,
  },
};

export const Error: Story = {
  args: {
    label: "No unit",
    error: "This is an error message",
  },
};
