import React from "react";

// InputProps cũng kế thừa từ thẻ <input> chuẩn
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; // Bắt buộc phải có nhãn
  error?: string; // Có thể có lỗi hoặc không
}

// forwardRef là cái bắt buộc phải có để React Hook Form nó "móc" vào cái input này
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          {label}
        </label>
        <div className="mt-2">
          <input
            ref={ref} // *** QUAN TRỌNG: Gắn ref vào đây
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ${
              error ? "ring-red-500 focus:ring-red-500" : ""
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input"; // Đặt tên để debug cho dễ
