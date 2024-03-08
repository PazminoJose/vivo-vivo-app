import { IconArrowsSort, IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import {
  MRT_Icons,
  MRT_RowData,
  MRT_TableOptions,
  MantineReactTable,
  useMantineReactTable
} from "mantine-react-table";
// import { MRT_Localization_ES } from 'mantine-react-table/locales/es';
import classes from "./DataTable.module.css";
import { MRT_Localization_ES } from "./localization";

interface DataTableProps<T extends MRT_RowData> extends MRT_TableOptions<T> {}

export default function DataTable<T extends MRT_RowData>(props: DataTableProps<T>) {
  const icons: Partial<MRT_Icons> = {
    IconArrowsSort: () => <IconArrowsSort className="text-black hover:text-black" />,
    IconSortAscending: () => <IconSortAscending className="text-black hover:text-black" />,
    IconSortDescending: () => <IconSortDescending className="text-black hover:text-black" />
  };

  const table = useMantineReactTable({
    mantinePaperProps: { className: classes.root },
    mantineFilterTextInputProps: {
      classNames: { input: "border-none" }
    },
    mantineTableContainerProps: { className: "max-h-[500px] text-black" },
    icons,
    initialState: {
      density: "xs",
      showGlobalFilter: true,
      columnPinning: {
        right: ["mrt-row-actions"]
      }
    },
    localization: MRT_Localization_ES,
    mantineBottomToolbarProps: { className: "text-black" },
    mantineFilterSelectProps: { classNames: { input: "border-none" } },
    ...props
  });

  return <MantineReactTable table={table} />;
}
