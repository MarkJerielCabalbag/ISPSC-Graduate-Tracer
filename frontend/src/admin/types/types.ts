import type {
  AccessorKeyColumnDef,
  AccessorKeyColumnDefBase,
  ColumnDef,
  ColumnFiltersColumnDef,
  IdIdentifier,
  PartialKeys,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { AdminColumnDef } from "../hooks/useTable";

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

export type TableProps<T> = {
  tableHeader?: React.ReactNode;
  tableBody?: React.ReactNode;
  tableFooter?: React.ReactNode;
  to?: string;
  data?: AdminColumnDef[];
  column?: AccessorKeyColumnDefBase<AdminColumnDef, string> &
    Partial<IdIdentifier<AdminColumnDef, string>>[];
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
