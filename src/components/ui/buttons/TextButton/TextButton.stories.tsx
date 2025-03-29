import type { Meta, StoryObj } from "@storybook/react";

import { SendIcon } from "@/assets/icons/general/Send";

import { TextButton } from "./TextButton";

const meta: Meta<typeof TextButton> = {
  component: TextButton,
};

export default meta;

type Story = StoryObj<typeof TextButton>;

export const Primary: Story = {
  args: {
    children: "Log in",
  },
};

export const Truncation: Story = {
  args: {
    children: "Long long text to showcase truncation",
  },
};

export const Icon: Story = {
  args: {
    children: "Long long text to showcase truncation",
    icon: SendIcon,
  },
};

export const IconOnly: Story = {
  args: {
    children: "Long long text to showcase truncation",
    icon: SendIcon,
    hideText: true,
  },
};

export const IconRight: Story = {
  args: {
    children: "Long long text to showcase truncation",
    icon: SendIcon,
    iconPosition: "right",
  },
};

export const IconRightLoading: Story = {
  args: {
    children: "Long long text to showcase truncation",
    icon: SendIcon,
    iconPosition: "right",
    isLoading: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    isDisabled: true,
    icon: SendIcon,
  },
};

export const Dual: Story = {
  args: {
    children: "Dual",
    color: "dual",
    icon: SendIcon,
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    color: "secondary",
    icon: SendIcon,
  },
};

export const AsLink: Story = {
  args: {
    children: "Go to Google",
    color: "secondary",
    icon: SendIcon,
    link: {
      href: "https://www.google.com",
    },
  },
};
