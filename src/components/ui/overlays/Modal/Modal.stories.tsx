/* eslint-disable import/no-extraneous-dependencies */
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import { ActionModal } from "./ActionModal";

const meta: Meta<typeof ActionModal> = {
  title: "components/ui/overlays/Modal",
  render: function Component(args) {
    const [, setArgs] = useArgs();

    const onClose = () => {
      setArgs({ isOpen: false });
    };

    // Forward all args and overwrite onValueChange
    return <ActionModal {...args} onClose={onClose} />;
  },
};
export default meta;

type Story = StoryObj<typeof ActionModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    heading: "Text only message!",
    description:
      "Space is big. You just won't believe how vastly, hugely, mind-bogglingly big it is. I mean, you may think it's a long way down the road to the chemist's, but that's just peanuts to space.",
    primaryAction: {
      label: "Primary Action",
      onPress: () => {},
    },
    secondaryAction: {
      label: "Secondary Action",
      onPress: () => {},
    },
  },
};
