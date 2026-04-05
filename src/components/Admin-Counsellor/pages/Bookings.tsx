"use client";

import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Badge from "@/components/Admin/ui/badge/Badge";
import Button from "@/components/Admin/ui/button/Button";
import Image from "next/image";
import ComponentCardTable from "../common/ComponentCardTable";
import { Order } from "@/types";
import { useSession } from "next-auth/react";

type Filters = {
  serviceType: string;
  startDate: string;
  endDate: string;
};

export default function Bookings() {
  const { data: session } = useSession();
  console.log(session?.user.id);

  const [data, setData] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    serviceType: "",
    startDate: "",
    endDate: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<Filters>(filters)

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "customerName",
      header: "Client Name",
      cell: ({ getValue }) => getValue<string>() || "N/A",
    },
    {
      accessorKey: "customerEmail",
      header: "Client Email",
      cell: ({ getValue }) => getValue<string>() || "N/A",
    },
    {
      accessorKey: "serviceType",
      header: "Session Type",
    },
    {
      accessorKey: "sessionStart",
      header: "Timing",
      cell: ({ getValue, row }) => {
       const start = new Date(getValue<string>());
       const end = new Date(row.original.sessionEnd);

       const startTime = start.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
       }).toUpperCase();

       const endTime = end.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
       }).toUpperCase();

      const date = start.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return (
        <div className="flex flex-col">
         <span className="font-medium text-gray-800">
           {startTime} – {endTime}
         </span>
         <span className="text-xs text-gray-500">{date}</span>
        </div>
      );
     },
    },
  ];

    // 0 = success, 1 = loading, 2 = result as empty
  const [loading, setLoading] = useState(0);
  const [loading_more, setLoadingMore] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const isFilterApplied =
    appliedFilters.serviceType !== "" ||
    appliedFilters.startDate !== "" ||
    appliedFilters.endDate !== "";

  const fetchBookings = async (pageNumber: number) => {
    if (pageNumber === 1) {
         setLoading(1); // full page loading
    }

    const params = new URLSearchParams({
      page: String(pageNumber),
      limit: String(limit),
      serviceType: appliedFilters.serviceType,
      startDate: appliedFilters.startDate,
      endDate: appliedFilters.endDate,
    });

    try {
      const res = await fetch(`/api/bookings?${params}&therapistId=${session?.user.id}`);
      const json = await res.json();

      console.log("Clients API - Response:", json);

      if (!res.ok) {
        setLoading(2);
        return;
      }

      const newData = json.data || [];

      if (pageNumber === 1) {
        setData(newData);
      } else {
        setData((prev) => [...prev, ...newData]);
      }

      setRowCount(json.total || 0);

      // ✅ important fix
      if (pageNumber === 1 && newData.length === 0) {
        setLoading(2);
      } else {
        setLoading(0);
      }

      setLoadingMore(false);
    } catch (err) {
      console.error(err);
      setLoading(2);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    console.log("Fetching bookings for page:", page);
    fetchBookings(page);
  }, [page, appliedFilters, session?.user.id]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const hasMore = data.length < rowCount;

  const handleExport = async () => {
    const params = new URLSearchParams({
      serviceType: appliedFilters.serviceType,
      startDate: appliedFilters.startDate,
      endDate: appliedFilters.endDate,
    });

   const res = await fetch(`/api/bookings/export?${params}&therapistId=${session?.user.id}`);
   const blob = await res.blob();
   const url = window.URL.createObjectURL(blob);

   const a = document.createElement("a");
   a.href = url;
   a.download = `Session-Bookings-${session?.user.name}.csv`;
   a.click();
 };

  return (
    <div>
      <PageBreadcrumb pageTitle="Session Bookings" />
      <ComponentCardTable title="All Bookings" setShowFilter={setShowFilter} exportData={handleExport}>
        
                {/* ✅ LOADING */}
                {loading === 1 && (
                 <div className="flex flex-col items-center justify-center py-10 text-gray-500 min-h-[400px]">
                   <Image src="/images/loading.svg" alt="Loading" width={60} height={60} />
                    {isFilterApplied ? "Filtering session bookings..." : "Getting session bookings..."}
                 </div>
                )}

       { loading === 0 && data.length > 0 && (
          <>
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
     <div className="max-w-full overflow-x-auto">
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
          </div>
        </div>

      {/* Load More Button */}  
          {hasMore && (
              <div className="mt-4 text-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setLoadingMore(true);
                    setPage((prev) => prev + 1);
                  }}
                  disabled={loading_more}
                >
                  {loading_more ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </> 
       ) 
      }
      
              {/* ✅ EMPTY (NO FILTER) */}
              {loading === 2 && !isFilterApplied && (
                <div className="flex justify-center py-10 min-h-[400px]">
                  You do not have any session bookings yet.
                </div>
              )}
      
              {/* ✅ EMPTY (WITH FILTER) */}
              {loading === 2 && isFilterApplied && (
                <div className="flex flex-col items-center py-10 min-h-[400px]">
                  <p>No session bookings found with applied filters.</p>
      
                  <Button
                    className="mt-4"
                    onClick={() => {
                      setFilters({ serviceType: "", startDate: "", endDate: "" });
                      setAppliedFilters({ serviceType: "", startDate: "", endDate: "" });
                      setPage(1);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}

      </ComponentCardTable>
      {showFilter && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          setShowFilter={setShowFilter}
          setPage={setPage}
          setAppliedFilters={setAppliedFilters}
        />
      )}
    </div>
  );
}

export const FilterModal = ({
  filters,
  setFilters,
  setShowFilter,
  setAppliedFilters,
  setPage,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setAppliedFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
    return (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[99999]">
    <div className="bg-white p-6 rounded-lg w-[420px] shadow-lg relative">    
      <h2 className="text-lg font-semibold mb-4">
        Filter Seesion Bookings
      </h2>
      <span
          className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700 absolute top-3 right-3 text-2xl"
          onClick={() => setShowFilter(false)}
        >
          &times;
      </span>
      <div className="space-y-4">

        {/* Session Type */}
        <div>
          <label className="text-sm font-medium">Session Type</label>
          <select
            className="w-full border border-gray-400 rounded px-3 py-2 mt-1 text-secondary"
            value={filters.serviceType}
            onChange={(e) =>
              setFilters({ ...filters, serviceType: e.target.value })
            }
          >
            <option value="">All</option>
            <option value="individual">Individual</option>
            <option value="couple">Couple</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            className="w-full border border-gray-400 rounded px-3 py-2 mt-1 text-secondary"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />
        </div>

        {/* End Date */}
        <div>
          <label className="text-sm font-medium">End Date</label>
          <input
            type="date"
            className="w-full border border-gray-400 rounded px-3 py-2 mt-1 text-secondary"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          className="px-4 py-2 text-sm bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
          onClick={() => {
  setFilters({
    serviceType: "",
    startDate: "",
    endDate: "",
  });

  setAppliedFilters({
    serviceType: "",
    startDate: "",
    endDate: "",
  });

  setPage(1);
}}
        >
          Reset
        </button>
        <button
          className="px-4 py-2 text-sm bg-primary text-white rounded cursor-pointer hover:bg-primary/90"
          onClick={() => {
            setShowFilter(false);
            setAppliedFilters(filters);
            setPage(1);
          }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
    )
}