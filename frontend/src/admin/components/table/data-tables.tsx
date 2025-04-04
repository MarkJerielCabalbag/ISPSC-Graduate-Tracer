"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LucideArrowUpDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";
import React from "react";
import { Input } from "../../../components/ui/input";

import Headers from "./headers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableHeader?: React.ReactNode;
  filterInputName: string;
  serachFor?: string;
  onRowClick?: (row: any) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tableHeader,
  filterInputName,
  serachFor,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    rowCount: data.length,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      pagination,
    },
  });
  const [selectSize, setSelectSize] = React.useState(
    table.getState().pagination.pageSize
  );

  const [rowCount, _] = React.useState(data.length);

  const handlePageSizeChange = (value: any) => {
    setSelectSize(Number(value));
    setPagination((prev) => ({
      ...prev,
      pageSize: Number(value),
    }));
    table.setPageSize(Number(value));
  };

  return (
    <div className="w-full">
      <Card className="rounded-md">
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
          <Headers
            title={tableHeader}
            content={
              <Input
                placeholder={`Search for ${serachFor}`}
                value={
                  (table
                    .getColumn(filterInputName)
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn(filterInputName)
                    ?.setFilterValue(event.target.value)
                }
                className="w-full sm:max-w-sm"
              />
            }
          />
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          <div className="flex items-center gap-2">
                            {header.column.getCanSort() && (
                              <LucideArrowUpDown
                                className="h-4 w-4 cursor-pointer"
                                onClick={
                                  header.column.getCanSort()
                                    ? header.column.getToggleSortingHandler()
                                    : undefined
                                }
                              />
                            )}
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            {header.column.getCanSort() && (
                              <span className="ml-1">
                                {header.column.getIsSorted() === "desc"
                                  ? " 🔼"
                                  : header.column.getIsSorted() === "asc"
                                  ? " 🔽"
                                  : ""}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => onRowClick?.(row.original)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-4">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-gray-600">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
            </div>
            <Select
              value={String(selectSize)}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Rows per page" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: "10", label: "10" },
                  { value: "20", label: "20" },
                  { value: "30", label: "30" },
                  { value: "40", label: "40" },
                  { value: rowCount, label: "All" },
                ].map((sizeOption) => (
                  <SelectItem
                    key={sizeOption.value}
                    value={sizeOption.value as string}
                  >
                    Show {sizeOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
