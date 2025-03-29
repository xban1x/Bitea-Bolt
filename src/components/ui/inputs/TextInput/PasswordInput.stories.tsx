import type { Meta, StoryObj } from "@storybook/react";

import { PasswordInput } from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    label: "Password",
    required: true,
    onChange: (val) => console.log("onChange", val.target.value),
    hideLabel: false,
  },
};
