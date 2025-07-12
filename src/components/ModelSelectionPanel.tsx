import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

interface ModelData {
  name: string;
  finalPortfolioGain: number;
  annualizedReturn: number;
  annualizedVolatility: number;
  sharpeRatio: number;
  maxDrop: number;
  winRate: number;
}

const modelData: ModelData[] = [
  {
    name: "AdaBoost",
    finalPortfolioGain: 454.79,
    annualizedReturn: 104.80,
    annualizedVolatility: 85.71,
    sharpeRatio: 1.98,
    maxDrop: 22.27,
    winRate: 47.00
  },
  {
    name: "Decision Tree",
    finalPortfolioGain: 1789.74,
    annualizedReturn: 241.04,
    annualizedVolatility: 111.04,
    sharpeRatio: 1.92,
    maxDrop: 33.26,
    winRate: 48.46
  },
  {
    name: "Hist Gradient Boosting",
    finalPortfolioGain: 1649.12,
    annualizedReturn: 230.21,
    annualizedVolatility: 62.40,
    sharpeRatio: 2.99,
    maxDrop: 21.13,
    winRate: 51.55
  },
  {
    name: "K Means",
    finalPortfolioGain: 240.85,
    annualizedReturn: 68.03,
    annualizedVolatility: 55.89,
    sharpeRatio: 2.08,
    maxDrop: 35.46,
    winRate: 49.83
  },
  {
    name: "Linear Regression",
    finalPortfolioGain: 1427.65,
    annualizedReturn: 212.07,
    annualizedVolatility: 56.81,
    sharpeRatio: 3.30,
    maxDrop: 22.59,
    winRate: 56.52
  },
  {
    name: "Logistic Regression",
    finalPortfolioGain: 744.23,
    annualizedReturn: 143.63,
    annualizedVolatility: 65.72,
    sharpeRatio: 2.33,
    maxDrop: 20.84,
    winRate: 50.38
  },
  {
    name: "Neural Network",
    finalPortfolioGain: 3639.20,
    annualizedReturn: 363.08,
    annualizedVolatility: 106.85,
    sharpeRatio: 2.66,
    maxDrop: 22.81,
    winRate: 54.81
  },
  {
    name: "Random Forest",
    finalPortfolioGain: 483.44,
    annualizedReturn: 108.81,
    annualizedVolatility: 66.71,
    sharpeRatio: 1.81,
    maxDrop: 26.30,
    winRate: 47.75
  },
  {
    name: "SVR",
    finalPortfolioGain: 2801.39,
    annualizedReturn: 307.88,
    annualizedVolatility: 67.21,
    sharpeRatio: 3.68,
    maxDrop: 20.40,
    winRate: 54.22
  },
  {
    name: "XGBoost",
    finalPortfolioGain: 1767.05,
    annualizedReturn: 245.14,
    annualizedVolatility: 90.49,
    sharpeRatio: 2.58,
    maxDrop: 22.19,
    winRate: 48.61
  }
];

type SortKey = keyof ModelData;
type SortDirection = 'asc' | 'desc' | null;

