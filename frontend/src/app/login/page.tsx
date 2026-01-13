"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@shared/schema";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { API_ENDPOINTS } from "@/lib/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import z from "zod";
import { toast } from "sonner";

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post(API_ENDPOINTS.users.login(), data);

      const { token } = response.data.data;
      localStorage.setItem("token", token);
      toast.success("Login Successful")
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || "Login failed";
        setError("root", { message: errorMessage });
      } else {
        setError("root", { message: "An unexpected error occurred" });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Sign in to your account
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <Input
            label="Email address"
            type="email"
            placeholder="Input your email"
            {...register("email")} // Gắn vào React Hook Form
            error={errors.email?.message} // Hiển thị lỗi đỏ nếu có
          />
          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            placeholder="password"
            {...register("password")}
            error={errors.password?.message}
          />

          {/* Thông báo lỗi chung (Root Error - ví dụ sai mật khẩu) */}
          {errors.root && (
            <div className="text-red-500 text-sm">{errors.root.message}</div>
          )}
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-auto" // Tự co giãn theo nội dung
            >
              Sign in
            </Button>
          </div>
        </form>

        {/* Link đăng ký nếu chưa có tk */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="/register"
            className="font-semibold leading-6 text-[#f24855] hover:opacity-80"
          >
            Register now
          </a>
        </p>
      </div>
    </div>
  );
}
