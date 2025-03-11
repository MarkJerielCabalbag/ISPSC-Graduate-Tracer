import { AccessorKeyColumnDef } from "@tanstack/react-table";

export type ModalType = {
  isOpen: boolean;
  handleIsOpen: (value: boolean) => void;
};

export type collegeDepartment = {
  id?: number;
  program?: string;
  department?: string;
};

export type TableProps<T> = {
  tableHeader?: React.ReactNode;
  tableBody?: React.ReactNode;
  tableFooter?: React.ReactNode;
  to?: string;
  data?: T[];
  column?: AccessorKeyColumnDef<T>[];

  rowLength: number;
};
