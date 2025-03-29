import type { Meta, StoryObj } from "@storybook/react";

import { CheckIcon } from "@/assets/icons/general/Check";

import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    children: "Option 1",
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
    children: "Option 1",
    error: "This is an error message",
  },
};

export const CustomLabel: Story = {
  args: {
    children: (
      <div className="flex items-center gap-1">
        Option 1 <CheckIcon className="size-4" />
      </div>
    ),
  },
};
