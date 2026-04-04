import ComponentCard from "./ComponentCard";
import PageBreadcrumb from "./PageBreadCrumb";

const SkeletonInput = () => (
  <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
);

const SkeletonTextarea = () => (
  <div className="h-30 w-full bg-gray-200 rounded animate-pulse"></div>
);

export const SkeletonLoader = () => {
  return (
   <div>
    <PageBreadcrumb pageTitle="Edit Therapist" />
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6">
        <ComponentCard title="Basic Information">
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
        </ComponentCard>
      </div>
      <div className="space-y-6">
        <ComponentCard title="Service Details">
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
        </ComponentCard>
      </div>
    </div>
    <br/>
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-6">
        <ComponentCard title="Short Description">
          <SkeletonTextarea />
        </ComponentCard>
      </div>
    </div>
    <br/>
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-6">
        <ComponentCard title="Availability Schedule">
          <SkeletonTextarea />
        </ComponentCard>
      </div>
    </div>
    <br/>
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-6">
        <ComponentCard title="Profile Picture">
          <SkeletonTextarea />
        </ComponentCard>
      </div>
    </div>
   </div>
  );
}