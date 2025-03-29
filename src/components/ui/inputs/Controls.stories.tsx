import type { Meta, StoryObj } from "@storybook/react";
import { FormEvent, useState } from "react";

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

enum OptionEnum {
  Option1 = "option-1",
  Option2 = "option-2",
}

interface FormType {
  input: string;
  numberInput: number;
  textArea: string;
  password: string;
  selectSingleMode: OptionEnum;
  selectMultipleMode: OptionEnum[];
  autocomplete: OptionEnum;
  slider: number;
  checkbox: boolean;
  toggle: boolean;
  radioGroup: OptionEnum;
  date: string;
  dateTime: string;
  splitDateTime: string;
  time: string;
}

const options = [
  { id: OptionEnum.Option1, label: "Option 1" },
  { id: OptionEnum.Option2, label: "Option 2" },
];

interface Props {
  defaultValues?: FormType;
  disabled?: boolean;
}

const FormStory = ({ defaultValues, disabled }: Props) => {
  const [input, setInput] = useState(defaultValues?.input);
  const [numberInput, setNumberInput] = useState(defaultValues?.numberInput);
  const [textArea, setTextArea] = useState(defaultValues?.textArea);
  const [password, setPassword] = useState(defaultValues?.password);
  const [selectSingleMode, setSelectSingleMode] = useState(defaultValues?.selectSingleMode);
  const [selectMultipleMode, setSelectMultipleMode] = useState(defaultValues?.selectMultipleMode);
  const [autocomplete, setAutocomplete] = useState(defaultValues?.autocomplete);
  const [slider, setSlider] = useState(defaultValues?.slider);
  const [checkbox, setCheckbox] = useState(defaultValues?.checkbox);
  const [toggle, setToggle] = useState(defaultValues?.toggle);
  const [radioGroup, setRadioGroup] = useState(defaultValues?.radioGroup);
  const [date, setDate] = useState<string | null>(defaultValues?.date ?? null);
  const [time, setTime] = useState<string | null>(defaultValues?.time ?? null);
  const [dateTime, setDateTime] = useState<string | null>(defaultValues?.dateTime ?? null);
  const [splitDateTime, setSplitDateTime] = useState<string | null>(defaultValues?.splitDateTime ?? null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("onSubmit", {
      input,
      numberInput,
      textArea,
      selectSingleMode,
      selectMultipleMode,
      autocomplete,
      slider,
      checkbox,
      toggle,
      radioGroup,
      date,
      time,
      dateTime,
      splitDateTime,
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <TextInput value={input} onChange={(e) => setInput(e.target.value)} label="Input label" isDisabled={disabled} />

      <TextInput
        type="number"
        value={numberInput}
        onChange={(e) => setNumberInput(+e.target.value)}
        label="Number input label"
        isDisabled={disabled}
      />

      <TextArea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
        label="TextArea label"
        isDisabled={disabled}
      />

      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password label"
        isDisabled={disabled}
      />

      <Select
        value={selectSingleMode}
        onChange={setSelectSingleMode}
        label="Select single mode label"
        placeholder="Select option..."
        items={options}
        isDisabled={disabled}
      />

      <Select
        value={selectMultipleMode}
        onChange={setSelectMultipleMode}
        selectionMode="multiple"
        label="Select multiple mode label"
        placeholder="Select option..."
        items={options}
        isDisabled={disabled}
      />

      <Autocomplete
        selectedKey={autocomplete}
        onSelectionChange={(val) => setAutocomplete(val as OptionEnum)}
        label="Autocomplete label"
        items={options}
        isDisabled={disabled}
      />

      <Slider value={slider} onChange={setSlider} label="Percentage" unit="%" isDisabled={disabled} />

      <Checkbox isSelected={checkbox} onChange={setCheckbox} isDisabled={disabled}>
        Checkbox text
      </Checkbox>

      <Toggle isSelected={toggle} onChange={setToggle} isDisabled={disabled}>
        Toggle text
      </Toggle>

      <RadioGroup
        value={radioGroup}
        onChange={(val) => setRadioGroup(val as OptionEnum)}
        label="RadioGroup label"
        options={[
          { value: OptionEnum.Option1, label: "Option 1" },
          { value: OptionEnum.Option2, label: "Option 2" },
        ]}
        isDisabled={disabled}
      />

      <DatePicker value={date} onChange={setDate} label="DatePicker label" isDisabled={disabled} />

      <TimePicker value={time} onChange={setTime} label="TimePicker label" isDisabled={disabled} />

      <DateTimePicker value={dateTime} onChange={setDateTime} label="DateTimePicker label" isDisabled={disabled} />

      <SplitDateTimePicker
        value={splitDateTime}
        onChange={setSplitDateTime}
        label="SplitDateTimePicker label"
        isDisabled={disabled}
      />

      <div className="flex gap-4">
        <Button type="submit">Submit</Button>
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
      dateTime: new Date(2025, 2, 4).toISOString(),
      time: new Date(2025, 2, 4, 16, 0, 0).toISOString(),
      splitDateTime: new Date(2025, 2, 4, 16, 0, 0).toISOString(),
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
