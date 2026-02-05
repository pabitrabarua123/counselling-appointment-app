import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant,
}) => {
  let classExtra = "";
  switch (variant) {
    case "primary":
      classExtra = "bg-gradient-btn text-white hover:-translate-y-1 duration-300 ease-out";
      break;
    case "outline":
      classExtra = "border-2 border-primary text-secondary font-semibold hover:bg-light transition-colors";
      break;
    default:
      classExtra = "bg-blue-600 text-white hover:bg-blue-700";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        group inline-flex items-center
        justify-center gap-2
        px-10 py-4 rounded-2xl 
        font-semibold
        cursor-pointer
        ${classExtra}
      `}
    >
      {children}
    </button>
  );
};

export default Button;