"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { LucideArrowUpDown } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-[100%] ">
      <Card className="rounded-md">
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
                <tr key={row.id}>
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
      </Card>
    </div>
  );
}
