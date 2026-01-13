import React from "react";
import { Loader2 } from "lucide-react";

// Dùng cái này để Button của mình có tất cả tính năng của thẻ <button> bình thường
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean; // Thêm cờ để hiện icon xoay xoay
}

export const Button = ({
  children,
  className,
  isLoading,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled || isLoading} // Nếu đang load thì disable luôn
      {...props} // Truyền tất cả các props còn lại (onClick, type...) vào
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};
