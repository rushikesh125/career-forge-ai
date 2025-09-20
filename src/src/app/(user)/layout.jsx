"use client";

import { auth } from "@/firebase/config";
import { clearUser, setUser } from "@/store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import React, { useState, useRef} from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  BarChart3,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  TextSelect,
  TextSearch,
  Bot,
} from "lucide-react";
import Link from "next/link";
import UserDropdown from "@/components/UserDropdown";
import { useSelector } from "react-redux";
import DashNav from "@/components/DashNav";

const UserLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const drawerRef = useRef(null);
  const user = useSelector((state) => state.user);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const adminData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(setUser(adminData));
      } else {
        dispatch(clearUser());
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch, router]);
  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const menuItems = [
    { link:"/dashboard",id: "User Profile", label: "User Profile", icon: Users },
    { link:"/resume",id: "Resume Analyze", label: "Resume Analyze", icon: TextSelect },
    { link:"/jobsuggestions",id: "Job Suggestions", label: "Job Suggestions", icon: TextSearch },
    { link:"/dashboard",id: "ForgeBot", label: "ForgeBot", icon: Bot },
    { link:"/dashboard",id: "settings", label: "Settings", icon: Settings },
  ];

  const stats = [
    { label: "Total Users", value: "12,345", change: "+12%" },
    { label: "Revenue", value: "$45,678", change: "+8%" },
    { label: "Active Projects", value: "48", change: "+15%" },
    { label: "Conversion Rate", value: "2.4%", change: "+5%" },
  ];

  return (
    <>
      <div
        className={`min-h-screen ${
          isDarkMode ? "dark bg-gray-900" : "bg-gray-50"
        }`}
      >
        {/* Sidebar */}
        <aside
          ref={drawerRef}
          className={`
          fixed top-0 left-0 z-40 h-screen transition-transform
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 w-64 
          ${isDarkMode ? "bg-gray-800" : "bg-white"}
          border-r ${isDarkMode ? "border-gray-700" : "border-gray-200"}
        `}
        >
          <div className="flex items-center justify-between h-16 px-4">
            <Link href={`/`}>
              <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {/* <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl"
                > */}
                ⚡{/* </motion.span> */}
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                  Career Forge AI
                </h1>
              </div>
              </div>
            </Link>
            <button className="md:hidden" onClick={toggleMenu}>
              <X
                className={`w-6 h-6 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              />
            </button>
          </div>

          <nav className="px-4 mt-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() =>{ setActiveTab(item.id); router.push(`${item.link}`); setIsMenuOpen(false)}}
                  className={`
                  flex items-center w-full px-4 py-3 mb-2 rounded-lg
                  ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white"
                      : `${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                  }
                `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="md:ml-64">
          {/* Top Navigation */}
          <DashNav
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
            toggleMenu={toggleMenu}
          />

          {/* Main Content Area */}
          {children}
        </div>
      </div>
    </>
  );
};

export default UserLayout;
