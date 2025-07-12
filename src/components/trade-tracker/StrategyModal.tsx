
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

interface StrategyModalProps {
  trade: Trade;
}

export function StrategyModal({ trade }: StrategyModalProps) {
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
}
