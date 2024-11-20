"use client";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const SideNav = () => {
  const menuList = [
    {
      name: "Home",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "History",
      path: "/dashboard/history",
      icon: FileClock,
    },
    {
      name: "Billing",
      path: "/dashboard/billing",
      icon: WalletCards,
    },
    {
      name: "Setting",
      path: "/dashboard/setting",
      icon: Settings,
    },
  ];

  const path = usePathname();

  return (
    <div className="h-screen p-5 shadow-sm border bg-white">
      <div className="flex justify-center mb-3">
        <Image src={"/logo.svg"} alt="Company logo" width={80} height={80} />
      </div>
      <hr className="my-5 border" />
      <div className="mt-3">
        {menuList.map((menu, index) => (
          <div key={index}>
            <Link href={menu.path}>
              <div
                className={`flex gap-2 mb-2 p-3 hover:bg-purple-600 hover:text-white rounded-lg hover:cursor-pointer transition ease-in-out ${
                  path.startsWith(menu.path) && "bg-purple-600 text-white"
                }`}
              >
                <menu.icon className="h-7 w-6" />
                <h2 className="text-lg">{menu.name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
