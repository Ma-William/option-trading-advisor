
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TickerSelector } from "@/components/TickerSelector";
import { OpportunityCard } from "@/components/OpportunityCard";
import { Calendar, TrendingUp } from "lucide-react";

// Mock data for opportunities
const mockOpportunities = [
  {
    ticker: "TSLA",
    companyName: "Tesla Inc.",
    eventType: "Earnings",
    eventDate: "2025-07-10",
    currentPrice: 248.50,
    impliedVolatility: 85,
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
    currentPrice: 192.80,
    impliedVolatility: 42,
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
    currentPrice: 875.30,
    impliedVolatility: 78,
    strategy: null // No recommended strategy
  }
];

export function OpportunitiesView() {
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);

  const filteredOpportunities = selectedTickers.length > 0 
    ? mockOpportunities.filter(opp => selectedTickers.includes(opp.ticker))
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <TrendingUp className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Trading Opportunities</h1>
          <p className="text-slate-400">Select tickers to view upcoming events and strategies</p>
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
                {selectedTickers.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-slate-400">
                    ({filteredOpportunities.length} found)
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTickers.length === 0 ? (
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
