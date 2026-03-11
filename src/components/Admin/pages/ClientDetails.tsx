"use client";

import PageBreadcrumb from "../common/PageBreadCrumb";
import { useEffect, useState } from "react";
import { Client } from "@/types";
import Image from "next/image";

export default function ClientDetails({ id }: { id: string }) {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchClientDetails = async (clientId: string) => {
    fetch(`/api/clients?id=${clientId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Client details:", data);
        setClient(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching client details:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      fetchClientDetails(id);
    }
  }, [id]);

  return (
    <>
      <PageBreadcrumb pageTitle="Client Details" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        {loading && (
          <div className="flex flex-col items-center justify-center py-30 text-gray-500">
            <Image src="/images/loading.svg" alt="Loading" width={60} height={60} /> Getting client details...
          </div>
        )}
        { client && (
        <div className="space-y-6">
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {client?.name || ""}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {client?.sessionType || ""}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {client?.gender || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
       <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-5 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {client?.name || ""}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Gender
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {client?.gender || ""}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                { client?.email || "" }
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                { client?.phoneNumber || "" }
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Age
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {client?.age || ""}+ years old
              </p>
              </div>
             </div>
            </div>
           </div>
          </div>
       <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Session Details
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-5 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Session Type
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {client?.sessionType || ""}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Counsellor
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  { client?.therapist?.name || "" }
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Language Preference
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {client?.languages.join(", ") || ""}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                   Issues
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {client?.issues.join(", ") || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      )}
      </div>
    </>
  );
}
