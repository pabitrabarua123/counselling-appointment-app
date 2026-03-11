"use client";

import PageBreadcrumb from "../common/PageBreadCrumb";
import { useEffect, useState } from "react";
import { Therapist } from "@/types";
import Image from "next/image";

export default function TherapistDetails({ id }: { id: string }) {
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTherapistDetails = async (therapistId: string) => {
    fetch(`/api/therapist?id=${therapistId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Therapist details:", data);
        setTherapist(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching therapist details:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      fetchTherapistDetails(id);
    }
  }, [id]);

  return (
    <>
      <PageBreadcrumb pageTitle="Therapist Details" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        {loading && (
          <div className="flex flex-col items-center justify-center py-30 text-gray-500">
            <Image src="/images/loading.svg" alt="Loading" width={60} height={60} /> Getting therapist details...
          </div>
        )}
        { therapist && (
        <div className="space-y-6">
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <Image src={therapist?.profilePic || "/images/user/owner.jpg"} alt="user" width={80} height={80} />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {therapist?.user.name || ""}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {therapist?.area.join(", ") || ""}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {therapist?.yearOfExp || ""}+ years of experience
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
                {therapist?.user.name || ""}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Gender
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {therapist?.gender || ""}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                { therapist?.user.email || "" }
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                { therapist?.phoneNumber || "" }
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
              Professional Details
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-5 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Qualification
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {therapist?.degree || ""}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Area of Expertise
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  { therapist?.area.join(", ") || "" }
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Language Preference
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {therapist?.languages.join(", ") || ""}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                   Years of Experience
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {therapist?.yearOfExp || ""}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                   Google Calendar ID
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {therapist?.googleCalendarId || ""}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                   Session Taken
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {therapist?.user.orders.length || "0"}
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
