interface TherapistPopupProps {
  name: string;
  degree: string;
  about: string;
  experience: number;
  area: string;
  onClose: () => void; // Add close handler
}

export const TherapistPopup = ({
  name,
  degree,
  about,
  experience,
  area,
  onClose,
}: TherapistPopupProps) => {
  return (
    <div className="z-10 fixed bottom-0 left-0 w-full max-w-none h-[70vh] bg-white mx-auto rounded-t-3xl shadow-2xl p-6 px-20 animate-[slideUp_0.3s_ease-out]">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 transition text-3xl font-normal cursor-pointer"
      >
        &times;
      </button>

      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">{name}</h2>
      <p className="text-md text-gray-500 text-center mb-4">{degree}</p>

      <div className="border-t border-gray-400 pt-4 space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">Area of Expertise:</span> {area}
        </p>

        <p className="text-gray-700">
          <span className="font-semibold">Experience:</span> {experience}+ Years
        </p>
      </div>

      {/* About Section */}
      <div className="mt-5 bg-gray-50 rounded-xl p-4 max-h-40 overflow-y-auto">
        <h3 className="font-semibold text-gray-800 mb-1">About Therapist</h3>
        <p className="text-gray-600 leading-relaxed">{about}</p>
      </div>
    </div>
  );
};
