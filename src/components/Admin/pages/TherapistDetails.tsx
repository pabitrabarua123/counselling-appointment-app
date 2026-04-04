"use client";

import PageBreadcrumb from "../common/PageBreadCrumb";
import { useEffect, useState } from "react";
import { Therapist } from "@/types";
import Image from "next/image";
import { Mail, VenusAndMars, Phone } from "lucide-react";
import Badge from "@/components/ui/badge/Badge";
import { Modal } from "../ui/modal";
import { useModal } from "../hooks/useModal"; 
import { toast } from "react-toastify";

export default function TherapistDetails({ id }: { id: string }) {
  const { isOpen, openModal, closeModal } = useModal();

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

  const formatDays = {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
  };

  const timeSlots = [
    { value: "9", label: "9AM - 10AM" },
    { value: "10", label: "10AM - 11AM" },
    { value: "11", label: "11AM - 12PM" },
    { value: "13", label: "13PM - 14PM" },
    { value: "14", label: "14PM - 15PM" },
    { value: "15", label: "15PM - 16PM" },
    { value: "16", label: "16PM - 17PM" },
    { value: "17", label: "17PM - 18PM" },
    { value: "18", label: "18PM - 19PM" },
    { value: "19", label: "19PM - 20PM" },
    { value: "20", label: "20PM - 21PM" },  
  ];

  const [approvalStatus, setApprovalStatus] = useState(0);
  const handleApproveTherapist = async () => {
    setApprovalStatus(1);
    const response = await fetch(`/api/approve-therapist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: therapist?.id }),
    });
    
    if (response.ok) {
      toast.success("Therapist approved successfully");
      setApprovalStatus(2);
      fetchTherapistDetails(id);
    }else {
      setApprovalStatus(3);
      toast.error("Failed to approve therapist");
    }
    closeModal();
  };


  return (
    <>
      <PageBreadcrumb pageTitle="Therapist Details" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        {loading && (
          <div className="flex flex-col items-center justify-center py-40 text-gray-500">
            <Image src="/images/loading.svg" alt="Loading" width={60} height={60} /> Getting therapist details...
          </div>
        )}
        { therapist && (
        <div className="space-y-6">
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex flex-col w-full gap-6 xl:flex-row">
            <div className="w-50 h-50 overflow-hidden border border-gray-200 rounded-md dark:border-gray-800">
              <Image src={therapist?.profilePic || "/images/user/owner.jpg"} alt="user" width={250} height={250} />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {therapist?.user.name || ""}
              </h4>
              <div className="space-y-4">
                <p className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <VenusAndMars size={20} color="#009688"/> {therapist?.gender || ""}
                </p>
                <p className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Mail size={18} color="#009688"/> {therapist?.user.email || ""}
                </p>
                <p className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Phone size={18} color="#009688"/> {therapist?.phoneNumber || ""}
                </p>
              </div>
            </div>
          </div>
          { therapist?.isVerified ? (
              <span className="max-h-fit flex inline-flex whitespace-nowrap items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
            Active
          </span>
            ) : (
          <button
            onClick={() => openModal()}
            className="cursor-pointer max-h-fit flex inline-flex whitespace-nowrap items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            Pending Approval
          </button>
            )}
        </div>
      </div>
<Modal
  isOpen={isOpen}
  onClose={closeModal}
  showCloseButton={true}
  className="max-w-md"
>
  <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
    <div className="flex flex-col gap-5">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Approve Therapist
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        You are about to approve <span className="font-medium text-gray-800 dark:text-white">{therapist?.user.name}</span> as a therapist.
      </p>
      <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Once approved:
        </p>
        <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
          <li>The therapist will be visible to users</li>
          <li>They can start receiving session requests</li>
          <li>Status will change to <span className="font-medium">Active</span></li>
        </ul>
      </div>
      <p className="text-xs text-red-500">
        Make sure all documents and details are verified before approval.
      </p>
      <div className="flex justify-end gap-3 mt-2">
        <button
          onClick={closeModal}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => handleApproveTherapist()}
          className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-secondary"
        >
          { approvalStatus === 0 && "Approve"}
          { approvalStatus === 1 && "Approving..." }
          { approvalStatus === 2 && "Approved" }
          { approvalStatus === 3 && "Failed" }
        </button>
      </div>
    </div>
  </div>
</Modal>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
       <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            About Therapist
          </h4>
          <div className="grid grid-cols-1">
            <p className="mb-2 text-sm leading-normal text-gray-600">
              {therapist?.aboutTherapist || ""}
            </p>
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
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Availability
            </h4>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-5 2xl:gap-x-32">
              <div className="max-w-[300px]">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Days
                </p>
                <p className="flex flex-wrap text-sm font-medium text-gray-800 dark:text-white/90">
                 {therapist?.user.slot.days.map((day) => {
                   return (
                    <span key={day} className="w-1/4 p-1">
                      <Badge variant="solid" color="primary" size="md">
                        {formatDays[day as keyof typeof formatDays]}
                      </Badge>
                    </span>
                  );
                 })}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Times
                </p>
                <p className="grid lg:grid-cols-4 gap-2 text-sm font-medium text-gray-800 dark:text-white/90">
                  { therapist?.user.slot.timing.map((time) => {
                    return <Badge key={time} variant="solid" color="primary" size="md">{timeSlots.find((t) => t.value === time)?.label}</Badge>
                  }) }
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
