import type { Column, Row, useReactTable } from "@tanstack/react-table";

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
