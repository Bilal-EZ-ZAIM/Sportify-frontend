import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  ClipboardListIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Trophy,
  LogOutIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store/Store";
import { Deconxion } from "@/store/features/authSlice";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Events", href: "/events", icon: CalendarDaysIcon },
  { name: "Participants", href: "/participants", icon: UsersIcon },
  { name: "Registrations", href: "/registrations", icon: ClipboardListIcon },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {


  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    dispatch(Deconxion());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-900 border-r transition-all duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo and Brand */}
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Trophy className="h-6 w-6" />
          {!isCollapsed && <span>Sports Events</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => (
          <Link key={item.name} to={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-x-3",
                "hover:bg-gray-100 bg-gray-100 dark:hover:bg-gray-800",
                location.pathname === item.href &&
                  "bg-gray-100 dark:bg-gray-800"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.name}</span>}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Collapse Toggle Button - Only visible on desktop */}

      {/* Logout Button */}
      <div className="px-3 py-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-x-3 bg-gray-100 hover:bg-gray-200"
          onClick={handleLogout}
        >
          <LogOutIcon className="h-5 w-5" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>

      <div className="hidden lg:block px-3 py-4">
        <Button
          variant="ghost"
          className="w-full justify-start bg-gray-100"
          onClick={toggleCollapse}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeftIcon className="h-5 w-5 mr-2 " />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>

      {/* Close Button - Only visible on mobile */}
      <div className="lg:hidden px-3 py-4">
        <Button
          variant="ghost"
          className="w-full justify-center bg-gray-100"
          onClick={onClose}
        >
          Close Menu
        </Button>
      </div>
    </div>
  );
}
