import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/buttons/Button/Button";

import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  argTypes: {
    placement: {
      options: [
        "top",
        "left",
        "right",
        "bottom",
        "end",
        "start",
        "top end",
        "end top",
        "top start",
        "top end",
        "top left",
        "left top",
        "top right",
        "start top",
        "right top",
        "start bottom",
        "bottom start",
        "bottom end",
        "bottom left",
        "left bottom",
        "bottom right",
        "end bottom",
        "right bottom",
      ],
      control: "select",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    children: (
      <div className="m-32">
        <Button width="s">✏️</Button>
      </div>
    ),
    text: "Hello",
    placement: "bottom",
  },
};

export const LongText: Story = {
  args: {
    children: (
      <div className="m-32">
        <Button width="s">✏️</Button>
      </div>
    ),
    text: "This is a default sample of text, in order to display a recommended maximum of three lines.",
    placement: "bottom",
  },
};
