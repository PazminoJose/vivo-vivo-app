import { IconArrowsSort, IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import {
  MRT_Icons,
  MRT_RowData,
  MRT_TableInstance,
  MRT_TableOptions,
  MantineReactTable,
  useMantineReactTable
} from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { RefObject, useEffect } from "react";
import classes from "./DataTable.module.css";

interface DataTableProps<T extends MRT_RowData> extends MRT_TableOptions<T> {
  tableRef?: RefObject<MRT_TableInstance<T> | null>;
}

export default function DataTable<T extends MRT_RowData>(props: DataTableProps<T>) {
  const {
    tableRef,
    initialState,
    mantineTableContainerProps,
    mantineBottomToolbarProps,
    mantineFilterSelectProps,
    ...tableProps
  } = props;
  const icons: Partial<MRT_Icons> = {
    IconArrowsSort: () => <IconArrowsSort className="text-black hover:text-black" />,
    IconSortAscending: () => <IconSortAscending className="text-black hover:text-black" />,
    IconSortDescending: () => <IconSortDescending className="text-black hover:text-black" />
  };

  const table = useMantineReactTable({
    enableStickyHeader: true,
    enableStickyFooter: true,
    mantinePaperProps: { className: classes.root },
    mantineFilterTextInputProps: {
      classNames: { input: "border-none" }
    },
    mantineTableContainerProps: {
      style: {
        maxHeight: "calc(100vh - 210px)"
      },
      ...{ className: "text-black max-h-[]" },
      ...mantineTableContainerProps
    },
    icons,
    initialState: {
      density: "xs",
      showGlobalFilter: true,
      columnPinning: {
        right: ["mrt-row-actions"]
      },
      ...initialState
    },
    localization: MRT_Localization_ES,
    mantineBottomToolbarProps: { ...{ className: "text-black" }, ...mantineBottomToolbarProps },
    mantineFilterSelectProps: {
      ...{ classNames: { input: "border-none" } },
      ...mantineFilterSelectProps
    },
    ...tableProps
  });

  useEffect(() => {
    if (tableRef) {
      tableRef.current = table;
    }
  }, [table, tableRef]);

  return <MantineReactTable table={table} />;
}
