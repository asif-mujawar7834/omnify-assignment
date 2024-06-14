"use client";
import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import {
  FaAngleDown,
  FaCalendar,
  FaHome,
  FaQuestionCircle,
  FaUser,
} from "react-icons/fa";
import { Inter } from "next/font/google";
import { BiLoaderCircle } from "react-icons/bi";
import {
  FaArrowRightArrowLeft,
  FaArrowUpRightFromSquare,
  FaEarthAfrica,
  FaSquareArrowUpRight,
} from "react-icons/fa6";
import { CgSandClock } from "react-icons/cg";
import { MdDashboard, MdOutlineSubscriptions } from "react-icons/md";
import Link from "next/link";

type SidebarItemProps = {
  icon: ReactNode;
  name: string;
  isCollapsed: boolean;
};

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (innerWidth < 600) {
        setSidebarCollapsed(true);
        console.log("On Small Device");
      } else {
        setSidebarCollapsed(false);
      }
      console.log("Width => ", innerWidth);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //#F8FAFC
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="flex h-screen">
          <div
            className={`bg-[#F8FAFC] text-gray-500 flex ${
              isSidebarCollapsed ? "w-16" : "w-[228px]"
            } transition-width duration-300`}
          >
            <div className="w-full flex flex-col justify-between">
              <div>
                {" "}
                <div
                  className={`flex items-center justify-between p-4 ${
                    isSidebarCollapsed ? "justify-center" : ""
                  }`}
                >
                  <div
                    className={`flex items-center w-full ${
                      isSidebarCollapsed ? "justify-center" : ""
                    }`}
                  >
                    <div
                      onClick={toggleSidebar}
                      className="bg-black text-white p-1 font-bold rounded-md cursor-pointer"
                    >
                      <BiLoaderCircle className="text-lg" />
                    </div>
                    {!isSidebarCollapsed && (
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-black font-bold text-lg ml-2`}>
                          Front-Desk
                        </span>
                        <FaSquareArrowUpRight />
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`border border-gray-100 rounded-md p-2 bg-white m-2 text-[#334155] text-xs font-medium flex items-center ${
                    isSidebarCollapsed ? "justify-center" : "justify-between"
                  }`}
                >
                  <p className={isSidebarCollapsed ? "hidden" : "block"}>
                    Location Name
                  </p>
                  <FaArrowRightArrowLeft />
                </div>
                <div className="m-2 p-2 rounded-md bg-[#F1F5F9] text-[#334155]">
                  <h3
                    className={`text-base font-bold text-black ${
                      isSidebarCollapsed ? "hidden" : "block"
                    }`}
                  >
                    8:30 AM{" "}
                    <span className="text-xs font-medium ml-2">Tue 20 Jan</span>
                  </h3>
                  <div
                    className={`flex items-center text-sm ${
                      isSidebarCollapsed ? "justify-center" : "justify-between"
                    }`}
                  >
                    <div className="flex items-center gap-1 mt-1">
                      <FaEarthAfrica />
                      <span
                        className={`text-[10px] font-medium ${
                          isSidebarCollapsed ? "hidden" : "block"
                        }`}
                      >
                        UTC: +5 hours
                      </span>
                    </div>
                    <FaAngleDown
                      className={`${isSidebarCollapsed ? "hidden" : "block"}`}
                    />
                  </div>
                </div>
                <nav>
                  <SidebarItem
                    icon={<FaHome />}
                    name="Orders"
                    isCollapsed={isSidebarCollapsed}
                  />
                  <SidebarItem
                    icon={<MdOutlineSubscriptions />}
                    name="Subscriptions"
                    isCollapsed={isSidebarCollapsed}
                  />
                  <SidebarItem
                    icon={<FaCalendar />}
                    name="Calendar"
                    isCollapsed={isSidebarCollapsed}
                  />
                  <SidebarItem
                    icon={<CgSandClock />}
                    name="Waitlist"
                    isCollapsed={isSidebarCollapsed}
                  />
                </nav>
              </div>
              <div className="m-1 p-2">
                <div
                  className={`p-2 flex items-center gap-2 mt-2 ${
                    isSidebarCollapsed ? "justify-center" : ""
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 w-full text-[#334155] text-xs font-medium  my-5 ${
                      isSidebarCollapsed ? "justify-center" : "justify-between"
                    }`}
                  >
                    {!isSidebarCollapsed && (
                      <div className="flex items-center gap-2">
                        <MdDashboard />
                        <h4>Dashboard</h4>
                      </div>
                    )}
                    <FaArrowUpRightFromSquare />
                  </div>
                </div>
                <div
                  className={`bg-white shadow-md rounded-md p-2 flex items-center ${
                    isSidebarCollapsed ? "justify-center" : "justify-between"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isSidebarCollapsed ? "justify-center" : ""
                    }`}
                  >
                    <div className="rounded-full text-xs bg-orange-500 text-white p-1">
                      <FaUser />
                    </div>
                    <div
                      className={`${isSidebarCollapsed ? "hidden" : "block"}`}
                    >
                      <h4 className="text-xs text-[#0F172A] font-medium">
                        Admin Name
                      </h4>
                      <span className="text-xs text-[#64748B] font-normal">
                        admin@gmail.com
                      </span>
                    </div>
                  </div>
                  <FaAngleDown
                    className={`${isSidebarCollapsed ? "hidden" : "block"}`}
                  />
                </div>
                <div
                  className={`p-2 flex items-center gap-2 mt-2 ${
                    isSidebarCollapsed ? "justify-center" : ""
                  }`}
                >
                  <FaQuestionCircle />
                  {!isSidebarCollapsed && (
                    <div>
                      <h4 className="text-xs text-[#334155] font-medium">
                        help Center
                      </h4>
                      <span className="text-[10px] text-[#64748B]">
                        Copyright @omnify
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Main content */}
          <div className="flex-1 bg-white p-4 overflow-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}

const SidebarItem = ({ icon, name, isCollapsed }: SidebarItemProps) => (
  <Link
    href={"/waitlist"}
    className={`flex items-center gap-2 cursor-pointer text-[#334155] text-xs hover:outline-0.5 hover:outline-gray-200 font-medium mx-1 rounded-md px-4 py-2 hover:bg-white hover:shadow-sm transition-shadow duration-200 ${
      isCollapsed ? "justify-center" : ""
    }`}
  >
    {icon}
    {!isCollapsed && <span>{name}</span>}
  </Link>
);
