"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@shared/schema";
import { API_ENDPOINTS } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
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
      alert("Registration successful! Welcome " + response.data.data.name);
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
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
}
