import type { Meta, StoryObj } from "@storybook/react";

import { SendIcon } from "@/assets/icons/general/Send";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Log in",
  },
};

export const Truncation: Story = {
  args: {
    children: "Long long text to showcase truncation",
    width: "s",
  },
};

export const Icon: Story = {
  args: {
    children: "Long long text to showcase truncation",
    width: "s",
    icon: SendIcon,
  },
};

export const IconOnly: Story = {
  args: {
    children: "Long long text to showcase truncation",
    width: "s",
    icon: SendIcon,
    hideText: true,
  },
};

export const IconRight: Story = {
  args: {
    children: "Long long text to showcase truncation",
    width: "s",
    icon: SendIcon,
    iconPosition: "right",
  },
};

export const IconRightLoading: Story = {
  args: {
    children: "Long long text to showcase truncation",
    width: "s",
    icon: SendIcon,
    iconPosition: "right",
    isLoading: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading",
    width: "l",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Loading",
    width: "l",
    isDisabled: true,
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    width: "l",
    variant: "secondary",
  },
};

export const Outlined: Story = {
  args: {
    children: "Outlined",
    width: "l",
    variant: "outlined",
  },
};

export const AsLink: Story = {
  args: {
    children: "To Google",
    link: {
      href: "https://www.google.com",
    },
  },
};
