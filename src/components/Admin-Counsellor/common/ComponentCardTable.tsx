import { Download, Funnel } from "lucide-react";

interface ComponentCardProps {
  title: string;
  setShowFilter?: React.Dispatch<React.SetStateAction<boolean>>; // Optional prop for filter button
  exportData?: () => void; // Optional prop for export button
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
}

const ComponentCardTable: React.FC<ComponentCardProps> = ({
  title,
  setShowFilter,
  exportData,
  children,
  className = "",
}) => {
  return (
    <div
      className={`min-h-[530px] rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5 flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </h3>
        <div className="flex">
          <button 
            onClick={() => setShowFilter && setShowFilter(true)}
            className="flex items-center px-4 py-2 text-sm bg-[#1ea094] text-white rounded-md hover:bg-[#18706e] cursor-pointer">
           <Funnel size={16} className="mr-2"/> Filter
          </button>
          <button 
            onClick={exportData}
            className="flex items-center px-4 py-2 text-sm bg-[#607D8B] text-white rounded-md hover:bg-[#4A6B7A] ml-2 cursor-pointer">
            <Download size={16} className="mr-2" /> Export
          </button>
        </div>
        </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>

  );
};

export default ComponentCardTable;
