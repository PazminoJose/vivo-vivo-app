import { Select, SelectProps } from "@mantine/core";

interface DataSelectProps<T> extends Omit<SelectProps, "value" | "onChange" | "data"> {
  value?: number;
  onChange?: (value: number) => void;
  data: T[];
  accessorLabel: keyof T;
  accessorValue: keyof T;
}

export default function DataSelect<T>(props: DataSelectProps<T>) {
  const { value, onChange, data, accessorLabel, accessorValue, ...otherProps } = props;
  return (
    <Select
      value={value?.toString()}
      onChange={(value) => onChange?.(Number(value) || 0)}
      data={data?.map((d) => ({
        label: d[accessorLabel] as string,
        value: (d[accessorValue] as number).toString()
      }))}
      {...otherProps}
    />
  );
}
// export default function DataSelectInner<T>(props: DataSelectProps<T>, ref: Ref<HTMLInputElement>) {
//   const { value, onChange, data, accessorLabel, accessorValue, ...otherProps } = props;
//   return (
//     <Select
//       value={value?.toString()}
//       onChange={(value) => onChange?.(Number(value) || 0)}
//       data={data?.map((d) => ({
//         label: d[accessorLabel] as string,
//         value: (d[accessorValue] as number).toString()
//       }))}
//       {...otherProps}
//     />
//   );
// }

// export const DataSelect = forwardRef(DataSelectInner) as unknown as <T>(props: DataSelectProps<T> & { ref?: Ref<HTMLInputElement> }) => ReactElement;

//  export default DataSelect;
