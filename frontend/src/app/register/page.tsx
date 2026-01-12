"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@shared/schema";
import { API_ENDPOINTS } from "@/lib/api";
import axios from "axios";

type RegisterFormData = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await axios.post(API_ENDPOINTS.users.register(), data);
      alert("Đăng ký thành công! Chào mừng " + response.data.data.name);
    } catch (error) {
      console.log("Lỗi đăng ký: ", error);
      if (axios.isAxiosError(error) && error.response) {
        const serverMessage = error.response.data.error;

        if (serverMessage === "User already exists") {
          setError("email", {
            type: "manual",
            message: "Email đã tồn tại",
          });
        } else {
          alert("Lỗi đăng ký: " + serverMessage);
        }
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Đăng ký tài khoản
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* --- Input Name --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên hiển thị
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Nhập tên của bạn"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* --- Input Email --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              {...register("email")}
              placeholder="Nhập email của bạn"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* --- Input Password --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="text"
              {...register("password")}
              placeholder="Nhập mật khẩu của bạn"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* --- Button Submit --- */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng ký ngay"}
          </button>
        </form>
      </div>
    </div>
  );
}
