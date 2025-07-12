
import { TrendingUp } from "lucide-react";
import { PortfolioStats } from "./trade-tracker/PortfolioStats";
import { TradeHistoryTable } from "./trade-tracker/TradeHistoryTable";

export function TradeTrackerView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <TrendingUp className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Trade Tracker</h1>
          <p className="text-slate-400">Monitor your trading performance and historical alerts</p>
        </div>
      </div>

      <PortfolioStats />
      <TradeHistoryTable />
    </div>
  );
}
