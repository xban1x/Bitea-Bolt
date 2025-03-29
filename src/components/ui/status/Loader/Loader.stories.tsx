import type { Meta, StoryObj } from "@storybook/react";

import { Loader } from "./Loader";

const meta: Meta<typeof Loader> = {
  component: Loader,
  args: {
    size: "default",
  },
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {};
