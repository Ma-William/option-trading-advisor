
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, AlertTriangle, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for opportunities (same as in OpportunitiesView)
const mockOpportunities = [
  {
    ticker: "TSLA",
    companyName: "Tesla Inc.",
    eventType: "Earnings",
    eventDate: "2025-07-10",
    eventDescription: "Q2 2025 earnings report expected to show delivery numbers and guidance updates",
    currentPrice: 248.50,
    impliedVolatility: 85,
    expectedMove: "8.2%",
    recommendingModels: ["AdaBoost", "Decision Tree", "Hist Gradient Boosting", "K Means", "Linear Regression", "Logistic Regression"],
    recommendation: "Strongly Recommended",
    strategy: {
      name: "Calendar Spread",
      description: "Sell 7-day ATM call, Buy 30-day ATM call",
      netDebit: 2.45,
      maxLoss: 2.45,
      maxProfit: 12.55,
      winRate: 68
    }
  },
  {
    ticker: "AAPL",
    companyName: "Apple Inc.",
    eventType: "Product Launch",
    eventDate: "2025-07-12",
    eventDescription: "iPhone 16 Pro launch event with new AI features announcement",
    currentPrice: 192.80,
    impliedVolatility: 42,
    expectedMove: "4.1%",
    recommendingModels: ["K Means", "Linear Regression", "Logistic Regression", "Neural Network", "Random Forest", "SVR", "XGBoost"],
    recommendation: "Strongly Recommended",
    strategy: {
      name: "Iron Condor",
      description: "Sell ATM straddle, Buy OTM strangle",
      netDebit: 1.85,
      maxLoss: 1.85,
      maxProfit: 8.15,
      winRate: 72
    }
  },
  {
    ticker: "NVDA",
    companyName: "NVIDIA Corporation",
    eventType: "Conference Call",
    eventDate: "2025-07-14",
    eventDescription: "AI chip demand and data center growth discussion",
    currentPrice: 875.30,
    impliedVolatility: 78,
    expectedMove: "9.5%",
    recommendingModels: ["K Means", "Linear Regression"],
    recommendation: "Considered",
    strategy: null
  }
];

export function AlertsView() {
  const [alerts, setAlerts] = useState<string[]>([]);
  const { toast } = useToast();

  // Load alerts from localStorage on component mount
  useEffect(() => {
    try {
      const savedAlerts = localStorage.getItem('tradingAlerts');
      if (savedAlerts) {
        setAlerts(JSON.parse(savedAlerts));
      }
    } catch {
      setAlerts([]);
    }
  }, []);

  const handleRemoveAlert = (ticker: string) => {
    const newAlerts = alerts.filter(t => t !== ticker);
    setAlerts(newAlerts);
    localStorage.setItem('tradingAlerts', JSON.stringify(newAlerts));
    
    toast({
      title: "Alert Removed",
      description: `${ticker} removed from your alerts.`,
    });
  };

  const alertedOpportunities = mockOpportunities.filter(opp => 
    alerts.includes(opp.ticker)
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Bell className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Trading Alerts</h1>
          <p className="text-slate-400">Monitor your selected trading opportunities and strategies</p>
          {alerts.length > 0 && (
            <p className="text-sm text-slate-500">
              {alerts.length} active alert{alerts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">No trading alerts set</p>
              <p className="text-sm text-slate-500">Go to Opportunities to set alerts for trading strategies</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alertedOpportunities.map((opportunity) => (
                <Card key={opportunity.ticker} className="bg-slate-700 border-slate-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-slate-100 text-lg">{opportunity.ticker}</CardTitle>
                        <p className="text-slate-300 text-sm">{opportunity.companyName}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemoveAlert(opportunity.ticker)}
                        className="text-red-400 border-red-600/30 hover:bg-red-600/20"
                      >
                        <BellOff className="w-4 h-4 mr-1" />
                        Remove Alert
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-slate-200 font-medium mb-2">Event Details</h4>
                        <p className="text-slate-300 text-sm mb-1">
                          {opportunity.eventType} • {formatDate(opportunity.eventDate)}
                        </p>
                        <p className="text-slate-400 text-sm">{opportunity.eventDescription}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-slate-200 font-medium mb-2">Trading Strategy</h4>
                        {opportunity.strategy ? (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-300 font-medium">{opportunity.strategy.name}</span>
                              <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                                {opportunity.strategy.winRate}% Win Rate
                              </Badge>
                            </div>
                            <p className="text-slate-400 text-sm">{opportunity.strategy.description}</p>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div>
                                <p className="text-slate-500">Net Debit</p>
                                <p className="text-slate-300">${opportunity.strategy.netDebit}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Max Loss</p>
                                <p className="text-red-400">${opportunity.strategy.maxLoss}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Max Profit</p>
                                <p className="text-green-400">${opportunity.strategy.maxProfit}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-slate-400 text-sm">No strategy recommended</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-slate-600">
                      <div>
                        <p className="text-slate-500 text-xs">Current Price: <span className="text-slate-300">${opportunity.currentPrice}</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-500 text-xs">Expected Move: <span className="text-slate-300">{opportunity.expectedMove}</span></p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
