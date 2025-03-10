import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";

import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LucideArrowUpDown,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Select } from "../../../components/ui/select";
import { TableProps } from "../../types/types";

const DataTable = <T,>({
  tableHeader,
  data,
  column,
}: //   onRowClick,
TableProps<T>) => {
  const navigate = useNavigate();

  const memoData = useMemo(() => data || [], [data]);

  const columns = useMemo(() => column || [], [column]);

  const [rowCount, setRowCount] = useState(memoData.length);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: memoData,
    columns,
    initialState: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    rowCount: memoData.length,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const [selectSize, setSelectSize] = useState(
    table.getState().pagination.pageSize
  );

  const handlePageSizeChange = (value: any) => {
    setSelectSize(Number(value));
    setPagination((prev) => ({
      ...prev,
      pageSize: Number(value),
    }));
    table.setPageSize(Number(value));
  };
  return (
    <>
      <Card>
        <CardHeader className="rounded-none">{tableHeader}</CardHeader>
        <CardContent>
          <table className="w-full min-w-max table-auto text-left">
            <thead className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <h1
                        color="blue-gray"
                        className="font-normal flex items-center gap-2 leading-none opacity-70"
                      >
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
                <tr key={row.id} /*onClick={() => onRowClick?.(row.original)}*/>
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
                // onChange={handlePageSizeChange}
              >
                {[
                  { value: "10", label: "10" },
                  { value: "20", label: "20" },
                  { value: "30", label: "30" },
                  { value: "40", label: "40" },
                  { value: rowCount, label: "All" },
                ].map((sizeOption) => (
                  <option
                    key={sizeOption.value}
                    value={sizeOption.value as string}
                  >
                    Show {sizeOption.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default DataTable;
