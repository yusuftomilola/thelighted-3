"use client";

import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "../../ui/Button";

interface AuditLogsTableProps {
  data: any[];
}

export function AuditLogsTable({ data }: AuditLogsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "action",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center gap-2 hover:text-orange-600"
          >
            Action <ArrowUpDown className="w-4 h-4" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium uppercase">
            {row.original.action}
          </span>
        ),
      },
      {
        accessorKey: "entityType",
        header: "Entity",
        cell: ({ row }) => (
          <div>
            <div className="font-medium text-gray-900 capitalize">
              {row.original.entityType}
            </div>
            {row.original.entityId && (
              <div className="text-xs text-gray-400 font-mono truncate max-w-[120px]">
                {row.original.entityId}
              </div>
            )}
          </div>
        ),
      },
      {
        accessorKey: "actorUsername",
        header: "Actor",
        cell: ({ row }) => (
          <div>
            <div className="font-medium text-gray-900">
              {row.original.actorUsername ?? "System"}
            </div>
            {row.original.actorRole && (
              <div className="text-xs text-gray-400 capitalize">
                {row.original.actorRole}
              </div>
            )}
          </div>
        ),
      },
      {
        accessorKey: "details",
        header: "Details",
        cell: ({ row }) => (
          <span className="text-sm text-gray-600 truncate max-w-xs block">
            {typeof row.original.details === "string"
              ? row.original.details
              : JSON.stringify(row.original.details)}
          </span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center gap-2 hover:text-orange-600"
          >
            Time <ArrowUpDown className="w-4 h-4" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(row.original.createdAt), {
              addSuffix: true,
            })}
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 15 } },
  });

  return (
    <div className="space-y-4">
      <input
        type="search"
        placeholder="Search logs..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th
                      key={h.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No audit logs found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {table.getPageCount() > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing{" "}
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              –
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                data.length
              )}{" "}
              of {data.length}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
