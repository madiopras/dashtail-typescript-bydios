"use client";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import apiClient from "@/lib/axios";
import toast from "react-hot-toast";
import { er } from "@fullcalendar/core/internal-common";

const ProfileInfo = () => {
  const { data: session } = useSession();
  const handleLogout = async () => {
    try {
      await apiClient.post(`/api/logout`);
      signOut()
      toast.success("User Logout successfully");
    } catch (error : any) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
    toast.error(errorMessage);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer">
        <div className=" flex items-center  ">
          {session?.user?.name}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0" align="end">
        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
          
            <Image
              src=""
              alt=""
              width="36"
              height="36"
              className="rounded-full"
            />
         
          <div>
            <div className="text-sm font-medium text-default-800 capitalize ">
              {session?.user?.name ?? "Mcc Callem"}
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-default-600 hover:text-primary"
            >
              Admin
            </Link>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {[
            {
              name: "profile",
              icon: "heroicons:user",
              href:"/user-profile"
            },
            {
              name: "Settings",
              icon: "heroicons:paper-airplane",
              href:"/admin"
            },
            {
              name: "Keyboard shortcuts",
              icon: "heroicons:language",
              href:"/admin"
            },
          ].map((item, index) => (
            <Link
              href={item.href}
              key={`info-menu-${index}`}
              className="cursor-pointer"
            >
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                <Icon icon={item.icon} className="w-4 h-4" />
                {item.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mb-0 dark:bg-background" />
        <DropdownMenuItem
          onSelect={handleLogout} 
          className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer"
        >
          <Icon icon="heroicons:power" className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
