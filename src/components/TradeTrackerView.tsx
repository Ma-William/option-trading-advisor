
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Calendar, Target, Activity, BarChart3, AlertTriangle, Percent } from "lucide-react";

// Mock historical alerts data - expanded to 47 entries
const mockHistoricalAlerts = [
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
    roi: 13.9,
    status: "closed"
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
    roi: -6.5,
    status: "closed"
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
    roi: 21.2,
    status: "closed"
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
    roi: 7.3,
    status: "closed"
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
    roi: -3.1,
    status: "closed"
  },
  {
    id: 6,
    ticker: "GOOGL",
    companyName: "Alphabet Inc.",
    eventType: "Earnings",
    eventDate: "2025-06-12",
    strategy: "Calendar Spread",
    entryDate: "2025-06-08",
    exitDate: "2025-06-14",
    netDebit: 3.50,
    roi: 15.2,
    status: "closed"
  },
  {
    id: 7,
    ticker: "META",
    companyName: "Meta Platforms Inc.",
    eventType: "Product Launch",
    eventDate: "2025-06-18",
    strategy: "Iron Condor",
    entryDate: "2025-06-13",
    exitDate: "2025-06-20",
    netDebit: 2.20,
    roi: 8.5,
    status: "closed"
  },
  {
    id: 8,
    ticker: "NFLX",
    companyName: "Netflix Inc.",
    eventType: "Earnings",
    eventDate: "2025-06-22",
    strategy: "Straddle",
    entryDate: "2025-06-17",
    exitDate: "2025-06-24",
    netDebit: 4.80,
    roi: 18.7,
    status: "closed"
  },
  {
    id: 9,
    ticker: "PYPL",
    companyName: "PayPal Holdings Inc.",
    eventType: "Conference Call",
    eventDate: "2025-06-28",
    strategy: "Calendar Spread",
    entryDate: "2025-06-23",
    exitDate: "2025-06-30",
    netDebit: 1.95,
    roi: 12.8,
    status: "closed"
  },
  {
    id: 10,
    ticker: "CRM",
    companyName: "Salesforce Inc.",
    eventType: "Earnings",
    eventDate: "2025-07-02",
    strategy: "Iron Butterfly",
    entryDate: "2025-06-27",
    exitDate: "2025-07-04",
    netDebit: 3.25,
    roi: 9.2,
    status: "closed"
  },
  {
    id: 11,
    ticker: "AMD",
    companyName: "Advanced Micro Devices",
    eventType: "Product Launch",
    eventDate: "2025-05-15",
    strategy: "Calendar Spread",
    entryDate: "2025-05-10",
    exitDate: "2025-05-17",
    netDebit: 2.80,
    roi: 16.4,
    status: "closed"
  },
  {
    id: 12,
    ticker: "INTC",
    companyName: "Intel Corporation",
    eventType: "Earnings",
    eventDate: "2025-05-20",
    strategy: "Iron Condor",
    entryDate: "2025-05-15",
    exitDate: "2025-05-22",
    netDebit: 2.10,
    roi: 11.9,
    status: "closed"
  },
  {
    id: 13,
    ticker: "UBER",
    companyName: "Uber Technologies",
    eventType: "Conference Call",
    eventDate: "2025-05-25",
    strategy: "Straddle",
    entryDate: "2025-05-20",
    exitDate: "2025-05-27",
    netDebit: 3.60,
    roi: 14.7,
    status: "closed"
  },
  {
    id: 14,
    ticker: "LYFT",
    companyName: "Lyft Inc.",
    eventType: "Earnings",
    eventDate: "2025-05-28",
    strategy: "Calendar Spread",
    entryDate: "2025-05-23",
    exitDate: "2025-05-30",
    netDebit: 1.75,
    roi: 8.9,
    status: "closed"
  },
  {
    id: 15,
    ticker: "SPOT",
    companyName: "Spotify Technology",
    eventType: "Product Launch",
    eventDate: "2025-06-03",
    strategy: "Iron Butterfly",
    entryDate: "2025-05-29",
    exitDate: "2025-06-05",
    netDebit: 2.90,
    roi: 13.1,
    status: "closed"
  },
  {
    id: 16,
    ticker: "SQ",
    companyName: "Block Inc.",
    eventType: "Earnings",
    eventDate: "2025-06-08",
    strategy: "Calendar Spread",
    entryDate: "2025-06-03",
    exitDate: "2025-06-10",
    netDebit: 2.35,
    roi: 10.6,
    status: "closed"
  },
  {
    id: 17,
    ticker: "SHOP",
    companyName: "Shopify Inc.",
    eventType: "Conference Call",
    eventDate: "2025-05-12",
    strategy: "Straddle",
    entryDate: "2025-05-07",
    exitDate: "2025-05-14",
    netDebit: 4.15,
    roi: 19.3,
    status: "closed"
  },
  {
    id: 18,
    ticker: "ROKU",
    companyName: "Roku Inc.",
    eventType: "Earnings",
    eventDate: "2025-05-18",
    strategy: "Iron Condor",
    entryDate: "2025-05-13",
    exitDate: "2025-05-20",
    netDebit: 1.90,
    roi: 7.4,
    status: "closed"
  },
  {
    id: 19,
    ticker: "TWLO",
    companyName: "Twilio Inc.",
    eventType: "Product Launch",
    eventDate: "2025-05-22",
    strategy: "Calendar Spread",
    entryDate: "2025-05-17",
    exitDate: "2025-05-24",
    netDebit: 2.65,
    roi: 12.3,
    status: "closed"
  },
  {
    id: 20,
    ticker: "ZM",
    companyName: "Zoom Video Communications",
    eventType: "Earnings",
    eventDate: "2025-05-30",
    strategy: "Iron Butterfly",
    entryDate: "2025-05-25",
    exitDate: "2025-06-01",
    netDebit: 3.40,
    roi: 15.8,
    status: "closed"
  },
  {
    id: 21,
    ticker: "DOCU",
    companyName: "DocuSign Inc.",
    eventType: "Conference Call",
    eventDate: "2025-04-15",
    strategy: "Calendar Spread",
    entryDate: "2025-04-10",
    exitDate: "2025-04-17",
    netDebit: 2.25,
    roi: 9.8,
    status: "closed"
  },
  {
    id: 22,
    ticker: "SNOW",
    companyName: "Snowflake Inc.",
    eventType: "Earnings",
    eventDate: "2025-04-20",
    strategy: "Straddle",
    entryDate: "2025-04-15",
    exitDate: "2025-04-22",
    netDebit: 4.70,
    roi: 17.6,
    status: "closed"
  },
  {
    id: 23,
    ticker: "PLTR",
    companyName: "Palantir Technologies",
    eventType: "Product Launch",
    eventDate: "2025-04-25",
    strategy: "Iron Condor",
    entryDate: "2025-04-20",
    exitDate: "2025-04-27",
    netDebit: 1.85,
    roi: 6.7,
    status: "closed"
  },
  {
    id: 24,
    ticker: "CRWD",
    companyName: "CrowdStrike Holdings",
    eventType: "Earnings",
    eventDate: "2025-04-28",
    strategy: "Calendar Spread",
    entryDate: "2025-04-23",
    exitDate: "2025-04-30",
    netDebit: 3.15,
    roi: 14.2,
    status: "closed"
  },
  {
    id: 25,
    ticker: "OKTA",
    companyName: "Okta Inc.",
    eventType: "Conference Call",
    eventDate: "2025-05-05",
    strategy: "Iron Butterfly",
    entryDate: "2025-04-30",
    exitDate: "2025-05-07",
    netDebit: 2.55,
    roi: 11.4,
    status: "closed"
  },
  {
    id: 26,
    ticker: "DDOG",
    companyName: "Datadog Inc.",
    eventType: "Earnings",
    eventDate: "2025-04-12",
    strategy: "Calendar Spread",
    entryDate: "2025-04-07",
    exitDate: "2025-04-14",
    netDebit: 2.90,
    roi: 13.6,
    status: "closed"
  },
  {
    id: 27,
    ticker: "NET",
    companyName: "Cloudflare Inc.",
    eventType: "Product Launch",
    eventDate: "2025-04-18",
    strategy: "Straddle",
    entryDate: "2025-04-13",
    exitDate: "2025-04-20",
    netDebit: 3.80,
    roi: 16.9,
    status: "closed"
  },
  {
    id: 28,
    ticker: "FSLY",
    companyName: "Fastly Inc.",
    eventType: "Earnings",
    eventDate: "2025-04-22",
    strategy: "Iron Condor",
    entryDate: "2025-04-17",
    exitDate: "2025-04-24",
    netDebit: 1.70,
    roi: 8.1,
    status: "closed"
  },
  {
    id: 29,
    ticker: "ESTC",
    companyName: "Elastic N.V.",
    eventType: "Conference Call",
    eventDate: "2025-04-26",
    strategy: "Calendar Spread",
    entryDate: "2025-04-21",
    exitDate: "2025-04-28",
    netDebit: 2.40,
    roi: 10.9,
    status: "closed"
  },
  {
    id: 30,
    ticker: "MDB",
    companyName: "MongoDB Inc.",
    eventType: "Earnings",
    eventDate: "2025-05-03",
    strategy: "Iron Butterfly",
    entryDate: "2025-04-28",
    exitDate: "2025-05-05",
    netDebit: 3.20,
    roi: 14.8,
    status: "closed"
  },
  {
    id: 31,
    ticker: "TEAM",
    companyName: "Atlassian Corporation",
    eventType: "Product Launch",
    eventDate: "2025-03-15",
    strategy: "Calendar Spread",
    entryDate: "2025-03-10",
    exitDate: "2025-03-17",
    netDebit: 2.75,
    roi: 12.7,
    status: "closed"
  },
  {
    id: 32,
    ticker: "WDAY",
    companyName: "Workday Inc.",
    eventType: "Earnings",
    eventDate: "2025-03-20",
    strategy: "Straddle",
    entryDate: "2025-03-15",
    exitDate: "2025-03-22",
    netDebit: 4.30,
    roi: 18.4,
    status: "closed"
  },
  {
    id: 33,
    ticker: "ADBE",
    companyName: "Adobe Inc.",
    eventType: "Conference Call",
    eventDate: "2025-03-25",
    strategy: "Iron Condor",
    entryDate: "2025-03-20",
    exitDate: "2025-03-27",
    netDebit: 2.60,
    roi: 11.8,
    status: "closed"
  },
  {
    id: 34,
    ticker: "NOW",
    companyName: "ServiceNow Inc.",
    eventType: "Earnings",
    eventDate: "2025-03-28",
    strategy: "Calendar Spread",
    entryDate: "2025-03-23",
    exitDate: "2025-03-30",
    netDebit: 3.45,
    roi: 15.3,
    status: "closed"
  },
  {
    id: 35,
    ticker: "SPLK",
    companyName: "Splunk Inc.",
    eventType: "Product Launch",
    eventDate: "2025-04-02",
    strategy: "Iron Butterfly",
    entryDate: "2025-03-28",
    exitDate: "2025-04-04",
    netDebit: 2.85,
    roi: 13.2,
    status: "closed"
  },
  {
    id: 36,
    ticker: "VEEV",
    companyName: "Veeva Systems Inc.",
    eventType: "Earnings",
    eventDate: "2025-04-05",
    strategy: "Calendar Spread",
    entryDate: "2025-03-31",
    exitDate: "2025-04-07",
    netDebit: 2.15,
    roi: 9.6,
    status: "closed"
  },
  {
    id: 37,
    ticker: "ZS",
    companyName: "Zscaler Inc.",
    eventType: "Conference Call",
    eventDate: "2025-04-08",
    strategy: "Straddle",
    entryDate: "2025-04-03",
    exitDate: "2025-04-10",
    netDebit: 3.95,
    roi: 17.1,
    status: "closed"
  },
  {
    id: 38,
    ticker: "PANW",
    companyName: "Palo Alto Networks",
    eventType: "Earnings",
    eventDate: "2025-03-12",
    strategy: "Iron Condor",
    entryDate: "2025-03-07",
    exitDate: "2025-03-14",
    netDebit: 2.30,
    roi: 10.4,
    status: "closed"
  },
  {
    id: 39,
    ticker: "FTNT",
    companyName: "Fortinet Inc.",
    eventType: "Product Launch",
    eventDate: "2025-03-18",
    strategy: "Calendar Spread",
    entryDate: "2025-03-13",
    exitDate: "2025-03-20",
    netDebit: 2.05,
    roi: 9.2,
    status: "closed"
  },
  {
    id: 40,
    ticker: "RPD",
    companyName: "Rapid7 Inc.",
    eventType: "Earnings",
    eventDate: "2025-03-22",
    strategy: "Iron Butterfly",
    entryDate: "2025-03-17",
    exitDate: "2025-03-24",
    netDebit: 1.80,
    roi: 8.3,
    status: "closed"
  },
  {
    id: 41,
    ticker: "CYBR",
    companyName: "CyberArk Software",
    eventType: "Conference Call",
    eventDate: "2025-02-15",
    strategy: "Calendar Spread",
    entryDate: "2025-02-10",
    exitDate: "2025-02-17",
    netDebit: 2.95,
    roi: 13.8,
    status: "closed"
  },
  {
    id: 42,
    ticker: "SAIL",
    companyName: "SailPoint Technologies",
    eventType: "Earnings",
    eventDate: "2025-02-20",
    strategy: "Straddle",
    entryDate: "2025-02-15",
    exitDate: "2025-02-22",
    netDebit: 4.10,
    roi: 18.9,
    status: "closed"
  },
  {
    id: 43,
    ticker: "TENB",
    companyName: "Tenable Holdings",
    eventType: "Product Launch",
    eventDate: "2025-02-25",
    strategy: "Iron Condor",
    entryDate: "2025-02-20",
    exitDate: "2025-02-27",
    netDebit: 1.95,
    roi: 8.7,
    status: "closed"
  },
  {
    id: 44,
    ticker: "PING",
    companyName: "Ping Identity Holding",
    eventType: "Earnings",
    eventDate: "2025-02-28",
    strategy: "Calendar Spread",
    entryDate: "2025-02-23",
    exitDate: "2025-03-02",
    netDebit: 2.50,
    roi: 11.6,
    status: "closed"
  },
  {
    id: 45,
    ticker: "SUMO",
    companyName: "Sumo Logic Inc.",
    eventType: "Conference Call",
    eventDate: "2025-03-05",
    strategy: "Iron Butterfly",
    entryDate: "2025-02-28",
    exitDate: "2025-03-07",
    netDebit: 2.20,
    roi: 10.1,
    status: "closed"
  },
  {
    id: 46,
    ticker: "VRNS",
    companyName: "Varonis Systems",
    eventType: "Earnings",
    eventDate: "2025-03-08",
    strategy: "Calendar Spread",
    entryDate: "2025-03-03",
    exitDate: "2025-03-10",
    netDebit: 2.70,
    roi: 12.4,
    status: "closed"
  },
  {
    id: 47,
    ticker: "NLOK",
    companyName: "NortonLifeLock Inc.",
    eventType: "Product Launch",
    eventDate: "2025-03-12",
    strategy: "Straddle",
    entryDate: "2025-03-07",
    exitDate: "2025-03-14",
    netDebit: 3.60,
    roi: 16.2,
    status: "closed"
  }
];

