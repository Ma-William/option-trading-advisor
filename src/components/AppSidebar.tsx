
import { Calendar, Home, TrendingUp, Bell, Settings, Search } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Opportunities", url: "/opportunities", icon: TrendingUp },
  { title: "Trade Tracker", url: "/tracker", icon: Calendar },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent className="bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-800 to-blue-700 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            {state === "expanded" && (
              <div>
                <h1 className="font-bold text-gray-900">Options Advisor</h1>
                <p className="text-xs text-gray-600">Professional Trading</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 font-semibold px-6 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-4">
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive: navIsActive }) =>
                        `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isActive(item.url)
                            ? "bg-blue-50 text-blue-800 font-semibold border border-blue-200"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      <item.icon className={`w-5 h-5 ${
                        isActive(item.url) ? "text-blue-700" : "text-gray-500"
                      }`} />
                      {state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {state === "expanded" && (
          <div className="mt-6 px-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-900">Market Live</span>
              </div>
              <p className="text-xs text-gray-700">
                Professional earnings volatility tracking
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