export function ModelSelectionPanel() {
  const getInitialSelectedModels = () => {
    try {
      const saved = localStorage.getItem('selectedModels');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const [selectedModels, setSelectedModels] = useState<string[]>(getInitialSelectedModels);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const { toast } = useToast();

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortKey(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = [...modelData].sort((a, b) => {
    if (!sortKey || !sortDirection) return 0;
    
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const handleModelSelection = (modelName: string, checked: boolean) => {
    let newSelectedModels;
    
    if (checked) {
      if (selectedModels.length >= 10) {
        toast({
          title: "Maximum models reached",
          description: "You can select up to 10 models maximum.",
          variant: "destructive"
        });
        return;
      }
      newSelectedModels = [...selectedModels, modelName];
    } else {
      if (selectedModels.length <= 3 && selectedModels.includes(modelName)) {
        toast({
          title: "Minimum models required",
          description: "You must select at least 3 models.",
          variant: "destructive"
        });
        return;
      }
      newSelectedModels = selectedModels.filter(m => m !== modelName);
    }
    
    setSelectedModels(newSelectedModels);
    localStorage.setItem('selectedModels', JSON.stringify(newSelectedModels));
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <ArrowUpDown className="w-4 h-4" />;
    if (sortDirection === 'asc') return <ArrowUp className="w-4 h-4" />;
    if (sortDirection === 'desc') return <ArrowDown className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;
  const formatDecimal = (value: number) => value.toFixed(2);

  const saveConfiguration = () => {
    if (selectedModels.length < 3) {
      toast({
        title: "Insufficient models",
        description: "Please select at least 3 models.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('selectedModels', JSON.stringify(selectedModels));
    
    toast({
      title: "Configuration saved",
      description: `Successfully configured ${selectedModels.length} models for strategy recommendations.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-slate-400">
          Selected: {selectedModels.length}/10 models (minimum 3 required)
        </div>
        <Button 
          onClick={saveConfiguration}
          disabled={selectedModels.length < 3}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Save Configuration
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-auto max-h-[calc(100vh-300px)]">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-700/50">
                  <TableHead className="text-slate-300 sticky left-0 bg-slate-800 z-10 min-w-[60px]">Select</TableHead>
                  <TableHead className="text-slate-300 min-w-[150px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('name')}
                      className="text-slate-300 hover:text-slate-100 p-0 h-auto font-medium"
                    >
                      Model {getSortIcon('name')}
                    </Button>
                  </TableHead>
                  <TableHead className="text-slate-300 min-w-[140px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('finalPortfolioGain')}
                      className="text-slate-300 hover:text-slate-100 p-0 h-auto font-medium"
                    >
                      Final Portfolio Gain {getSortIcon('finalPortfolioGain')}
                    </Button>
                  </TableHead>
                  <TableHead className="text-slate-300 min-w-[140px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('annualizedReturn')}
                      className="text-slate-300 hover:text-slate-100 p-0 h-auto font-medium"
                    >
                      Annualized Return {getSortIcon('annualizedReturn')}
                    </Button>
                  </TableHead>
                  <TableHead className="text-slate-300 min-w-[140px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('annualizedVolatility')}
                      className="text-slate-300 hover:text-slate-100 p-0 h-auto font-medium"
                    >
                      Annualized Volatility {getSortIcon('annualizedVolatility')}
                    </Button>
                  </TableHead>
                  <TableHead className="text-slate-300 min-w-[120px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('sharpeRatio')}
                      className="text-slate-300 hover:text-slate-100 p-0 h-auto font-medium"
                    >
                      Sharpe Ratio {getSortIcon('sharpeRatio')}
                    </Button>
                  </TableHead>
                  <TableHead className="text-slate-300 min-w-[100px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('maxDrop')}
                      className="text-slate-300 hover:text-slate-100 p-0 h-auto font-medium"
                    >
                      Max Drop {getSortIcon('maxDrop')}
                    </Button>
                  </TableHead>
                  <TableHead className="text-slate-300 min-w-[100px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('winRate')}
                      className="text-slate-300 hover:text-slate-100 p-0 h-auto font-medium"
                    >
                      Win Rate {getSortIcon('winRate')}
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((model) => (
                  <TableRow 
                    key={model.name} 
                    className="border-slate-700 hover:bg-slate-700/30"
                  >
                    <TableCell className="sticky left-0 bg-slate-800 z-10">
                      <Checkbox
                        checked={selectedModels.includes(model.name)}
                        onCheckedChange={(checked) => 
                          handleModelSelection(model.name, checked as boolean)
                        }
                        className="border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </TableCell>
                    <TableCell className="text-slate-200 font-medium">{model.name}</TableCell>
                    <TableCell className="text-slate-300">{formatPercentage(model.finalPortfolioGain)}</TableCell>
                    <TableCell className="text-slate-300">{formatPercentage(model.annualizedReturn)}</TableCell>
                    <TableCell className="text-slate-300">{formatPercentage(model.annualizedVolatility)}</TableCell>
                    <TableCell className="text-slate-300">{formatDecimal(model.sharpeRatio)}</TableCell>
                    <TableCell className="text-slate-300">{formatPercentage(model.maxDrop)}</TableCell>
                    <TableCell className="text-slate-300">{formatPercentage(model.winRate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
        <h3 className="text-slate-200 font-semibold mb-2">Recommendation System</h3>
        <div className="text-sm text-slate-300 space-y-1">
          <div><span className="text-green-400 font-medium">Strongly Recommended:</span> ≥60% of selected models agree</div>
          <div><span className="text-blue-400 font-medium">Recommended:</span> 50-59% of selected models agree</div>
          <div><span className="text-yellow-400 font-medium">Considered:</span> 40-49% of selected models agree</div>
          <div><span className="text-slate-400 font-medium">Not Considered:</span> &lt;40% of selected models agree</div>
        </div>
      </div>
    </div>
  );
}
