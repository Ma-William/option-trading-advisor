
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendingUp, Calendar, DollarSign, Percent, Activity, TrendingDown, Target, Eye } from "lucide-react";

// Updated mock data based on opportunities
const mockHistoricalTrades = [
  {
    id: 1,
    ticker: "TSLA",
    strategy: "Calendar Spread",
    eventDate: "2025-07-23",
    entryDate: "2025-07-23",
    exitDate: "2025-07-24",
    pctReturn: 0.0323,
    status: "Close",
    nearExp: "2025-07-25", // Earnings week
    longExp: "2025-08-22", // +30 days
    strike: 248.50,
    entryCost: 2.45,
    exitProceeds: 2.53
  },
  {
    id: 2,
    ticker: "AAPL",
    strategy: "Calendar Spread",
    eventDate: "2025-07-25",
    entryDate: "2025-07-25",
    exitDate: "2025-07-26",
    pctReturn: 0.082,
    status: "Close",
    nearExp: "2025-07-28", // Earnings week
    longExp: "2025-08-25", // +30 days
    strike: 192.80,
    entryCost: 1.85,
    exitProceeds: 2.00
  },
  {
    id: 3,
    ticker: "NVDA",
    strategy: "Calendar Spread",
    eventDate: "2025-07-28",
    entryDate: "2025-07-28",
    exitDate: "2025-07-29",
    pctReturn: 0.5714,
    status: "Close",
    nearExp: "2025-08-01", // Earnings week
    longExp: "2025-08-28", // +30 days
    strike: 875.30,
    entryCost: 3.20,
    exitProceeds: 5.03
  },
  {
    id: 4,
    ticker: "AMZN",
    strategy: "Calendar Spread",
    eventDate: "2025-07-30",
    entryDate: "2025-07-30",
    exitDate: "2025-07-31",
    pctReturn: 0.25,
    status: "Close",
    nearExp: "2025-08-01", // Earnings week
    longExp: "2025-08-30", // +30 days
    strike: 145.80,
    entryCost: 3.20,
    exitProceeds: 4.00
  }
];

const portfolioStats = [
  {
    title: "Total Trades",
    value: "4",
    change: "",
    icon: Target,
    color: "text-blue-600"
  },
  {
    title: "Win Rate",
    value: "100%",
    change: "",
    icon: TrendingUp,
    color: "text-green-600"
  },
  {
    title: "Average ROI",
    value: "23.7%",
    change: "",
    icon: Percent,
    color: "text-green-600"
  },
  {
    title: "Volatility",
    value: "22.1%",
    change: "",
    icon: Activity,
    color: "text-yellow-600"
  },
  {
    title: "Sharpe Ratio",
    value: "1.07",
    change: "",
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    title: "Max Drawdown",
    value: "0%",
    change: "",
    icon: TrendingDown,
    color: "text-green-600"
  }
];

const StrategyModal = ({ trade }: { trade: any }) => {
  const getRoiColor = (roi: number) => {
    if (roi > 0) return "text-green-400";
    if (roi < 0) return "text-red-400";
    return "text-slate-400";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <DialogContent className="max-w-4xl bg-slate-800 border-slate-700">
      <DialogHeader>
        <DialogTitle className="text-slate-100">Trade Setup - {trade.ticker}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">Entry Date: {formatDate(trade.entryDate)}</h3>
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
                  <td className="py-2 px-3 text-slate-300">{trade.strike}</td>
                  <td className="py-2 px-3 text-slate-300">{formatDate(trade.nearExp)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-300">2</td>
                  <td className="py-2 px-3 text-green-400 font-medium">Buy</td>
                  <td className="py-2 px-3 text-slate-300">Call (ATM)</td>
                  <td className="py-2 px-3 text-slate-300">{trade.strike}</td>
                  <td className="py-2 px-3 text-slate-300">{formatDate(trade.longExp)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">Exit Date: {formatDate(trade.exitDate)}</h3>
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
                  <td className="py-2 px-3 text-green-400 font-medium">Buy</td>
                  <td className="py-2 px-3 text-slate-300">Call (ATM)</td>
                  <td className="py-2 px-3 text-slate-300">{trade.strike}</td>
                  <td className="py-2 px-3 text-slate-300">{formatDate(trade.nearExp)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-300">2</td>
                  <td className="py-2 px-3 text-red-400 font-medium">Sell</td>
                  <td className="py-2 px-3 text-slate-300">Call (ATM)</td>
                  <td className="py-2 px-3 text-slate-300">{trade.strike}</td>
                  <td className="py-2 px-3 text-slate-300">{formatDate(trade.longExp)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Entry Cost</div>
              <div className="text-lg font-semibold text-slate-100">${trade.entryCost}</div>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Exit Proceeds</div>
              <div className="text-lg font-semibold text-slate-100">${trade.exitProceeds}</div>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">ROI</div>
              <div className={`text-lg font-semibold ${getRoiColor(trade.pctReturn)}`}>
                {trade.pctReturn > 0 ? '+' : ''}{(trade.pctReturn * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
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

export function TradeTrackerView() {
  const [selectedTrade, setSelectedTrade] = useState<any>(null);

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
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Strategy</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Event Date</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Entry/Exit</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">ROI</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockHistoricalTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-slate-700 hover:bg-slate-700/30">
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-100">{trade.ticker}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-300">Calendar Spread</div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{formatDate(trade.eventDate)}</td>
                    <td className="py-3 px-4">
                      <div className="text-slate-300">
                        <div className="text-sm">Entry: {formatDate(trade.entryDate)}</div>
                        <div className="text-xs text-slate-500">Exit: {formatDate(trade.exitDate)}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${getRoiColor(trade.pctReturn)}`}>
                        {trade.pctReturn > 0 ? '+' : ''}{(trade.pctReturn * 100).toFixed(1)}%
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
