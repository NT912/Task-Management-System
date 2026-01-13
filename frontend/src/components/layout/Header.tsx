"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  //check token
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token); // có token -> true, không có -> false
    };
    checkLogin();

    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
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
          {isLoggedIn ? (
            // Trạng thái đã login
            <div className="flex gap-2">
              <span>Hello!</span>
              <Button
                onClick={handleLogout}
                variant="primary"
                className="w-auto"
              >
                Logout
              </Button>
            </div>
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
