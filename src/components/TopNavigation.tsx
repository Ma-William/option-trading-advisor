
import { Search, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function TopNavigation() {
  const isMobile = useIsMobile();

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-4 md:px-6">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          {!isMobile && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder="Search stocks (e.g. TSLA, AAPL)..."
                className="pl-10 w-80 bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-800 hover:bg-blue-50">
            <Bell className="w-4 h-4" />
            {!isMobile && <span className="ml-2">Alerts</span>}
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-800 hover:bg-blue-50">
            <Settings className="w-4 h-4" />
            {!isMobile && <span className="ml-2">Settings</span>}
          </Button>
        </div>
      </div>
    </header>
  );
}
