import type { Meta, StoryObj } from "@storybook/react";

import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: "First name",
    required: true,
    tooltipText: "Additional helper information",
    helperText: "This is a helper text",
    onChange: (val) => console.log("onChange", val.target.value),
    hideLabel: false,
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
    label: "First name",
    value: "John",
    required: true,
    tooltipText: "Additional helper information",
    helperText: "This is a helper text",
    isDisabled: true,
  },
};
