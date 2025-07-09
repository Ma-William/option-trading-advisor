
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

export function TopNavigation() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleAlertsClick = () => {
    navigate('/alerts');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <header className="h-16 border-b border-slate-700 bg-slate-800 px-4 md:px-6">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-300 hover:text-blue-400 hover:bg-slate-700"
            onClick={handleAlertsClick}
          >
            <Bell className="w-4 h-4" />
            {!isMobile && <span className="ml-2">Alerts</span>}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-300 hover:text-blue-400 hover:bg-slate-700"
            onClick={handleSettingsClick}
          >
            <Settings className="w-4 h-4" />
            {!isMobile && <span className="ml-2">Settings</span>}
          </Button>
        </div>
      </div>
    </header>
  );
}
