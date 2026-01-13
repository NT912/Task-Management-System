import React from "react";
import { Loader2 } from "lucide-react";

// Dùng cái này để Button của mình có tất cả tính năng của thẻ <button> bình thường
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
}

export const Button = ({
  children,
  className = "",
  isLoading,
  disabled,
  variant = "primary", // Mặc định là Primary (Xanh đậm)
  ...props
}: ButtonProps) => {
  // Định nghĩa style cho từng loại variant
  const variants = {
    primary: "bg-[#000c44] text-white hover:opacity-90 shadow-md rounded-full px-6",
    secondary: "bg-gray-100 text-[#000c44] hover:bg-gray-200 rounded-full",
    outline: "bg-transparent border border-[#000c44] text-[#000c44] hover:bg-[#000c44]/5 rounded-full px-6",
    ghost: "bg-transparent text-[#000c44] hover:bg-gray-50 hover:text-black shadow-none border-none rounded-full px-6",
    destructive: "bg-red-500 text-white hover:bg-red-600 rounded-md shadow-sm px-4", // Dùng nút vuông cho cảnh báo
  };

  return (
    <button
      className={`flex justify-center items-center py-2 text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000c44] ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};
