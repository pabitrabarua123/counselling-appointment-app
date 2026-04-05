"use client";

import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import Image from "next/image";
import ComponentCardTable from "../common/ComponentCardTable";
import { Star } from "lucide-react";
import { Therapist } from "@/types";

type Filters = {
  area: string;
  rating: number | null;
  gender: string;
  languages: string;
};

export default function Therapists() {
  const [data, setData] = useState<Therapist[]>([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    area: "",
    rating: null,
    gender: "",
    languages: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<Filters>(filters)

  const columns: ColumnDef<Therapist>[] = [
    {
      accessorKey: "user.name",
      header: "Name",
      cell: ({ getValue }) => getValue<string>() || "N/A",
    },
    {
      accessorKey: "area",
      header: "Area of Expertise",
      cell: ({ getValue }) => {
        const areas = getValue<string[]>();
        return (
         <div className="flex flex-wrap gap-2">
          {areas?.map((area, index) => (
            <Badge key={index} variant="light" color="primary">
              {area}
            </Badge>
          ))}
         </div>
       );
      },
    },
{
  header: "Number of Sessions",
  accessorFn: (row) => row.user?.orders?.length ?? 0,
  cell: ({ getValue }) => getValue<number>() || "0",
},
    {
  accessorKey: "rating",
  header: "Rating",
  cell: ({ getValue }) => {
    const rating = getValue<number>() || 0;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  },
},
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
      <div className="flex gap-2">
       <button
         className="px-3 py-1.5 text-xs font-medium text-secondary bg-light rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 flex items-center gap-1"
         onClick={() => {
            window.open(`/admin/therapists/${row.original.user.id}`, "_blank");
         }}
        >
         Details
       </button>
      </div>
      ),
    },
  ];

  // 0 = success, 1 = loading, 2 = result as empty
  const [loading, setLoading] = useState(0);
  const [loading_more, setLoadingMore] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const isFilterApplied =
    appliedFilters.area !== "" ||
    appliedFilters.rating !== null ||
    appliedFilters.gender !== "" ||
    appliedFilters.languages !== "";

  const fetchTherapists = async (pageNumber: number) => {
    if (pageNumber === 1) {
         setLoading(1); // full page loading
    }

    const params = new URLSearchParams({
      page: String(pageNumber),
      limit: String(limit),
      area: appliedFilters.area,
      rating: appliedFilters.rating ? String(appliedFilters.rating) : "",
      gender: appliedFilters.gender,
      languages: appliedFilters.languages,

    });

    try {
      const res = await fetch(`/api/therapist?${params}`);
      const json = await res.json();

      console.log("Therapists API - Response:", json);

      if (!res.ok) {
        setLoading(2);
        return;
      }

      const newData = json.therapists || [];

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
    console.log("Fetching therapists for page:", page);
    fetchTherapists(page);
  }, [page, appliedFilters]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const hasMore = data?.length < rowCount;

  const handleExport = async () => {
    const params = new URLSearchParams({
      area: appliedFilters.area,
      rating: appliedFilters.rating ? String(appliedFilters.rating) : "",
      gender: appliedFilters.gender,
      languages: appliedFilters.languages,
    });

   const res = await fetch(`/api/therapist/export?${params}`);
   const blob = await res.blob();
   const url = window.URL.createObjectURL(blob);

   const a = document.createElement("a");
   a.href = url;
   a.download = "therapists.csv";
   a.click();
 };

  return (
    <div>
      <PageBreadcrumb pageTitle="Therapists" />
      <ComponentCardTable title="All Therapists" setShowFilter={setShowFilter} exportData={handleExport}>
       
                   {/* ✅ LOADING */}
                     {loading === 1 && (
                       <div className="flex flex-col items-center justify-center py-10 text-gray-500 min-h-[400px]">
                         <Image src="/images/loading.svg" alt="Loading" width={60} height={60} />
                         {isFilterApplied ? "Filtering therapists..." : "Getting therapists..."}
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
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className="px-5 py-4 sm:px-6 text-start text-sm text-gray-500"
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
       ) }   
           
               {/* ✅ EMPTY (NO FILTER) */}
                 {loading === 2 && !isFilterApplied && (
                   <div className="flex justify-center py-10 min-h-[400px]">
                     No therapists found.
                   </div>
                 )}
             
               {/* ✅ EMPTY (WITH FILTER) */}
                 {loading === 2 && isFilterApplied && (
                   <div className="flex flex-col items-center py-10 min-h-[400px]">
                     <p>No therapists found with applied filters.</p>
                     <Button
                       className="mt-4"
                       onClick={() => {
                         setFilters({ area: "", rating: null, gender: "", languages: "" });
                         setAppliedFilters({ area: "", rating: null, gender: "", languages: "" });
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
        Filter Therapists
      </h2>
      <span
          className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700 absolute top-3 right-3 text-2xl"
          onClick={() => setShowFilter(false)}
        >
          &times;
      </span>
      <div className="space-y-4">

        {/* Area */}
        <div>
          <label className="text-sm font-medium">Area of Expertise</label>
          <select
            className="w-full border border-gray-400 rounded px-3 py-2 mt-1 text-secondary"
            value={filters.area}
            onChange={(e) => setFilters({ ...filters, area: e.target.value })}
          >
            <option value="">All Areas</option>
            <option value="Anxiety">Anxiety</option>
            <option value="Depression">Depression</option>
            <option value="Stress">Stress</option>
            <option value="Relationship Issues">Relationship Issues</option>
            <option value="Trauma">Trauma</option>
            <option value="Self-esteem">Self-Esteem</option>
            <option value="Grief and Loss">Grief and Loss</option>
            <option value="Addiction">Addiction</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="text-sm font-medium">Gender</label>
          <select
            className="w-full border border-gray-400 rounded px-3 py-2 mt-1 text-secondary"
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm font-medium">Star Rating</label>
          <select
            className="w-full border border-gray-400 rounded px-3 py-2 mt-1 text-secondary"
            value={filters.rating || ""}
            onChange={(e) => setFilters({ ...filters, rating: e.target.value ? Number(e.target.value) : null })}
          >
            <option value="">All Ratings</option>
            <option value="1">1 Star & Up</option>
            <option value="2">2 Stars & Up</option>
            <option value="3">3 Stars & Up</option>
            <option value="4">4 Stars & Up</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="text-sm font-medium">Language</label>
          <select
            className="w-full border border-gray-400 rounded px-3 py-2 mt-1 text-secondary"
            value={filters.languages}
            onChange={(e) => setFilters({ ...filters, languages: e.target.value })}
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
            <option value="Hindi">Hindi</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          className="px-4 py-2 text-sm bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
          onClick={() => {
  setFilters({
    area: "",
    rating: null,
    gender: "",
    languages: "",
  });

  setAppliedFilters({
    area: "",
    rating: null,
    gender: "",
    languages: "",
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