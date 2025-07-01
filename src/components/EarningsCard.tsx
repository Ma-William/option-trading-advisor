
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
        return "bg-teal-50 text-teal-800 border-teal-200 font-semibold";
      case "buy":
        return "bg-blue-50 text-blue-800 border-blue-200 font-semibold";
      case "hold":
        return "bg-amber-50 text-amber-800 border-amber-200 font-semibold";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200 font-semibold";
    }
  };

  const getIVColor = (iv: number) => {
    if (iv >= 80) return "text-teal-700 font-semibold";
    if (iv >= 60) return "text-blue-700 font-semibold";
    return "text-gray-700 font-semibold";
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 card-hover bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-800 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">{earning.ticker}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{earning.ticker}</h3>
            <p className="text-sm text-gray-600">{earning.company}</p>
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
          <Calendar className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm font-semibold text-gray-900">{earning.date}</p>
            <p className="text-xs text-gray-600">{earning.time}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 font-medium">Expected Move</p>
          <p className="text-sm font-bold text-gray-900">{earning.expectedMove}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 font-medium">IV Rank</span>
          <span className={`text-sm ${getIVColor(earning.ivRank)}`}>
            {earning.ivRank}%
          </span>
        </div>
        <Progress 
          value={earning.ivRank} 
          className="h-2"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-600 font-medium">
          Market Cap: {earning.marketCap}
        </div>
        <Button size="sm" className="bg-blue-800 hover:bg-blue-900 font-semibold">
          View Strategy <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}
