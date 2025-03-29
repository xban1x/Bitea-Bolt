import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";

import { Button } from "@/components/ui/buttons/Button/Button";
import { Autocomplete } from "@/components/ui/inputs/Autocomplete/Autocomplete";
import { Checkbox } from "@/components/ui/inputs/Checkbox/Checkbox";
import { DatePicker } from "@/components/ui/inputs/DateTime/DatePicker/DatePicker";
import { DateTimePicker } from "@/components/ui/inputs/DateTime/DateTimePicker/DateTimePicker";
import { SplitDateTimePicker } from "@/components/ui/inputs/DateTime/SplitDateTimePicker/SplitDateTimePicker";
import { TimePicker } from "@/components/ui/inputs/DateTime/TimePicker/TimePicker";
import { RadioGroup } from "@/components/ui/inputs/RadioGroup/RadioGroup";
import { Select } from "@/components/ui/inputs/Select/Select";
import { Slider } from "@/components/ui/inputs/Slider/Slider";
import { PasswordInput } from "@/components/ui/inputs/TextInput/PasswordInput";
import { TextArea } from "@/components/ui/inputs/TextInput/TextArea";
import { TextInput } from "@/components/ui/inputs/TextInput/TextInput";
import { Toggle } from "@/components/ui/inputs/Toggle/Toggle";
import { useForm } from "@/hooks/useForm";

enum OptionEnum {
  Option1 = "option-1",
  Option2 = "option-2",
}

const FormSchema = z.object({
  input: z.string(),
  numberInput: z.number(),
  textArea: z.string(),
  password: z.string(),
  selectSingleMode: z.nativeEnum(OptionEnum),
  selectMultipleMode: z.array(z.nativeEnum(OptionEnum)),
  autocomplete: z.nativeEnum(OptionEnum),
  slider: z.number(),
  checkbox: z.boolean(),
  toggle: z.boolean(),
  radioGroup: z.nativeEnum(OptionEnum),
  date: z.string(),
  time: z.string(),
  dateTime: z.string(),
  splitDateTime: z.string(),
});
type FormType = z.infer<typeof FormSchema>;

const options = [
  { id: OptionEnum.Option1, label: "Option 1" },
  { id: OptionEnum.Option2, label: "Option 2" },
];

interface Props {
  defaultValues?: FormType;
  disabled?: boolean;
}

const FormStory = ({ defaultValues, disabled }: Props) => {
  const { control, handleSubmit, reset } = useForm({
    zodSchema: FormSchema,
    defaultValues,
    disabled,
  });

  const onSubmit = (values: FormType) => {
    console.log("onSubmit", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextInput formControl={{ control, name: "input" }} label="Input label" />

      <TextInput type="number" formControl={{ control, name: "numberInput" }} label="Number input label" />

      <TextArea formControl={{ control, name: "textArea" }} label="TextArea label" />

      <PasswordInput formControl={{ control, name: "password" }} label="Password label" />

      <Select
        formControl={{ control, name: "selectSingleMode" }}
        label="Select single mode label"
        placeholder="Select option..."
        items={options}
      />

      <Select
        formControl={{ control, name: "selectMultipleMode" }}
        selectionMode="multiple"
        label="Select multiple mode label"
        placeholder="Select option..."
        items={options}
      />

      <Autocomplete formControl={{ control, name: "autocomplete" }} label="Autocomplete label" items={options} />

      <Slider formControl={{ control, name: "slider" }} label="Percentage" unit="%" />

      <Checkbox formControl={{ control, name: "checkbox" }}>Checkbox text</Checkbox>

      <Toggle formControl={{ control, name: "toggle" }}>Toggle text</Toggle>

      <RadioGroup
        formControl={{ control, name: "radioGroup" }}
        label="RadioGroup label"
        options={[
          { value: OptionEnum.Option1, label: "Option 1" },
          { value: OptionEnum.Option2, label: "Option 2" },
        ]}
      />

      <DatePicker formControl={{ control, name: "date" }} label="DatePicker label" />

      <TimePicker formControl={{ control, name: "time" }} label="TimePicker label" />

      <DateTimePicker formControl={{ control, name: "dateTime" }} label="DateTimePicker label" />

      <SplitDateTimePicker formControl={{ control, name: "splitDateTime" }} label="SplitDateTimePicker label" />

      <div className="flex gap-4">
        <Button type="submit">Submit</Button>
        <Button variant="secondary" onPress={() => reset()}>
          Reset
        </Button>
      </div>
    </form>
  );
};

const meta: Meta<typeof FormStory> = {
  component: FormStory,
};

export default meta;

type Story = StoryObj<typeof FormStory>;

export const Default: Story = {
  args: {},
};

export const WithDefaultValues: Story = {
  args: {
    defaultValues: {
      input: "Input value",
      numberInput: 3,
      textArea: "TextArea value",
      password: "123",
      selectSingleMode: OptionEnum.Option1,
      selectMultipleMode: [OptionEnum.Option1],
      autocomplete: OptionEnum.Option1,
      slider: 50,
      checkbox: true,
      toggle: true,
      radioGroup: OptionEnum.Option1,
      date: "2025-03-04",
      time: new Date(2025, 2, 4, 16, 0, 0).toISOString(),
      dateTime: new Date(2025, 2, 4).toISOString(),
      splitDateTime: new Date(2025, 2, 4, 16, 0, 0).toISOString(),
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
