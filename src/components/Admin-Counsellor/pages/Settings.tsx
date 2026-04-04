"use client";
import { useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { Pencil } from "lucide-react";

export default function Settings() {

  const [errors, setErrors] = useState({
    gender: "",
    languages: "",
    googleCalendarId: "",
    phoneNumber: "",
    degree: "",
    yearOfExp: "",
    area: "",
    timing: "",
    days: "",
    aboutTherapist: "",
    profilePic: "",
  });



  return (
    <div>
      <PageBreadcrumb pageTitle="Settings" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <div className="space-y-6">
          <ComponentCard title="Update Website Settings">
            <div className="space-y-6">
<div>
  <Label className="flex justify-between items-center">
     Individual Therapy Cost
    {errors.phoneNumber && (
      <span className="text-[#db392e] text-xs">
        *{errors.phoneNumber}
      </span>
    )}
  </Label>

  <div className="flex items-center gap-2">
    <div className="flex-1">
      <Input
        type="text"
        placeholder="Enter Individual Therapy Cost"
        className="w-full"
        value="49"
        onChange={(e) =>
          console.log("Individual Therapy Cost:", e.target.value)
        }
      />
    </div>

    <button
      type="button"
      className="flex text-[15px] text-gray-800 items-center gap-1 px-5 py-2 rounded-md bg-gray-100 hover:bg-gray-200 whitespace-nowrap cursor-pointer"
    >
      <Pencil size={16} />
      Edit
    </button>
  </div>
</div>

<div>
  <Label className="flex justify-between items-center">
    Couple Therapy Cost
    {errors.phoneNumber && (
      <span className="text-[#db392e] text-xs">
        *{errors.phoneNumber}
      </span>
    )}
  </Label>

  <div className="flex items-center gap-2">
    <div className="flex-1">
      <Input
        type="text"
        placeholder="Enter Couple Therapy Cost"
        className="w-full"
        value="59"
        onChange={(e) =>
          console.log("Couple Therapy Cost:", e.target.value)
        }
      />
    </div>

    <button
      type="button"
      className="flex text-[15px] text-gray-800 items-center gap-1 px-5 py-2 rounded-md bg-gray-100 hover:bg-gray-200 whitespace-nowrap cursor-pointer"
    >
      <Pencil size={15} />
      Edit
    </button>
  </div>
</div>

<div>
  <Label className="flex justify-between items-center">
    Stripe Webhook Secret
    {errors.phoneNumber && (
      <span className="text-[#db392e] text-xs">
        *{errors.phoneNumber}
      </span>
    )}
  </Label>

  <div className="flex items-center gap-2">
    <div className="flex-1">
      <Input
        type="text"
        placeholder="Enter Stripe Webhook Secret"
        className="w-full"
        value="whsec_afRZCbrHVfI7a0thgl4PyxX0EsJSIA2U"
        onChange={(e) =>
          console.log("Stripe Webhook Secret:", e.target.value)
        }
      />
    </div>

    <button
      type="button"
      className="flex text-[15px] text-gray-800 items-center gap-1 px-5 py-2 rounded-md bg-gray-100 hover:bg-gray-200 whitespace-nowrap cursor-pointer"
    >
      <Pencil size={16} />
      Edit
    </button>
  </div>
</div>

<div>
  <Label className="flex justify-between items-center">
    Google Calendar API Key
    {errors.phoneNumber && (
      <span className="text-[#db392e] text-xs">
        *{errors.phoneNumber}
      </span>
    )}
  </Label>

  <div className="flex items-center gap-2">
    <div className="flex-1">
      <Input
        type="text"
        placeholder="Enter Google Calendar API Key"
        className="w-full text-gray-400"
        value="calendar-service-account-onlin@h-v2.iam.gserviceaccount.com"
        onChange={(e) =>
          console.log(e.target.value)
        }
      />
    </div>

    <button
      type="button"
      className="flex text-[15px] text-gray-800 items-center gap-1 px-5 py-2 rounded-md bg-gray-100 hover:bg-gray-200 whitespace-nowrap cursor-pointer"
    >
      <Pencil size={16} />
      Edit
    </button>
  </div>
</div>

              <div>
              </div>
             </div>
          </ComponentCard>
        </div>

      </div>

    </div>
  );
}
