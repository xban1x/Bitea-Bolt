import type { Meta, StoryObj } from "@storybook/react";

import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  component: Tag,
  args: {
    children: "Log in",
    onDismiss: () => {
      console.log("onDismiss");
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const TagStory: Story = {};
