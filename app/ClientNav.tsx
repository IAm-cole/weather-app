"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const currentPath = usePathname();

  const pages = [
    {
      name: "Current Temperature",
      path: "/",
    },

    {
      name: "Forecast",
      path: "/forecast",
    },
    {
      name: "History",
      path: "/history",
    },
   
  ];
  const baseClasses =
    " rounded-lg p-3  transition-colors duration-200 ";

  const activeClasses = "bg-blue-600 text-gray-200 shadow-md ";
  const inactiveClasses =
    "hover-bg-gray-200 hover:bg-gray-500 text-gray-200 bg-gray-600";

  return (
    <div className="mt-10  w-full h-full py-3 px-2 ">
      <div className="flex gap-4 justify-center">
        {pages.map((page, index) => (
          <Link
            href={page.path}
            key={index}
            className={`${baseClasses} ${
              currentPath === page.path ? activeClasses : inactiveClasses
            }`}
          >
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
