import { MultiSelect, MultiSelectProps } from "@mantine/core";

interface DataMultiSelectProps<T> extends Omit<MultiSelectProps, "value" | "onChange" | "data"> {
  data: T[];
  accessorLabel: keyof T;
  accessorValue: keyof T;
  onChange?: (value: number[]) => void;
}

export default function DataMultiSelect<T>(props: DataMultiSelectProps<T>) {
  const { data, accessorLabel, accessorValue, onChange, ...otherProps } = props;

  return (
    <MultiSelect
      data={data.map((value) => ({
        label: value[accessorLabel] as string,
        value: (value[accessorValue] as number).toString()
      }))}
      onChange={(value) => {
        if (onChange) onChange(value.map(Number));
      }}
      {...otherProps}
    />
  );
}
