"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import Image from "next/image";

interface UserNavProps {
  user: {
    name: string;
    email: string;
    avatar_url: string | null;
  };
  onLogout: () => void;
}

export function UserNav({ user, onLogout }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : "U";
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* 1. TRIGGER: AVATAR TRÒN */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 border border-blue-200 hover:bg-blue-200 transition-all overflow-hidden focus:outline-none ${
          isOpen ? "ring-2 ring-[#0071bc] ring-offset-2" : ""
        }`}
      >
        {user.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt={user.name}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm font-bold text-[#0071bc]">
            {getInitials(user.name)}
          </span>
        )}
      </button>
      {/* 2. DROPDOWN PANEL */}
      {/* Chỉ hiện khi isOpen = true */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 duration-200">
          {/* Header nhỏ trong menu (khoe tên/email) */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          {/* Các mục Menu */}
          <div className="py-1">
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0071bc] transition-colors"
              onClick={() => setIsOpen(false)} // Bấm xong thì đóng menu
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout(); // Gọi hàm logout thật
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
