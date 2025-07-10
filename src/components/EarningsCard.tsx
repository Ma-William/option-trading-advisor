
import { Calendar, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EarningsCardProps {
  earning: {
    ticker: string;
    company: string;
    date: string;
    time: string;
    recommendation: string;
    marketCap: string;
  };
}

export function EarningsCard({ earning }: EarningsCardProps) {
  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "strongly-recommended":
        return "bg-teal-500/20 text-teal-400 border-teal-500/50 font-semibold";
      case "recommended":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50 font-semibold";
      case "considered":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50 font-semibold";
      case "not-considered":
        return "bg-slate-500/20 text-slate-400 border-slate-500/50 font-semibold";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50 font-semibold";
    }
  };

  const getRecommendationText = (rec: string) => {
    switch (rec) {
      case "strongly-recommended":
        return "STRONGLY RECOMMENDED";
      case "recommended":
        return "RECOMMENDED";
      case "considered":
        return "CONSIDERED";
      case "not-considered":
        return "NOT CONSIDERED";
      default:
        return rec.toUpperCase();
    }
  };

  return (
    <div className="border border-slate-700 rounded-lg p-4 card-hover bg-slate-800 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">{earning.ticker}</span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">{earning.ticker}</h3>
            <p className="text-sm text-slate-400">{earning.company}</p>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className={getRecommendationColor(earning.recommendation)}
        >
          {getRecommendationText(earning.recommendation)}
        </Badge>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <div>
            <p className="text-sm font-semibold text-slate-100">{earning.date}</p>
            <p className="text-xs text-slate-400">{earning.time}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-400 font-medium">
          Market Cap: {earning.marketCap}
        </div>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-semibold text-white">
          View Strategy <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}
