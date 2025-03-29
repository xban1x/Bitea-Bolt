import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "@/components/ui/buttons/Button/Button";

import { ResponsiveDialog } from "./ResponsiveDialog";

const ResponsiveDialogStory = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ResponsiveDialog
      trigger={<Button>Open</Button>}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      drawerLabel="Responsive Dialog"
      popoverClassName="w-80"
    >
      <div>Content</div>
    </ResponsiveDialog>
  );
};

const meta: Meta<typeof ResponsiveDialogStory> = {
  component: ResponsiveDialogStory,
};

export default meta;

type Story = StoryObj<typeof ResponsiveDialogStory>;

export const Default: Story = {
  args: {},
};
