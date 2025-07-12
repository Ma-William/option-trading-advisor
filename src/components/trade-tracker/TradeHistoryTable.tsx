
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Eye } from "lucide-react";
import { StrategyModal } from "./StrategyModal";
import { formatDate, getRoiColor } from "./utils";

interface Trade {
  id: number;
  ticker: string;
  strategy: string;
  eventDate: string;
  entryDate: string;
  exitDate: string;
  pctReturn: number;
  status: string;
  nearExp: string;
  longExp: string;
  strike: number;
  entryCost: number;
  exitProceeds: number;
}

const mockHistoricalTrades: Trade[] = [
  {
    id: 1,
    ticker: "TSLA",
    strategy: "Calendar Spread",
    eventDate: "2025-07-23",
    entryDate: "2025-07-23",
    exitDate: "2025-07-24",
    pctReturn: 0.0323,
    status: "Close",
    nearExp: "2025-07-25",
    longExp: "2025-08-22",
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
    nearExp: "2025-07-28",
    longExp: "2025-08-25",
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
    nearExp: "2025-08-01",
    longExp: "2025-08-28",
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
    nearExp: "2025-08-01",
    longExp: "2025-08-30",
    strike: 145.80,
    entryCost: 3.20,
    exitProceeds: 4.00
  }
];

export function TradeHistoryTable() {
  return (
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
  );
}
