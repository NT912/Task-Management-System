"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@shared/schema";
import { API_ENDPOINTS } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RegisterFormData = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const router = useRouter();
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
      toast.success(
        `Welcome ${response.data.data.name}! Registration successful.`
      );
      router.push("/login");
    } catch (error) {
      console.log("Registration failed: ", error);
      if (axios.isAxiosError(error) && error.response) {
        const serverMessage = error.response.data.error;

        if (serverMessage === "User already exists") {
          setError("email", {
            type: "manual",
            message: "User already exists",
          });
        } else {
          alert("Registration failed: " + serverMessage);
        }
      } else {
        alert("Something went wrong, please try again later!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* --- Input Name --- */}
          <Input
            label="Name"
            type="text"
            placeholder="Input your name"
            {...register("name")}
            error={errors.name?.message}
          />

          {/* --- Input Email --- */}
          <Input
            label="Email address"
            type="email"
            placeholder="Input your email"
            {...register("email")}
            error={errors.email?.message}
          />

          {/* --- Input Password --- */}
          <Input
            label="Password"
            type="password"
            placeholder="Input your password"
            {...register("password")}
            error={errors.password?.message}
          />

          {/* --- Button Submit --- */}
          <div className="flex justify-end">
            <Button type="submit" isLoading={isSubmitting} className="w-auto">
              {isSubmitting ? "Processing..." : "Register"}
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-[#009245] hover:opacity-80"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
