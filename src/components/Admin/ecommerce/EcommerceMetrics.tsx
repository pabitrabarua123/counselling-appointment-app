"use client" 

import { CalendarCheck, CircleDollarSign, Stethoscope, Users } from "lucide-react";
import Badge from "../ui/badge/Badge";
import { useEffect, useState } from "react";
import { fetchData } from "next-auth/client/_utils";

type DashboardData = {
  clients: number,
  therapists: number,
  sessions: number,
  revenue: number
}

export default function EcommerceMetrics({ data} : {data : DashboardData}) {

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
          <Users className="w-6 h-6 text-theme-dark"/>
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Clients
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
             {data.clients !== 0 ? (
                data.clients
              ) : (
                <span className="inline-block w-10 h-5 bg-gray-200 rounded animate-pulse dark:bg-gray-700"></span>
             )}
            </h4>
          </div>
          <Badge color="success">
            {/* <ArrowUpIcon /> */}
            11.01%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          {/* <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" /> */}
          <Stethoscope className="w-6 h-6 text-theme-dark" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Therapists
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
             {data.therapists !== 0 ? (
                data.therapists
              ) : (
                <span className="inline-block w-10 h-5 bg-gray-200 rounded animate-pulse dark:bg-gray-700"></span>
             )}
            </h4>
          </div>

          <Badge color="error">
            {/* <ArrowDownIcon /> */}
            9.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          {/* <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" /> */}
          <CalendarCheck className="w-6 h-6 text-theme-dark" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Session Bookings
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
             {data.sessions !== 0 ? (
                data.sessions
              ) : (
                <span className="inline-block w-10 h-5 bg-gray-200 rounded animate-pulse dark:bg-gray-700"></span>
             )}
            </h4>
          </div>

          <Badge color="error">
            {/* <ArrowDownIcon /> */}
            9.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          {/* <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" /> */}
          <CircleDollarSign className="w-6 h-6 text-theme-dark" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Revenue
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
             {data.revenue !== 0 ? (
                "$" + data.revenue
              ) : (
                <span className="inline-block w-10 h-5 bg-gray-200 rounded animate-pulse dark:bg-gray-700"></span>
             )}
            </h4>
          </div>

          <Badge color="error">
            {/* <ArrowDownIcon /> */}
            9.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
