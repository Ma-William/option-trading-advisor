import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface Strategy {
  name: string;
  description: string;
  netDebit: number;
  maxLoss: number;
  maxProfit: number;
  winRate: number;
}

interface Opportunity {
  ticker: string;
  companyName: string;
  eventType: string;
  eventDate: string;
  currentPrice: number;
  impliedVolatility: number;
  strategy: Strategy | null;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case "Strongly Recommended":
        return "bg-green-600/20 text-green-400 border-green-600/30";
      case "Recommended":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30";
      case "Considered":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30";
      case "Not Considered":
        return "bg-slate-600/20 text-slate-400 border-slate-600/30";
      default:
        return "bg-slate-600/20 text-slate-400 border-slate-600/30";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 text-lg">{opportunity.ticker}</CardTitle>
          <Badge className={`${getRecommendationBadge(opportunity.recommendation)} border`}>
            {opportunity.recommendation}
          </Badge>
        </div>
        <CardDescription className="text-slate-300">
          {opportunity.eventType} • {formatDate(opportunity.eventDate)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-slate-200 font-medium mb-2">Event Details</h4>
          <p className="text-slate-300 text-sm">{opportunity.eventDescription}</p>
        </div>
        
        <div>
          <h4 className="text-slate-200 font-medium mb-2">Recommended Strategy</h4>
          <p className="text-slate-300 text-sm">{opportunity.strategy}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-700">
          <div>
            <p className="text-slate-400 text-xs">Implied Volatility</p>
            <p className="text-slate-200 font-medium">{opportunity.impliedVolatility}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Expected Move</p>
            <p className="text-slate-200 font-medium">{opportunity.expectedMove}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
