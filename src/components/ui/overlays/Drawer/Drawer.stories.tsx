import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/buttons/Button/Button";

import { Drawer } from "./Drawer";

const meta: Meta<typeof Drawer> = {
  component: Drawer,
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {
    trigger: <Button>Open Drawer</Button>,
    children: (close) => (
      <div className="flex h-full flex-col items-center justify-center">
        <button type="button" onClick={close}>
          Close Drawer
        </button>
      </div>
    ),
  },
};
