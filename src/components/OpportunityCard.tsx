
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, TrendingUp, AlertTriangle, CheckCircle, Bell } from "lucide-react";

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
  eventDescription: string;
  currentPrice: number;
  strategy: Strategy | null;
  recommendation: string;
  recommendingModels: string[];
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSetAlert?: (opportunity: Opportunity) => void;
  isAlertSet?: boolean;
}

export function OpportunityCard({ opportunity, onSetAlert, isAlertSet = false }: OpportunityCardProps) {
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

  const handleSetAlert = () => {
    if (onSetAlert) {
      onSetAlert(opportunity);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 text-lg">{opportunity.ticker}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={`${getRecommendationBadge(opportunity.recommendation)} border`}>
              {opportunity.recommendation}
            </Badge>
            <Button
              size="sm"
              variant={isAlertSet ? "secondary" : "outline"}
              onClick={handleSetAlert}
              className={isAlertSet ? "bg-green-600/20 text-green-400 border-green-600/30" : ""}
            >
              <Bell className="w-4 h-4 mr-1" />
              {isAlertSet ? "Alert Set" : "Set Alert"}
            </Button>
          </div>
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
          <p className="text-slate-300 text-sm">
            {opportunity.strategy ? opportunity.strategy.description : "No strategy recommended"}
          </p>
        </div>

        {opportunity.recommendingModels.length > 0 && (
          <div>
            <h4 className="text-slate-200 font-medium mb-2">Recommending Models ({opportunity.recommendingModels.length})</h4>
            <div className="flex flex-wrap gap-1">
              {opportunity.recommendingModels.map((model) => (
                <Badge key={model} variant="outline" className="text-xs bg-slate-700 text-slate-300 border-slate-600">
                  {model}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
