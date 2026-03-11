"use client";
import { use, useEffect, useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import PhoneInput from "../form/group-input/PhoneInput";
import Select from "../form/Select";
import { Mail } from "lucide-react";
import Checkbox from "../form/input/Checkbox";
import MultiSelect from "../form/MultiSelect";
import TextArea from "../form/input/TextArea";
import { useDropzone } from "react-dropzone";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { Therapist } from "@prisma/client";

type TherapistData = Pick<
  Therapist,
  "area" | "languages" | "aboutTherapist" | "googleCalendarId" | "degree" | "yearOfExp" | "gender" | "phoneNumber"
> & {
  timing: string[];
  days: string[];
  profilePic: string;
};

type FormErrors = {
  gender?: string;
  languages?: string;
  googleCalendarId?: string;
  phoneNumber?: string;
  degree?: string;
  yearOfExp?: string;
  area?: string;
  timing?: string;
  days?: string;
  aboutTherapist?: string;
  profilePic?: string;
};

export default function AddTherapist() {
  const [therapistData, setTherapistData] = useState<TherapistData>({
    area: [],
    languages: [],
    aboutTherapist: "",
    phoneNumber: "",
    googleCalendarId: "",
    degree: "",
    yearOfExp: 0,
    gender: "",
    timing: [],
    days: [],
    profilePic: "",
  });

  const optionsGender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" }
  ];
  const handleSelectGender = (value: string) => {
    setTherapistData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };
  
  const countries = [
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];

  type Option = {
    value: string;
    label: string;
  };

  const areasOfExpertise: Option[] = [
    { value: "Anxiety", label: "Anxiety" },
    { value: "Depression", label: "Depression" },
    { value: "Stress", label: "Stress" },
    { value: "Relationship", label: "Relationship Issues" },
    { value: "Trauma", label: "Trauma" },
    { value: "Self-esteem", label: "Self-Esteem" },
    { value: "Grief", label: "Grief and Loss" },
    { value: "Addiction", label: "Addiction" },
  ];
   
  const handleAreaOfExpertiseChange = (value: string) => {
    setTherapistData((prevData) => {      
      const area = prevData.area.includes(value)
        ? prevData.area.filter((area) => area !== value)
        : [...prevData.area, value];
      return {
        ...prevData,
        area,
      };
    });
  };

  const multiOptionsLanguage = [
    { value: "English", text: "English", selected: false },
    { value: "Spanish", text: "Spanish", selected: false },
    { value: "French", text: "French", selected: false },
    { value: "German", text: "German", selected: false },
    { value: "Japanese", text: "Japanese", selected: false },
  ];
  const handleLanguageChange = (values: string[]) => {
    setTherapistData((prevData) => ({
      ...prevData,
      languages: values,
    }));
  }

  const days = [
    { value: "0", label: "Sunday" },
    { value: "1", label: "Monday" },
    { value: "2", label: "Tuesday" },
    { value: "3", label: "Wednesday" },
    { value: "4", label: "Thursday" },
    { value: "5", label: "Friday" },
    { value: "6", label: "Saturday" },
  ];
  const handleDayChange = (value: string) => {
    setTherapistData((prevData) => {      
      const days = prevData.days.includes(value)
        ? prevData.days.filter((day) => day !== value)
        : [...prevData.days, value];
      return {
        ...prevData,
        days,
      };
    });
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
  const handleTimeSlotChange = (value: string) => {
    setTherapistData((prevData) => {      
      const timing = prevData.timing.includes(value)
        ? prevData.timing.filter((time) => time !== value)
        : [...prevData.timing, value];
      return {
        ...prevData,
        timing,
      };
    });
  }

  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const onDrop = async (acceptedFiles: File[]) => {
    //console.log("Files dropped:", acceptedFiles);
    if (acceptedFiles.length > 0) {
      setUploading(true);
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setPreview(data.url);
      setUploading(false);
      setTherapistData((prevData) => ({
        ...prevData,
        profilePic: data.url,
      }));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  useEffect(() => {
    console.log(therapistData);
  }, [therapistData]);

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

  const validateFields = () => {
  const newErrors: FormErrors = {};

  if (!therapistData.gender) {
    newErrors.gender = "Gender is required";
  }

  if (!therapistData.languages || therapistData.languages.length === 0) {
    newErrors.languages = "Please select at least one language";
  }

  if (!therapistData.googleCalendarId) {
    newErrors.googleCalendarId = "Google Calendar Email is required";
  } else if (!/\S+@\S+\.\S+/.test(therapistData.googleCalendarId)) {
    newErrors.googleCalendarId = "Invalid email address";
  }

  if (!therapistData.phoneNumber) {
    newErrors.phoneNumber = "Phone number is required";
  }

  if (!therapistData.degree) {
    newErrors.degree = "Qualification is required";
  }

  if (!therapistData.yearOfExp || therapistData.yearOfExp <= 0) {
    newErrors.yearOfExp = "Years of experience must be greater than 0";
  }

  if (!therapistData.area || therapistData.area.length === 0) {
    newErrors.area = "Select at least one area of expertise";
  }

  if (!therapistData.timing || therapistData.timing.length === 0) {
    newErrors.timing = "Select at least one time slot";
  }

  if (!therapistData.days || therapistData.days.length === 0) {
    newErrors.days = "Select at least one day";
  }

  if (!therapistData.aboutTherapist) {
    newErrors.aboutTherapist = "About Therapist is required";
  }

  if (!therapistData.profilePic) {
    newErrors.profilePic = "Profile picture is required";
  }

  setErrors(newErrors as typeof errors);

  return Object.keys(newErrors).length === 0;
};

  const [submitSuccess, setSubmitSuccess] = useState(0);
  const handleSubmitData = async () => {
    if (!validateFields()) {
      //console.log("Validation failed:", errors);
      return;
    }
    setSubmitSuccess(1);
    //return;

    const res = await fetch("/api/add-therapist", {
          method: "POST",
          body: JSON.stringify(therapistData),
          headers: {
            "Content-Type": "application/json"
          }
    });

    const result = await res.json();
    console.log(result);
    if (res.ok) {
      setSubmitSuccess(2);
    } else {
      setSubmitSuccess(0);
      alert("Failed to add therapist: " + result.message);
    }
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Add New Therapist" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="Basic Information">
            <div className="space-y-6">
              <div>
                <Label className="flex justify-between items-center">Select Gender
                  {errors.gender && (
                   <span className="text-[#db392e] text-xs">*{errors.gender}</span>
                  )}
                </Label>
                <Select
                  options={optionsGender}
                  placeholder="Select Gender"
                  onChange={handleSelectGender}
                  className="dark:bg-dark-900"
                />
              </div>
              <div>
               <MultiSelect
                label="Select Languages"
                options={multiOptionsLanguage}
                defaultSelected={["English", "French"]}
                onChange={(values) => handleLanguageChange(values)}
               />
               <p className="sr-only">
                Selected Values: {therapistData.languages.join(", ")}
               </p>
              </div>
              <div>
                <Label htmlFor="inputTwo" className="flex justify-between items-center">Google Calendar Email ID
                  {errors.googleCalendarId && (
                   <span className="text-[#db392e] text-xs">*{errors.googleCalendarId}</span>
                  )}
                </Label>
                <div className="relative">
                 <Input
                  placeholder="info@gmail.com"
                  type="text"
                  className="pl-[62px]"
                  onChange={(e) => setTherapistData((prevData) => ({ ...prevData, googleCalendarId: e.target.value }))}
                 />
                 <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <Mail className="size-6" />
                 </span>
                </div>
              </div>
              <div>
               <Label className="flex justify-between items-center">Phone
                {errors.phoneNumber && (
                   <span className="text-[#db392e] text-xs">*{errors.phoneNumber}</span>
                )}
               </Label>
               <PhoneInput
                selectPosition="start"
                countries={countries}
                placeholder="+1 (555) 000-0000"
                onChange={(value) => setTherapistData((prevData) => ({ ...prevData, phoneNumber: value }))}
               />
              </div>
             </div>
          </ComponentCard>
        </div>
        <div className="space-y-6">
          <ComponentCard title="Service Details">
            <div className="space-y-6">
              <div>
                <Label htmlFor="Qualification" className="flex justify-between items-center">Qualification 
                  {errors.degree && (
                   <span className="text-[#db392e] text-xs">*{errors.degree}</span>
                  )}
                </Label>
                <Input type="text" id="Qualification" placeholder="Msc. in Counselling Phychology" onChange={(e) => setTherapistData((prevData) => ({ ...prevData, degree: e.target.value }))} />
              </div>
              <div>
               <Label htmlFor="yearsOfExperience" className="flex justify-between items-center">Years of Experience
                {errors.yearOfExp && (
                   <span className="text-[#db392e] text-xs">*{errors.yearOfExp}</span>
                )}
               </Label>
                <Input type="number" id="yearsOfExperience" placeholder="10" onChange={(e) => setTherapistData((prevData) => ({ ...prevData, yearOfExp: parseInt(e.target.value) || 0 }))}/>
              </div>
              <Label htmlFor="Qualification" className="flex justify-between items-center">Area of Expertise
                {errors.area && (
                   <span className="text-[#db392e] text-xs">*{errors.area}</span>
                )}
              </Label><br/>
              <div className="grid grid-cols-3 gap-4 mb-3">    
              { areasOfExpertise.map((area, index) => (
               <div className="flex items-center gap-3" key={index}>
                <Checkbox
                 checked={therapistData.area.includes(area.value)}
                 onChange={() => handleAreaOfExpertiseChange(area.value)}
                 label={area.label}
                />
               </div>
              ))}
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-10">
        <div className="space-y-6">
          <ComponentCard title="Short Description">
            <div className="space-y-6">
              <div>
                  {errors.aboutTherapist && (
                    <span className="text-[#db392e] text-xs">*{errors.aboutTherapist}</span>
                  )}
                <TextArea
                 rows={6}
                 value={therapistData.aboutTherapist || ""}
                 error={false}
                 onChange={(value) => setTherapistData((prevData) => ({ ...prevData, aboutTherapist: value }))}
                />
              </div>  
            </div>
          </ComponentCard>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-10">
        <div className="space-y-6">
          <ComponentCard title="Availability Schedule">
            <div className="space-y-6 grid grid-cols-2">
              <div className="border-r border-gray-200 dark:border-gray-800">
                <Label htmlFor="Qualification" className="flex justify-between items-center">Select Days
                 {errors.days && (
                    <span className="text-[#db392e] text-xs">*{errors.days}</span>
                  )}
                </Label><br/>
                <div className="grid grid-cols-3 gap-4 mb-3">    
                { days.map((area, index) => (
                  <div className="flex items-center gap-3" key={index}>
                   <Checkbox
                    checked={therapistData.days.includes(area.value)}
                    onChange={() => handleDayChange(area.value)}
                    label={area.label}
                  />
                 </div>
                ))}
               </div>
               <br/>
              </div>
              <div className="ml-12">
               <Label htmlFor="Qualification" className="flex justify-between items-center">Select Time Slots
                {errors.timing && (
                    <span className="text-[#db392e] text-xs">*{errors.timing}</span>
                  )}
               </Label><br/>
               <div className="grid grid-cols-3 gap-4 mb-3">    
                { timeSlots.map((area, index) => (
                  <div className="flex items-center gap-3" key={index}>
                   <Checkbox
                    checked={therapistData.timing.includes(area.value)}
                    onChange={() => handleTimeSlotChange(area.value)}
                    label={area.label}
                   />
                  </div>
                ))}
                </div>
              </div>  

            </div>
          </ComponentCard>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-10">
        <div className="space-y-6">
          <ComponentCard title="Upload Profile Picture">
            {errors.profilePic && (
              <span className="text-[#db392e] text-xs">*{errors.profilePic}</span>
            )}
    <div className="grid grid-cols-2">
      <div className="transition max-w-lg border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
        <form
          {...getRootProps()}
          className={`dropzone rounded-xl   border-dashed border-gray-300 p-7 lg:p-10
        ${
          isDragActive
            ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
        }
      `}
          id="demo-upload"
        >
          {/* Hidden Input */}
          <input {...getInputProps()} />
          { uploading && (
            <div className="flex items-center justify-center h-32">
             <Image src="/images/loading.svg" alt="Uploading..." width={50} height={50}/>
             <span className="ml-0 text-gray-700 dark:text-gray-400">Uploading...</span>
            </div>) }
          { preview && (
            <div className="flex flex-col items-center m-0!">
              <Image src={preview} alt="Preview" className="mb-4 max-h-48 rounded-lg object-cover" width={200} height={200}/>
              <button className="bg-red-500 text-white text-[11px] px-4 py-2 rounded-md hover:bg-red-600" onClick={() => setPreview("")}>
                Change Image
              </button>
            </div>
          )} 
          {!preview && !uploading &&
           (
          <div className="dz-message flex flex-col items-center m-0!">
            {/* Icon Container */}
            <div className="mb-[22px] flex justify-center">
              <div className="flex h-[68px] w-[68px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <svg
                  className="fill-current"
                  width="29"
                  height="28"
                  viewBox="0 0 29 28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                  />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
              {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
            </h4>

            <span className=" text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
              Drag and drop your PNG, JPG, WebP, SVG images here or browse
            </span>

            <span className="font-medium underline text-theme-sm text-brand-500">
              Browse File
            </span>
          </div>
          ) }
        </form>
      </div>
      <div>
        <Checkbox
          checked={true}
          onChange={() => console.log("Checkbox changed")}
          label="I confirm that all therapist details including basic information (name, gender, qualification), service details (calendar email, languages, expertise areas), description, availability schedule, and the uploaded profile image is a professional headshot and meets the required guidelines."
          labelColor="light"
        />
        <br/>
        <Button
  variant="outline"
  onClick={handleSubmitData}
  disabled={submitSuccess === 1}
>
  {submitSuccess === 1 ? (
    <>
      <Image
        src="/images/loading.svg"
        alt="Uploading..."
        width={30}
        height={30}
        className="inline mr-0"
      />
      Adding Therapist...
    </>
  ) : (
    "Submit Details"
  )}
</Button>
        {submitSuccess === 2 && <p className="text-green-600 mt-2">Therapist added successfully!</p>}
      </div>
    </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}
