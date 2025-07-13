import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TickerSelector } from "@/components/TickerSelector";
import { OpportunityCard } from "@/components/OpportunityCard";
import { Calendar, TrendingUp, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for opportunities with model recommendations
const mockOpportunities = [
  {
    ticker: "TSLA",
    companyName: "Tesla Inc.",
    eventType: "Earnings", 
    eventDate: "2025-07-23",
    eventDescription: "Q2 2025 earnings announcement. Expected to report on vehicle deliveries, energy storage deployments, and FSD progress.",
    currentPrice: 248.50,
    recommendingModels: ["AdaBoost", "Decision Tree", "Hist Gradient Boosting", "K Means", "Linear Regression", "Logistic Regression"],
    recommendation: "Strongly Recommended", // 6/10 = 60%
    strategy: {
      name: "Calendar Spread",
      description: "Calendar Spread",
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
    recommendingModels: ["K Means", "Linear Regression", "Logistic Regression", "Neural Network", "Random Forest", "SVR", "XGBoost"],
    recommendation: "Strongly Recommended", // 7/10 = 70%
    strategy: {
      name: "Calendar Spread",
      description: "Calendar Spread",
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
    recommendingModels: ["K Means", "Linear Regression"],
    recommendation: "Considered", // 2/10 = 20%
    strategy: {
      name: "Calendar Spread",
      description: "Calendar Spread",
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
    recommendingModels: ["AdaBoost", "Random Forest", "XGBoost"],
    recommendation: "Considered", // 3/10 = 30%
    strategy: {
      name: "Calendar Spread",
      description: "Calendar Spread",
      netDebit: 3.20,
      maxLoss: 3.20,
      maxProfit: 15.80,
      winRate: 65
    }
  }
];

// Calculate recommendation based on selected models
const calculateRecommendation = (recommendingModels: string[], selectedModels: string[]) => {
  if (selectedModels.length === 0) return "Not Considered";
  
  const agreeingModels = recommendingModels.filter(model => selectedModels.includes(model));
  const percentage = (agreeingModels.length / selectedModels.length) * 100;
  
  if (percentage >= 60) return "Strongly Recommended";
  if (percentage >= 50) return "Recommended";
  if (percentage >= 40) return "Considered";
  return "Not Considered";
};

export function OpportunitiesView() {
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
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

  // Get selected models from localStorage (will be set from ModelSelectionPanel)
  const getSelectedModels = () => {
    try {
      const saved = localStorage.getItem('selectedModels');
      const models = saved ? JSON.parse(saved) : [];
      return Array.isArray(models) ? models : [];
    } catch {
      return [];
    }
  };

  const selectedModels = getSelectedModels();

  const filteredOpportunities = selectedTickers.length > 0 
    ? mockOpportunities
        .filter(opp => selectedTickers.includes(opp.ticker))
        .map(opp => ({
          ...opp,
          recommendation: calculateRecommendation(opp.recommendingModels, selectedModels)
        }))
    : [];

  const handleSetAlert = (opportunity: any) => {
    const newAlerts = alerts.includes(opportunity.ticker)
      ? alerts.filter(ticker => ticker !== opportunity.ticker)
      : [...alerts, opportunity.ticker];
    
    setAlerts(newAlerts);
    
    // Save to localStorage
    localStorage.setItem('tradingAlerts', JSON.stringify(newAlerts));
    
    // Show toast notification
    toast({
      title: alerts.includes(opportunity.ticker) ? "Alert Removed" : "Alert Set",
      description: `${opportunity.ticker} ${alerts.includes(opportunity.ticker) ? 'removed from' : 'added to'} your alerts.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <TrendingUp className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Trading Opportunities</h1>
          <p className="text-slate-400">Select tickers to view upcoming events and strategies</p>
          {selectedModels.length > 0 && (
            <p className="text-sm text-slate-500">
              Using {selectedModels.length} selected models for recommendations
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticker Selection Panel */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span>Select Tickers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TickerSelector 
                selectedTickers={selectedTickers}
                onSelectionChange={setSelectedTickers}
              />
            </CardContent>
          </Card>
        </div>

        {/* Opportunities Panel */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100">
                Opportunities Next 7 Days
                {selectedTickers.length > 0 && selectedModels.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-slate-400">
                    ({filteredOpportunities.length} found)
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedModels.length === 0 ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-2">No models selected</p>
                  <p className="text-sm text-slate-500">Go to Settings to select AI models for recommendations</p>
                </div>
              ) : selectedTickers.length === 0 ? (
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Select tickers to view opportunities</p>
                </div>
              ) : filteredOpportunities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-400">No opportunities found for selected tickers</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOpportunities.map((opportunity) => (
                    <OpportunityCard 
                      key={opportunity.ticker} 
                      opportunity={opportunity}
                      onSetAlert={handleSetAlert}
                      isAlertSet={alerts.includes(opportunity.ticker)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
