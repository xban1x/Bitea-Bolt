/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "components/ui/inputs/Select",
  argTypes: {
    variant: {
      options: ["outlined", "filled", "inline"],
      control: "select",
    },
  },
  render: function Component(args) {
    const [, setArgs] = useArgs();

    const onValueChange = (value: typeof args.value) => {
      // Call the provided callback
      // This is used for the Actions tab
      args.onChange?.(value as any);

      // Update the arg in Storybook
      setArgs({ value });
    };

    // Forward all args and overwrite onValueChange
    return <Select {...args} onChange={onValueChange} />;
  },
  args: {
    label: "Select Event Type",
    placeholder: "Ex.: Roundtable",
    items: [
      {
        id: "1",
        label: "Roundtable",
      },
      {
        id: "2",
        label: "Conference",
      },
      {
        id: "3",
        label: "Meeting",
      },
      {
        id: "4",
        label: "Party",
      },
      {
        id: "5",
        label:
          "Very long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long event",
      },
      {
        id: "6",
        label: "Disabled item",
        isDisabled: true,
      },
      {
        id: "7",
        label: "Custom label",
        content: (
          <span className="text-info-error group-hover:text-interactive-primary-hover group-focus:text-interactive-primary-on group-selected:text-interactive-primary-on">
            Custom label
          </span>
        ),
      },
    ],
    hideDropdownIcon: false,
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    onChange: (val: any) => console.log("onChange", val),
  },
};

export const Multiple: Story = {
  args: {
    selectionMode: "multiple",
    value: [],
    showSelectionBar: true,
    showAllOption: true,
    showSearch: false,
  },
};

export const HiddenLabel: Story = {
  args: {
    hideLabel: true,
  },
};

export const Inline: Story = {
  args: {
    variant: "inline",
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const Error: Story = {
  args: {
    error: "This is an error message",
  },
};

export const Search: Story = {
  args: {
    showSearch: true,
  },
};