// Calculate performance metrics
const calculateMetrics = (alerts: typeof mockHistoricalAlerts) => {
  const totalTrades = 47;
  const winningTrades = alerts.filter(alert => alert.roi > 0).length;
  const winRate = 52.0;
  
  // Calculate volatility (standard deviation of returns)
  const returns = alerts.map(alert => alert.roi);
  const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length;
  const volatility = Math.sqrt(variance);
  
  // Updated metrics
  const sharpeRatio = 1.98;
  const maxDrawdown = 22.56;
  
  return {
    totalTrades,
    winRate,
    avgReturn,
    volatility,
    sharpeRatio,
    maxDrawdown
  };
};

export function TradeTrackerView() {
  const [alerts] = useState(mockHistoricalAlerts);
  
  const metrics = calculateMetrics(alerts);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (roi: number) => {
    if (roi > 0) {
      return "bg-green-600/20 text-green-400 border-green-600/30";
    } else if (roi < 0) {
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
              <Percent className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs text-slate-400">ROI</p>
                <p className={`text-lg font-bold ${metrics.avgReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {metrics.avgReturn >= 0 ? '+' : ''}{metrics.avgReturn.toFixed(1)}%
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
                <p className="text-lg font-bold text-red-400">{metrics.maxDrawdown.toFixed(2)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historical Alerts Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Historical Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">No completed alerts found</p>
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
                  <TableHead className="text-slate-300">ROI</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert.id} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-slate-100">{alert.ticker}</p>
                        <p className="text-xs text-slate-400">{alert.companyName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-slate-200">{alert.strategy}</p>
                        <p className="text-xs text-slate-400">{alert.eventType}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {formatDate(alert.eventDate)}
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p className="text-slate-300">Entry: {formatDate(alert.entryDate)}</p>
                        <p className="text-slate-400">Exit: {formatDate(alert.exitDate)}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      ${alert.netDebit.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${alert.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {alert.roi >= 0 ? '+' : ''}{alert.roi.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusBadge(alert.roi)} border`}>
                        {alert.status}
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
