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
    eventDate: "2025-07-23",
    eventDescription: "Q2 2025 earnings announcement. Expected to report on vehicle deliveries, energy storage deployments, and FSD progress.",
    currentPrice: 248.50,
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
    eventType: "Earnings",
    eventDate: "2025-07-25",
    eventDescription: "Q2 2025 earnings announcement. Focus on iPhone sales, Services revenue growth, and AI integration progress.",
    currentPrice: 192.80,
    expectedMove: "4.1%",
    recommendingModels: ["K Means", "Linear Regression", "Logistic Regression", "Neural Network", "Random Forest", "SVR", "XGBoost"],
    recommendation: "Strongly Recommended",
    strategy: {
      name: "Calendar Spread",
      description: "Sell 7-day ATM call, Buy 30-day ATM call",
      netDebit: 1.85,
      maxLoss: 1.85,
      maxProfit: 8.15,
      winRate: 72
    }
  },
  {
    ticker: "NVDA",
    companyName: "NVIDIA Corporation",
    eventType: "Earnings",
    eventDate: "2025-07-28",
    eventDescription: "Q2 2025 earnings announcement. Expected discussion on AI chip demand, data center growth, and gaming segment performance.",
    currentPrice: 875.30,
    expectedMove: "9.5%",
    recommendingModels: ["K Means", "Linear Regression"],
    recommendation: "Considered",
    strategy: {
      name: "Calendar Spread",
      description: "Sell 7-day ATM call, Buy 30-day ATM call",
      netDebit: 3.20,
      maxLoss: 3.20,
      maxProfit: 15.80,
      winRate: 65
    }
  },
  {
    ticker: "AMZN",
    companyName: "Amazon.com Inc.",
    eventType: "Earnings",
    eventDate: "2025-07-30",
    eventDescription: "Q2 2025 earnings announcement. Focus on AWS growth, retail margins, and advertising revenue expansion.",
    currentPrice: 145.80,
    expectedMove: "6.8%",
    recommendingModels: ["AdaBoost", "Random Forest", "XGBoost"],
    recommendation: "Considered",
    strategy: {
      name: "Calendar Spread",
      description: "Sell 7-day ATM call, Buy 30-day ATM call",
      netDebit: 3.20,
      maxLoss: 3.20,
      maxProfit: 15.80,
      winRate: 65
    }
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

  const getNextTradingDate = (eventDate: string) => {
    const date = new Date(eventDate);
    date.setDate(date.getDate() + 1);
    return formatDate(date.toISOString().split('T')[0]);
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
                      </div>
                      
                      <div>
                        <h4 className="text-slate-200 font-medium mb-2">Trading Strategy</h4>
                        {opportunity.strategy ? (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-300 font-medium">{opportunity.strategy.name}</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-slate-400 text-sm">No strategy recommended</p>
                        )}
                      </div>
                    </div>

                    {/* Trade Setup Details */}
                    <div className="pt-4 border-t border-slate-600">
                      <h4 className="text-slate-200 font-medium mb-3">Trade Setup</h4>
                      
                      {/* Entry Details */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-slate-300 font-medium">Entry Date: {formatDate(opportunity.eventDate)}</h5>
                        </div>
                        <div className="bg-slate-800 rounded p-3">
                          <div className="grid grid-cols-5 gap-2 text-xs font-medium text-slate-400 mb-2">
                            <div>Leg</div>
                            <div>Action</div>
                            <div>Option Type</div>
                            <div>Strike</div>
                            <div>Expiration</div>
                          </div>
                          <div className="grid grid-cols-5 gap-2 text-xs text-slate-300 mb-1">
                            <div>1</div>
                            <div>Sell</div>
                            <div>Call (ATM)</div>
                            <div>ATM</div>
                            <div>Nearest (Earnings Week)</div>
                          </div>
                          <div className="grid grid-cols-5 gap-2 text-xs text-slate-300">
                            <div>2</div>
                            <div>Buy</div>
                            <div>Call (ATM)</div>
                            <div>ATM</div>
                            <div>+30 Days</div>
                          </div>
                        </div>
                      </div>

                      {/* Exit Details */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-slate-300 font-medium">Exit Date: {getNextTradingDate(opportunity.eventDate)}</h5>
                        </div>
                        <div className="bg-slate-800 rounded p-3">
                          <div className="grid grid-cols-5 gap-2 text-xs font-medium text-slate-400 mb-2">
                            <div>Leg</div>
                            <div>Action</div>
                            <div>Option Type</div>
                            <div>Strike</div>
                            <div>Expiration</div>
                          </div>
                          <div className="grid grid-cols-5 gap-2 text-xs text-slate-300 mb-1">
                            <div>1</div>
                            <div>Buy</div>
                            <div>Call (ATM)</div>
                            <div>ATM</div>
                            <div>Nearest (Earnings Week)</div>
                          </div>
                          <div className="grid grid-cols-5 gap-2 text-xs text-slate-300">
                            <div>2</div>
                            <div>Sell</div>
                            <div>Call (ATM)</div>
                            <div>ATM</div>
                            <div>+30 Days</div>
                          </div>
                        </div>
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
