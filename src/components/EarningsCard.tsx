
import { Calendar, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

interface EarningsCardProps {
  earning: {
    ticker: string;
    company: string;
    date: string;
    time: string;
    recommendation: string;
    marketCap: string;
  };
}

export function EarningsCard({ earning }: EarningsCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "Strongly Recommended":
        return "bg-teal-500/20 text-teal-400 border-teal-500/50 font-semibold";
      case "Recommended":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50 font-semibold";
      case "Considered":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50 font-semibold";
      case "Not Considered":
        return "bg-slate-500/20 text-slate-400 border-slate-500/50 font-semibold";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50 font-semibold";
    }
  };

  const getRecommendationText = (rec: string) => {
    return rec.toUpperCase();
  };

  return (
    <>
      <div className="border border-slate-700 rounded-lg p-4 card-hover bg-slate-800 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">{earning.ticker}</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">{earning.ticker}</h3>
              <p className="text-sm text-slate-400">{earning.company}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={getRecommendationColor(earning.recommendation)}
          >
            {getRecommendationText(earning.recommendation)}
          </Badge>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <div>
              <p className="text-sm font-semibold text-slate-100">{earning.date}</p>
              <p className="text-xs text-slate-400">{earning.time}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400 font-medium">
            Market Cap: {earning.marketCap}
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-semibold text-white">
                View Strategy <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-slate-100 text-xl">Strategy Details - {earning.ticker}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">Strategy Overview</h3>
                  <p className="text-slate-300 mb-2">
                    <span className="font-medium">Objective:</span> Profit from implied volatility crush after earnings while maintaining upside potential.
                  </p>
                  <p className="text-slate-300">
                    <span className="font-medium">Type:</span> Calendar Spread (Call)
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">Trade Setup</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-600">
                          <th className="text-left py-2 px-3 text-slate-300 font-medium">Leg</th>
                          <th className="text-left py-2 px-3 text-slate-300 font-medium">Action</th>
                          <th className="text-left py-2 px-3 text-slate-300 font-medium">Option Type</th>
                          <th className="text-left py-2 px-3 text-slate-300 font-medium">Strike</th>
                          <th className="text-left py-2 px-3 text-slate-300 font-medium">Expiration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-700">
                          <td className="py-2 px-3 text-slate-100">1</td>
                          <td className="py-2 px-3 text-red-400 font-medium">Sell</td>
                          <td className="py-2 px-3 text-slate-100">Call (ATM)</td>
                          <td className="py-2 px-3 text-slate-100">ATM</td>
                          <td className="py-2 px-3 text-slate-100">Nearest (Earnings Week)</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 text-slate-100">2</td>
                          <td className="py-2 px-3 text-green-400 font-medium">Buy</td>
                          <td className="py-2 px-3 text-slate-100">Call (ATM)</td>
                          <td className="py-2 px-3 text-slate-100">ATM</td>
                          <td className="py-2 px-3 text-slate-100">+30 Days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
