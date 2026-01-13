"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { UserNav } from "./UserNav";

interface User {
  name: string;
  email: string;
  avatar_url: string | null;
}

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  //check token
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      setIsLoggedIn(!!token); // có token -> true, không có -> false
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkLogin();

    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="flex w-full h-11 items-center justify-between px-4 sm:px-4 lg:px-6">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src="/company logo/NT_Company_logo.svg"
              alt="TeamsTask Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold tracking-tight text-[#0071bc] ml-2 font-mono">
              TeamsTask
            </span>
          </Link>
        </div>

        {/* MENU BÊN PHẢI */}
        <div className="flex gap-4 items-center">
          {/* Chỉ hiển thị khi client đã load (chống nháy) */}
          {!isMounted ? (
            <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse"></div> // Skeleton cho cái avatar
          ) : isLoggedIn && user ? (
            // Trạng thái đã login
            <UserNav user={user} onLogout={handleLogout} />
          ) : (
            // Trạng thái chưa login
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="ghost" className="w-auto">
                  Log in
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button variant="primary" className="w-auto">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
