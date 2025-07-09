
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Calendar, DollarSign, Target, Activity, BarChart3, AlertTriangle } from "lucide-react";

// Mock historical trades data
const mockHistoricalTrades = [
  {
    id: 1,
    ticker: "TSLA",
    companyName: "Tesla Inc.",
    eventType: "Earnings",
    eventDate: "2025-06-15",
    strategy: "Calendar Spread",
    entryDate: "2025-06-10",
    exitDate: "2025-06-16",
    netDebit: 2.45,
    pnl: 340.50,
    status: "closed",
    roi: 13.9
  },
  {
    id: 2,
    ticker: "AAPL",
    companyName: "Apple Inc.",
    eventType: "Product Launch",
    eventDate: "2025-06-20",
    strategy: "Iron Condor",
    entryDate: "2025-06-15",
    exitDate: "2025-06-22",
    netDebit: 1.85,
    pnl: -120.00,
    status: "closed",
    roi: -6.5
  },
  {
    id: 3,
    ticker: "NVDA",
    companyName: "NVIDIA Corporation",
    eventType: "Conference Call",
    eventDate: "2025-06-25",
    strategy: "Straddle",
    entryDate: "2025-06-20",
    exitDate: "2025-06-26",
    netDebit: 4.20,
    pnl: 890.75,
    status: "closed",
    roi: 21.2
  },
  {
    id: 4,
    ticker: "MSFT",
    companyName: "Microsoft Corporation",
    eventType: "Earnings",
    eventDate: "2025-07-05",
    strategy: "Calendar Spread",
    entryDate: "2025-07-01",
    exitDate: "2025-07-07",
    netDebit: 3.10,
    pnl: 225.30,
    status: "closed",
    roi: 7.3
  },
  {
    id: 5,
    ticker: "AMZN",
    companyName: "Amazon.com Inc.",
    eventType: "Earnings",
    eventDate: "2025-07-08",
    strategy: "Iron Butterfly",
    entryDate: "2025-07-03",
    exitDate: "2025-07-09",
    netDebit: 2.75,
    pnl: -85.20,
    status: "closed",
    roi: -3.1
  }
];

// Calculate performance metrics
const calculateMetrics = (trades: typeof mockHistoricalTrades) => {
  const totalTrades = trades.length;
  const winningTrades = trades.filter(trade => trade.pnl > 0).length;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  
  // Calculate volatility (standard deviation of returns)
  const returns = trades.map(trade => trade.roi);
  const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length;
  const volatility = Math.sqrt(variance);
  
  // Simple Sharpe ratio calculation (assuming risk-free rate of 2%)
  const riskFreeRate = 2;
  const sharpeRatio = volatility > 0 ? (avgReturn - riskFreeRate) / volatility : 0;
  
  // Max drawdown calculation
  let peak = 0;
  let maxDrawdown = 0;
  let runningPnL = 0;
  
  trades.forEach(trade => {
    runningPnL += trade.pnl;
    if (runningPnL > peak) {
      peak = runningPnL;
    }
    const drawdown = ((peak - runningPnL) / Math.abs(peak)) * 100;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  });
  
  return {
    totalTrades,
    winRate,
    totalPnL,
    volatility,
    sharpeRatio,
    maxDrawdown
  };
};

export function TradeTrackerView() {
  const [trades] = useState(mockHistoricalTrades);
  
  const metrics = calculateMetrics(trades);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (pnl: number) => {
    if (pnl > 0) {
      return "bg-green-600/20 text-green-400 border-green-600/30";
    } else if (pnl < 0) {
      return "bg-red-600/20 text-red-400 border-red-600/30";
    }
    return "bg-slate-600/20 text-slate-400 border-slate-600/30";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <BarChart3 className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Trade Tracker</h1>
          <p className="text-slate-400">Monitor your trading performance and historical results</p>
        </div>
      </div>

      {/* Performance Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs text-slate-400">Total Trades</p>
                <p className="text-lg font-bold text-slate-100">{metrics.totalTrades}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs text-slate-400">Win Rate</p>
                <p className="text-lg font-bold text-slate-100">{metrics.winRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs text-slate-400">Total P&L</p>
                <p className={`text-lg font-bold ${metrics.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(metrics.totalPnL)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-yellow-400" />
              <div>
                <p className="text-xs text-slate-400">Volatility</p>
                <p className="text-lg font-bold text-slate-100">{metrics.volatility.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs text-slate-400">Sharpe Ratio</p>
                <p className="text-lg font-bold text-slate-100">{metrics.sharpeRatio.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <div>
                <p className="text-xs text-slate-400">Max Drawdown</p>
                <p className="text-lg font-bold text-red-400">{metrics.maxDrawdown.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historical Trades Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Historical Trades</CardTitle>
        </CardHeader>
        <CardContent>
          {trades.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">No completed trades found</p>
              <p className="text-sm text-slate-500">Your closed trading positions will appear here</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-700/50">
                  <TableHead className="text-slate-300">Ticker</TableHead>
                  <TableHead className="text-slate-300">Strategy</TableHead>
                  <TableHead className="text-slate-300">Event Date</TableHead>
                  <TableHead className="text-slate-300">Entry/Exit</TableHead>
                  <TableHead className="text-slate-300">Net Debit</TableHead>
                  <TableHead className="text-slate-300">P&L</TableHead>
                  <TableHead className="text-slate-300">ROI</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade) => (
                  <TableRow key={trade.id} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-slate-100">{trade.ticker}</p>
                        <p className="text-xs text-slate-400">{trade.companyName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-slate-200">{trade.strategy}</p>
                        <p className="text-xs text-slate-400">{trade.eventType}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {formatDate(trade.eventDate)}
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p className="text-slate-300">Entry: {formatDate(trade.entryDate)}</p>
                        <p className="text-slate-400">Exit: {formatDate(trade.exitDate)}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {formatCurrency(trade.netDebit)}
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrency(trade.pnl)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${trade.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {trade.roi >= 0 ? '+' : ''}{trade.roi.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusBadge(trade.pnl)} border`}>
                        {trade.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
