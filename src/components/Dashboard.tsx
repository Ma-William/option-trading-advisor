
import { useState } from "react";
import { Calendar, TrendingUp, DollarSign, Target, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EarningsCard } from "@/components/EarningsCard";
import { PortfolioChart } from "@/components/PortfolioChart";

const upcomingEarnings = [
  {
    ticker: "TSLA",
    company: "Tesla Inc.",
    date: "Jul 23",
    time: "After Market",
    ivRank: 85,
    recommendation: "strong-buy",
    expectedMove: "8.2%",
    marketCap: "800B"
  },
  {
    ticker: "AAPL", 
    company: "Apple Inc.",
    date: "Jul 25",
    time: "After Market",
    ivRank: 42,
    recommendation: "hold",
    expectedMove: "4.1%",
    marketCap: "3T"
  },
  {
    ticker: "NVDA",
    company: "NVIDIA Corp.",
    date: "Jul 28",
    time: "After Market",
    ivRank: 78,
    recommendation: "buy",
    expectedMove: "9.5%",
    marketCap: "1.2T"
  },
  {
    ticker: "AMZN",
    company: "Amazon.com Inc.",
    date: "Jul 30",
    time: "After Market",
    ivRank: 65,
    recommendation: "buy",
    expectedMove: "6.8%",
    marketCap: "1.5T"
  }
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
    value: "68%",
    change: "+5% vs last month",
    icon: TrendingUp,
    color: "text-green-600"
  },
  {
    title: "Total PnL",
    value: "$12,847",
    change: "+$2,340 this month",
    icon: DollarSign,
    color: "text-green-600"
  },
  {
    title: "ROI",
    value: "23.4%",
    change: "+3.2% this month",
    icon: Calendar,
    color: "text-blue-600"
  }
];

export function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Earnings Dashboard</h1>
          <p className="text-slate-400">Track and execute calendar spread opportunities</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
            Market Open
          </Badge>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
            Earnings Season
          </Badge>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioStats.map((stat, index) => (
          <Card key={index} className="card-shadow hover:shadow-xl transition-shadow bg-slate-800 border-slate-700">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Opportunities */}
        <div className="lg:col-span-2">
          <Card className="card-shadow bg-slate-800 border-slate-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-100">🔥 Trade Opportunities This Week</CardTitle>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="flex space-x-2 mt-4">
                {["all", "high-iv", "strong-buy"].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className={`capitalize ${
                      selectedFilter === filter 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "border-slate-600 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {filter.replace("-", " ")}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEarnings.map((earning) => (
                <EarningsCard key={earning.ticker} earning={earning} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Performance */}
        <div className="space-y-6">
          <Card className="card-shadow bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-100">📊 Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <PortfolioChart />
            </CardContent>
          </Card>

          <Card className="card-shadow bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-100">Active Positions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600">
                  <div>
                    <p className="font-medium text-slate-100">MSFT Calendar Spread</p>
                    <p className="text-xs text-slate-400">Expires Jul 26</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-400">+$340</p>
                    <p className="text-xs text-slate-400">12.3% ROI</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600">
                  <div>
                    <p className="font-medium text-slate-100">META Calendar Spread</p>
                    <p className="text-xs text-slate-400">Expires Jul 28</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-400">-$120</p>
                    <p className="text-xs text-slate-400">-4.2% ROI</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600">
                  <div>
                    <p className="font-medium text-slate-100">GOOGL Calendar Spread</p>
                    <p className="text-xs text-slate-400">Expires Aug 2</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-300">+$45</p>
                    <p className="text-xs text-slate-400">1.8% ROI</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
