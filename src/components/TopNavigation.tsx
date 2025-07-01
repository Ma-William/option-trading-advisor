
import { Search, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function TopNavigation() {
  const isMobile = useIsMobile();

  return (
    <header className="h-16 border-b border-slate-700 bg-slate-800 px-4 md:px-6">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          {!isMobile && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search stocks (e.g. TSLA, AAPL)..."
                className="pl-10 w-80 bg-slate-700 border-slate-600 text-slate-200 placeholder:text-slate-400 focus:bg-slate-600 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-blue-400 hover:bg-slate-700">
            <Bell className="w-4 h-4" />
            {!isMobile && <span className="ml-2">Alerts</span>}
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-blue-400 hover:bg-slate-700">
            <Settings className="w-4 h-4" />
            {!isMobile && <span className="ml-2">Settings</span>}
          </Button>
        </div>
      </div>
    </header>
  );
}
