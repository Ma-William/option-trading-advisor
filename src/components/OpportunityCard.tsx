
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
  const { ticker, companyName, eventType, eventDate, currentPrice, impliedVolatility, strategy } = opportunity;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const daysUntilEvent = Math.ceil((new Date(eventDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'earnings': return 'bg-green-600';
      case 'product launch': return 'bg-blue-600';
      case 'conference call': return 'bg-purple-600';
      default: return 'bg-slate-600';
    }
  };

  const getIVColor = (iv: number) => {
    if (iv >= 70) return 'text-red-400';
    if (iv >= 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <Card className="bg-slate-750 border-slate-600 hover:border-slate-500 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-slate-100 text-lg">
              {ticker} - {companyName}
            </CardTitle>
            <p className="text-slate-400 text-sm">${currentPrice.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <Badge className={`${getEventTypeColor(eventType)} text-white`}>
              {eventType}
            </Badge>
            <p className="text-slate-400 text-xs mt-1">
              {daysUntilEvent} day{daysUntilEvent !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Event Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <CalendarDays className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-slate-300 text-sm font-medium">Event Date</p>
              <p className="text-slate-400 text-xs">{formatDate(eventDate)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-slate-300 text-sm font-medium">IV Rank</p>
              <p className={`text-xs font-medium ${getIVColor(impliedVolatility)}`}>
                {impliedVolatility}%
              </p>
            </div>
          </div>
        </div>

        {/* Strategy Recommendation */}
        {strategy ? (
          <div className="bg-slate-700 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <h4 className="text-slate-100 font-medium">{strategy.name}</h4>
              <Badge variant="secondary" className="bg-green-600 text-white text-xs">
                {strategy.winRate}% Win Rate
              </Badge>
            </div>
            
            <p className="text-slate-300 text-sm">{strategy.description}</p>
            
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-slate-400">Net Debit</p>
                <p className="text-red-400 font-medium">${strategy.netDebit.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-slate-400">Max Loss</p>
                <p className="text-red-400 font-medium">${strategy.maxLoss.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-slate-400">Max Profit</p>
                <p className="text-green-400 font-medium">${strategy.maxProfit.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                View Strategy
              </Button>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-600">
                Track Trade
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-700 rounded-lg p-4 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <p className="text-slate-300 text-sm">No recommended strategy available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
