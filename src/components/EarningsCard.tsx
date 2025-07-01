
import { Calendar, TrendingUp, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface EarningsCardProps {
  earning: {
    ticker: string;
    company: string;
    date: string;
    time: string;
    ivRank: number;
    recommendation: string;
    expectedMove: string;
    marketCap: string;
  };
}

export function EarningsCard({ earning }: EarningsCardProps) {
  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "strong-buy":
        return "bg-teal-500/20 text-teal-400 border-teal-500/50 font-semibold";
      case "buy":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50 font-semibold";
      case "hold":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50 font-semibold";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50 font-semibold";
    }
  };

  const getIVColor = (iv: number) => {
    if (iv >= 80) return "text-teal-400 font-semibold";
    if (iv >= 60) return "text-blue-400 font-semibold";
    return "text-slate-400 font-semibold";
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
          {earning.recommendation.replace("-", " ").toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <div>
            <p className="text-sm font-semibold text-slate-100">{earning.date}</p>
            <p className="text-xs text-slate-400">{earning.time}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-400 font-medium">Expected Move</p>
          <p className="text-sm font-bold text-slate-100">{earning.expectedMove}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400 font-medium">IV Rank</span>
          <span className={`text-sm ${getIVColor(earning.ivRank)}`}>
            {earning.ivRank}%
          </span>
        </div>
        <Progress 
          value={earning.ivRank} 
          className="h-2 bg-slate-700"
        />
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
