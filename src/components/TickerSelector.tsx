
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

// Pre-determined ticker list
const AVAILABLE_TICKERS = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corp." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "NFLX", name: "Netflix Inc." },
  { symbol: "AMD", name: "Advanced Micro Devices" },
  { symbol: "CRM", name: "Salesforce Inc." },
  { symbol: "UBER", name: "Uber Technologies" },
  { symbol: "SPOT", name: "Spotify Technology" },
  { symbol: "SNOW", name: "Snowflake Inc." },
  { symbol: "COIN", name: "Coinbase Global" },
  { symbol: "PLTR", name: "Palantir Technologies" }
];

interface TickerSelectorProps {
  selectedTickers: string[];
  onSelectionChange: (tickers: string[]) => void;
}

export function TickerSelector({ selectedTickers, onSelectionChange }: TickerSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickers = AVAILABLE_TICKERS.filter(ticker =>
    ticker.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTickerToggle = (symbol: string) => {
    if (selectedTickers.includes(symbol)) {
      onSelectionChange(selectedTickers.filter(t => t !== symbol));
    } else {
      onSelectionChange([...selectedTickers, symbol]);
    }
  };

  const handleRemoveTicker = (symbol: string) => {
    onSelectionChange(selectedTickers.filter(t => t !== symbol));
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search tickers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-slate-700 border-slate-600 text-slate-200 placeholder:text-slate-400 focus:bg-slate-600 focus:border-blue-500"
        />
      </div>

      {/* Selected Tickers */}
      {selectedTickers.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-300">Selected ({selectedTickers.length})</p>
          <div className="flex flex-wrap gap-2">
            {selectedTickers.map(ticker => (
              <Badge 
                key={ticker} 
                variant="secondary" 
                className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                onClick={() => handleRemoveTicker(ticker)}
              >
                {ticker}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Available Tickers */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-300">Available Tickers</p>
        <div className="max-h-96 overflow-y-auto space-y-1">
          {filteredTickers.map(ticker => (
            <Button
              key={ticker.symbol}
              variant={selectedTickers.includes(ticker.symbol) ? "default" : "ghost"}
              size="sm"
              className={`w-full justify-start text-left h-auto py-2 ${
                selectedTickers.includes(ticker.symbol)
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-slate-300 hover:bg-slate-700 hover:text-slate-100"
              }`}
              onClick={() => handleTickerToggle(ticker.symbol)}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{ticker.symbol}</span>
                <span className="text-xs opacity-70">{ticker.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
