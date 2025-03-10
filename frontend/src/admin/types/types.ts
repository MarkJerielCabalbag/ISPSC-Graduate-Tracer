export type TableProps<T> = {
  tableHeader?: React.ReactNode;
  tableBody?: React.ReactNode;
  tableFooter?: React.ReactNode;
  to?: string;
  data?: T[];
  column?: AccessorKeyColumnDef<T>[];

  setPagination: (prev: PaginationProps) => void;
  rowLength: number;
};
