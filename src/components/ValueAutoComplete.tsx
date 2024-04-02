import { Autocomplete, AutocompleteProps } from "@mantine/core";

interface ValueAutoCompleteProps<T> extends Omit<AutocompleteProps, "data" | "value" | "onChange"> {
  value?: T;
  onChange?: (value: T) => void;
  data: T[];
  accessorLabel: keyof T;
  accessorValue: keyof T;
}

export default function ValueAutoComplete<T>({
  value,
  onChange,
  data,
  accessorLabel,
  accessorValue,
  ...otherProps
}: ValueAutoCompleteProps<T>) {
  const handleChange = (value: string) => {
    const filteredValue = data?.find((d) => d[accessorLabel] === value);
    onChange?.(filteredValue ?? ({} as T));
  };

  const filterValue = (value?: T) => {
    if (!value) return "";
    const filteredValue = data?.find((d) => d[accessorValue] === value[accessorValue]);
    return filteredValue ? (filteredValue[accessorLabel] as string) : "";
  };
  return (
    <Autocomplete
      data={data?.map((d) => d[accessorLabel] as string)}
      value={filterValue(value)}
      onChange={handleChange}
      {...otherProps}
    />
  );
}
