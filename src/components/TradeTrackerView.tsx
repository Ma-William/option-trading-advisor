
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendingUp, Calendar, DollarSign, Percent, Activity, TrendingDown, Target, Eye } from "lucide-react";

// Mock data for historical alerts/trades
const mockHistoricalTrades = [
  {
    id: 1,
    ticker: "TSLA",
    companyName: "Tesla Inc.",
    eventType: "Earnings",
    eventDate: "2025-01-15",
    recommendation: "Strongly Recommended",
    strategy: "Calendar Spread",
    roi: 12.3,
    status: "Closed"
  },
  {
    id: 2,
    ticker: "AAPL",
    companyName: "Apple Inc.",
    eventType: "Product Launch",
    eventDate: "2025-01-18",
    recommendation: "Recommended",
    strategy: "Iron Condor",
    roi: -4.2,
    status: "Closed"
  },
  {
    id: 3,
    ticker: "NVDA",
    companyName: "NVIDIA Corporation",
    eventType: "Conference Call",
    eventDate: "2025-01-20",
    recommendation: "Considered",
    strategy: "Calendar Spread",
    roi: 8.7,
    status: "Closed"
  },
  {
    id: 4,
    ticker: "MSFT",
    companyName: "Microsoft Corporation",
    eventType: "Earnings",
    eventDate: "2025-01-22",
    recommendation: "Strongly Recommended",
    strategy: "Calendar Spread",
    roi: 15.2,
    status: "Closed"
  },
  {
    id: 5,
    ticker: "GOOGL",
    companyName: "Alphabet Inc.",
    eventType: "Earnings",
    eventDate: "2025-01-25",
    recommendation: "Recommended",
    strategy: "Calendar Spread",
    roi: 6.8,
    status: "Closed"
  },
  // Generate more positive entries to reach 47 total
  ...Array.from({ length: 42 }, (_, i) => ({
    id: i + 6,
    ticker: ["META", "AMZN", "NFLX", "AMD", "INTC", "CRM", "UBER", "LYFT", "SPOT", "SQ"][i % 10],
    companyName: ["Meta Platforms", "Amazon", "Netflix", "AMD", "Intel", "Salesforce", "Uber", "Lyft", "Spotify", "Block"][i % 10],
    eventType: ["Earnings", "Product Launch", "Conference Call"][i % 3],
    eventDate: `2025-0${((i % 3) + 2)}-${String((i % 28) + 1).padStart(2, '0')}`,
    recommendation: ["Strongly Recommended", "Recommended", "Considered"][i % 3],
    strategy: ["Calendar Spread", "Iron Condor", "Butterfly Spread"][i % 3],
    roi: Math.round((Math.random() * 25 + 2) * 10) / 10, // Mostly positive ROI
    status: "Closed"
  }))
];

const portfolioStats = [
  {
    title: "Total Trades",
    value: "47",
    change: "+12 this month",
    icon: Target,
    color: "text-blue-600"
  },
  {
    title: "Win Rate",
    value: "52%",
    change: "+5% vs last month",
    icon: TrendingUp,
    color: "text-green-600"
  },
  {
    title: "ROI",
    value: "12.4%",
    change: "+3.2% this month",
    icon: Percent,
    color: "text-green-600"
  },
  {
    title: "Volatility",
    value: "5.8%",
    change: "+1.1% this month",
    icon: Activity,
    color: "text-yellow-600"
  },
  {
    title: "Sharpe Ratio",
    value: "1.98",
    change: "+0.12 this month",
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    title: "Max Drawdown",
    value: "22.56%",
    change: "+2.3% this month",
    icon: TrendingDown,
    color: "text-red-600"
  }
];

const StrategyModal = ({ trade }: { trade: any }) => {
  return (
    <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
      <DialogHeader>
        <DialogTitle className="text-slate-100">Strategy Overview - {trade.ticker}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">Objective</h3>
          <p className="text-slate-300">Profit from implied volatility crush after earnings while maintaining upside potential.</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">Type</h3>
          <p className="text-slate-300">Calendar Spread (Call)</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Trade Setup</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-2 px-3 text-slate-200 font-medium">Leg</th>
                  <th className="text-left py-2 px-3 text-slate-200 font-medium">Action</th>
                  <th className="text-left py-2 px-3 text-slate-200 font-medium">Option Type</th>
                  <th className="text-left py-2 px-3 text-slate-200 font-medium">Strike</th>
                  <th className="text-left py-2 px-3 text-slate-200 font-medium">Expiration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="py-2 px-3 text-slate-300">1</td>
                  <td className="py-2 px-3 text-red-400 font-medium">Sell</td>
                  <td className="py-2 px-3 text-slate-300">Call (ATM)</td>
                  <td className="py-2 px-3 text-slate-300">ATM</td>
                  <td className="py-2 px-3 text-slate-300">Nearest (Earnings Week)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-300">2</td>
                  <td className="py-2 px-3 text-green-400 font-medium">Buy</td>
                  <td className="py-2 px-3 text-slate-300">Call (ATM)</td>
                  <td className="py-2 px-3 text-slate-300">ATM</td>
                  <td className="py-2 px-3 text-slate-300">+30 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-slate-900 p-4 rounded-lg">
          <h4 className="text-slate-200 font-medium mb-2">Key Points</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            <li>Sell an at-the-money call option with the nearest expiration date (coinciding with the earnings announcement).</li>
            <li>Buy an at-the-money call option with an expiration around 30 days later.</li>
          </ul>
        </div>
      </div>
    </DialogContent>
  );
};

export function TradeTrackerView() {
  const [selectedTrade, setSelectedTrade] = useState<any>(null);

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

  const getRoiColor = (roi: number) => {
    if (roi > 0) return "text-green-400";
    if (roi < 0) return "text-red-400";
    return "text-slate-400";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <TrendingUp className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Trade Tracker</h1>
          <p className="text-slate-400">Monitor your trading performance and historical alerts</p>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {portfolioStats.map((stat, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-100 mt-1">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-slate-700 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Historical Alerts */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span>Historical Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Ticker</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Event Type</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Event Date</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Recommendation</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Strategy</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">ROI</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockHistoricalTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-slate-700 hover:bg-slate-700/30">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-100">{trade.ticker}</p>
                        <p className="text-sm text-slate-400">{trade.companyName}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{trade.eventType}</td>
                    <td className="py-3 px-4 text-slate-300">{formatDate(trade.eventDate)}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getRecommendationBadge(trade.recommendation)} border text-xs`}>
                        {trade.recommendation}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{trade.strategy}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${getRoiColor(trade.roi)}`}>
                        {trade.roi > 0 ? '+' : ''}{trade.roi}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
                        {trade.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            onClick={() => setSelectedTrade(trade)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Strategy
                          </Button>
                        </DialogTrigger>
                        <StrategyModal trade={trade} />
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
