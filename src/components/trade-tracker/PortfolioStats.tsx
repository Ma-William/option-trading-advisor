
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, Percent, Activity, TrendingDown } from "lucide-react";

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

export function PortfolioStats() {
  return (
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
  );
}
