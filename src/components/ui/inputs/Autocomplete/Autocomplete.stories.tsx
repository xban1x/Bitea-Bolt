import type { Meta, StoryObj } from "@storybook/react";

import { Autocomplete } from "./Autocomplete";

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  argTypes: {
    menuTrigger: {
      options: ["focus", "input", "manual"],
      control: "select",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {
  args: {
    label: "Favorite animal",
    placeholder: "Eg. Cat",
    items: [
      { id: 1, label: "Cat" },
      { id: 2, label: "Dog" },
      { id: 3, label: "Monkey" },
      { id: 4, label: "Horse" },
      { id: 5, label: "Bee" },
      { id: 6, label: "Fish" },
      {
        id: 7,
        label:
          "Very long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long event",
      },
      {
        id: 8,
        label: "Disabled item",
        isDisabled: true,
      },
      {
        id: 9,
        label: "Custom label",
        content: <span className="text-info-error">Custom label</span>,
      },
    ],
    showNewItemOption: true,
    onCreateNewOption: (val) => console.log("onCreateNewOption", val),
    onSelectionChange: (val) => console.log("onSelectionChange", val),
    menuTrigger: "focus",
    hideLabel: false,
    hideDropdownIcon: false,
  },
};

export const Hiddenlabel: Story = {
  args: {
    ...Default.args,
    hideLabel: true,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
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
    ...Default.args,
    error: "This is an error message",
  },
};

export const CustomNewItemMinLength: Story = {
  args: {
    ...Default.args,
    customNewItemMinLength: 1,
  },
};

export const NewItemRender: Story = {
  args: {
    ...Default.args,
    newItemRender: (label) => <span className="text-info-success">Create new &quot;{label}&quot;</span>,
  },
};
