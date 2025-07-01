
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
        return "bg-green-100 text-green-800 border-green-200";
      case "buy":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "hold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getIVColor = (iv: number) => {
    if (iv >= 80) return "text-green-600";
    if (iv >= 60) return "text-blue-600";
    return "text-gray-600";
  };

  return (
    <div className="border border-slate-200 rounded-lg p-4 card-hover bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">{earning.ticker}</span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{earning.ticker}</h3>
            <p className="text-sm text-slate-500">{earning.company}</p>
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
          <Calendar className="w-4 h-4 text-slate-400" />
          <div>
            <p className="text-sm font-medium text-slate-900">{earning.date}</p>
            <p className="text-xs text-slate-500">{earning.time}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-600">Expected Move</p>
          <p className="text-sm font-semibold text-slate-900">{earning.expectedMove}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-600">IV Rank</span>
          <span className={`text-sm font-medium ${getIVColor(earning.ivRank)}`}>
            {earning.ivRank}%
          </span>
        </div>
        <Progress 
          value={earning.ivRank} 
          className="h-2"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Market Cap: {earning.marketCap}
        </div>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          View Strategy <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}
