"use client"

import Badge from "../ui/badge/Badge";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Order } from "@/types";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender
} from "@tanstack/react-table";
import Image from "next/image";

export default function RecentOrders() {
  const router = useRouter();
  
  const [data, setData] = useState<Order[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const columns: ColumnDef<Order>[] = [
      {
        accessorKey: "customerName",
        header: "Client Name",
        cell: ({ getValue }) => getValue<string>() || "N/A",
      },
      {
        accessorKey: "therapist.name",
        header: "Counsellor",
      },
      {
        accessorKey: "serviceType",
        header: "Session Type",
      }
    ];

    const fetchBookings = async (pageNumber: number) => {
    setLoading(true);

    const params = new URLSearchParams({
      page: String(pageNumber),
      limit: String(6),
    });

    const res = await fetch(`/api/bookings?${params}`);
    const json = await res.json();

    if (pageNumber === 1) {
      setData(json.data);
    } else {
      setData((prev) => [...prev, ...json.data]);
    }

    setRowCount(json.total);
    setLoading(false);
  };

  useEffect(() => {
      console.log("Fetching bookings for page:", page);
      fetchBookings(page);
  }, [page]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Session Bookings
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button 
            className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            onClick={() => router.push('/admin/session-bookings')}
            >
            See all
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        { data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500 min-h-[370px]">
            <Image src="/images/loading.svg" alt="Loading" width={60} height={60} /> Loading sessions...
          </div>
        )}
        { data.length !== 0 && (
        <table border={1} width="100%" className="min-w-full">
                <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className=" px-5 py-3 font-medium text-gray-800 text-start text-xs dark:text-gray-400">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
        
        <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-gray-50 even:bg-white">
              {row.getVisibleCells().map((cell, index) => (
                <td
                  key={cell.id}
                  className="px-5 py-4 sm:px-6 text-start text-sm text-gray-500"
                >
                  {index === 2 ? (
                    <Badge
                      variant="light"
                      color={cell.getValue() === "individual" ? "primary" : "couple"}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Badge>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
        )}
      </div>
    </div>
  );
}
