
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
    <Sidebar className="border-r border-slate-700">
      <SidebarContent className="bg-slate-800">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            {state === "expanded" && (
              <div>
                <h1 className="font-bold text-slate-100">Options Advisor</h1>
                <p className="text-xs text-slate-400">Professional Trading</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300 font-semibold px-6 py-2">
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
                            ? "bg-blue-600 text-white font-semibold shadow-lg"
                            : "text-slate-300 hover:bg-slate-700 hover:text-slate-100"
                        }`
                      }
                    >
                      <item.icon className={`w-5 h-5 ${
                        isActive(item.url) ? "text-white" : "text-slate-400"
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
            <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-sm font-semibold text-slate-100">Market Live</span>
              </div>
              <p className="text-xs text-slate-300">
                Professional earnings volatility tracking
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
