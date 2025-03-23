import type { Column, Row, useReactTable } from "@tanstack/react-table";
import { ChartConfig } from "../../components/ui/chart";

export type ModalType = {
  isOpen: boolean;
  handleIsOpen: (value: boolean) => void;
};

export type collegeDepartment = {
  id?: number;
  program?: string;
  department?: string;
};

export interface ColumnFilter {
  id: string;
  value: unknown;
}

export type TableProps<TData> = {
  tableHeader?: React.ReactNode;
  tableBody?: React.ReactNode;
  tableFooter?: React.ReactNode;
  to?: string;
  data?: TData[];
  column?: Column<any, unknown>[] | undefined;
  rowLength?: number;
};

export type FormatData<T, U> = {
  yearData?: T;
  programData?: U;
};

export type OverviewTracedGraduates = {
  id: string;
  department: string;
  totalTracedGraduates: number;
};

export type FilterType<T> = {
  table: typeof useReactTable;
  setColumnFilters: () => void;
  statuses: T[];
  status: string;
  isActive: boolean;
  columnFilters: [];
};

//export type ColumnFiltersState<T> = ColumnFilter<T>[];

export type FilterFn = (
  row: Row<any>,
  columnId: string,
  filterValue: any,
  addMeta: (meta: any) => void
) => boolean;

export type TotalGraduatesType = {
  id?: number;
  program?: string;
  department?: string;
  totalGraduates?: number;
  yearOfGraduation?: number;
};

export type Graduates = {
  major: string;
  totalCount: number;
  totalEmployed: number;
  totalNotEmployed: number;
};

export type PercenatgeType = {
  major: string;
  totalPercentageTraced: number;
  totalPercentageUntraced: number;
  fill: string;
};

export const maroonPalette = [
  "#800000", // Maroon
  "#FFD700", // Gold
  "#D4AF37", // Metallic Gold
  "#8B4513", // Saddle Brown
  "#C0C0C0", // Silver
  "#A52A2A", // Brown
  "#FAEBD7", // Antique White
  "#4682B4", // Steel Blue
  "#556B2F", // Dark Olive Green
];

export const chartConfigBar = {
  totalEmployed: {
    label: "Employed",
    color: "hsl(var(--chart-1))",
  },
  totalNotEmployed: {
    label: "Not Employed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
