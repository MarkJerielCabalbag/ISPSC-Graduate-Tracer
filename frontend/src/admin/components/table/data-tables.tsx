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
  tableHeader: React.ReactNode;
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
    <div className="w-[100%] ">
      <Card className="rounded-md">
        <CardHeader>
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
                className="max-w-sm"
              />
            }
          />
        </CardHeader>
        <CardContent className="overflow-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <h1 className="font-normal flex items-center gap-2 leading-none opacity-70">
                        {header.column.getCanSort() ? (
                          <LucideArrowUpDown
                            onClick={
                              header.column.getCanSort()
                                ? header.column.getToggleSortingHandler()
                                : undefined
                            }
                          />
                        ) : null}
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getCanSort() && (
                          <>
                            <>
                              {header.column.getIsSorted() === "desc"
                                ? " 🔼"
                                : ""}

                              {header.column.getIsSorted() === "asc"
                                ? "  🔽"
                                : ""}
                            </>
                          </>
                        )}
                      </h1>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} onClick={() => onRowClick?.(row.original)}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-4 border-b border-blue-gray-50"
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
        </CardContent>
        <CardFooter>
          <div className={`flex flex-col gap-2 md:flex-row`}>
            <div className="flex flex-col gap-2 items-center md:flex-row">
              <Button
                className="w-full md:w-auto"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                className="w-full md:w-auto"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                className="w-full md:w-auto"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                className="w-full md:w-auto"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>

              <p>
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </p>
            </div>
            <div>
              <Select
                value={String(selectSize)}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
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
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
