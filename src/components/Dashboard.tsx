import { useState } from "react";
import { Calendar, TrendingUp, Target, ChevronRight, Percent, Activity, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EarningsCard } from "@/components/EarningsCard";
import { PortfolioChart } from "@/components/PortfolioChart";

const upcomingEarnings = [
  {
    ticker: "TSLA",
    company: "Tesla Inc.",
    date: "Jul 23",
    time: "After Market",
    recommendation: "Strongly Recommended",
    marketCap: "800B"
  },
  {
    ticker: "AAPL", 
    company: "Apple Inc.",
    date: "Jul 25",
    time: "After Market",
    recommendation: "Considered",
    marketCap: "3T"
  },
  {
    ticker: "NVDA",
    company: "NVIDIA Corp.",
    date: "Jul 28",
    time: "After Market",
    recommendation: "Recommended",
    marketCap: "1.2T"
  },
  {
    ticker: "AMZN",
    company: "Amazon.com Inc.",
    date: "Jul 30",
    time: "After Market",
    recommendation: "Recommended",
    marketCap: "1.5T"
  }
];

const portfolioStats = [
  {
    title: "Total Trades",
    value: "50",
    change: "",
    icon: Target,
    color: "text-blue-600"
  },
  {
    title: "Win Rate",
    value: "86%",
    change: "",
    icon: TrendingUp,
    color: "text-green-600"
  },
  {
    title: "Average ROI",
    value: "53.3%",
    change: "",
    icon: Percent,
    color: "text-green-600"
  },
  {
    title: "Volatility",
    value: "71.1%",
    change: "",
    icon: Activity,
    color: "text-yellow-600"
  },
  {
    title: "Sharpe Ratio",
    value: "2.58",
    change: "",
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    title: "Max Drawdown",
    value: "−19.7%",
    change: "",
    icon: TrendingDown,
    color: "text-red-600"
  }
];

export function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const getFilteredEarnings = () => {
    switch (selectedFilter) {
      case "strongly-recommended":
        return upcomingEarnings.filter(earning => earning.recommendation === "Strongly Recommended");
      case "recommended+":
        return upcomingEarnings.filter(earning => 
          earning.recommendation === "Strongly Recommended" || earning.recommendation === "Recommended"
        );
      case "considered+":
        return upcomingEarnings.filter(earning => 
          earning.recommendation === "Strongly Recommended" || 
          earning.recommendation === "Recommended" || 
          earning.recommendation === "Considered"
        );
      default:
        return upcomingEarnings;
    }
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {portfolioStats.map((stat, index) => (
          <Card key={index} className="card-shadow hover:shadow-xl transition-shadow bg-slate-800 border-slate-700">
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
              <div className="flex flex-wrap gap-2 mt-4">
                {["all", "strongly-recommended", "recommended+", "considered+"].map((filter) => (
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
                    {filter === "all" ? "All" : 
                     filter === "strongly-recommended" ? "Strongly Recommended" :
                     filter === "recommended+" ? "Recommended+" :
                     "Considered+"}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {getFilteredEarnings().map((earning) => (
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
                    <p className="text-sm font-medium text-green-400">+12.3%</p>
                    <p className="text-xs text-slate-400">ROI</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600">
                  <div>
                    <p className="font-medium text-slate-100">META Calendar Spread</p>
                    <p className="text-xs text-slate-400">Expires Jul 28</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-400">-4.2%</p>
                    <p className="text-xs text-slate-400">ROI</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600">
                  <div>
                    <p className="font-medium text-slate-100">GOOGL Calendar Spread</p>
                    <p className="text-xs text-slate-400">Expires Aug 2</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-300">+1.8%</p>
                    <p className="text-xs text-slate-400">ROI</p>
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
