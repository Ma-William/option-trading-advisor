
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendingUp, Calendar, DollarSign, Percent, Activity, TrendingDown, Target, Eye } from "lucide-react";

// Updated mock data with all the new entries
const mockHistoricalTrades = [
  {
    id: 1,
    ticker: "AKAM",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-08",
    entryDate: "2025-05-08",
    exitDate: "2025-05-09",
    pctReturn: 0.0323,
    status: "Close",
    nearExp: "2025-05-09",
    longExp: "2025-06-06",
    strike: 85,
    entryCost: 1.24,
    exitProceeds: 1.29
  },
  {
    id: 2,
    ticker: "HUT",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-08",
    entryDate: "2025-05-08",
    exitDate: "2025-05-09",
    pctReturn: -0.082,
    status: "Close",
    nearExp: "2025-05-09",
    longExp: "2025-06-06",
    strike: 14,
    entryCost: 1.22,
    exitProceeds: 1.13
  },
  {
    id: 3,
    ticker: "KVUE",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-08",
    entryDate: "2025-05-08",
    exitDate: "2025-05-09",
    pctReturn: 0.5714,
    status: "Close",
    nearExp: "2025-05-09",
    longExp: "2025-06-06",
    strike: 24,
    entryCost: 0.42,
    exitProceeds: 0.67
  },
  {
    id: 4,
    ticker: "MVIS",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-12",
    entryDate: "2025-05-12",
    exitDate: "2025-05-13",
    pctReturn: 3,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-06",
    strike: 1.5,
    entryCost: 0.02,
    exitProceeds: 0.09
  },
  {
    id: 5,
    ticker: "PLUG",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-12",
    entryDate: "2025-05-12",
    exitDate: "2025-05-13",
    pctReturn: 0.75,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-06",
    strike: 1,
    entryCost: 0.04,
    exitProceeds: 0.08
  },
  {
    id: 6,
    ticker: "RGTI",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-12",
    entryDate: "2025-05-12",
    exitDate: "2025-05-13",
    pctReturn: -0.0784,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-06",
    strike: 11.5,
    entryCost: 0.51,
    exitProceeds: 0.48
  },
  {
    id: 7,
    ticker: "ACHR",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-12",
    entryDate: "2025-05-12",
    exitDate: "2025-05-13",
    pctReturn: 0.1379,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-06",
    strike: 9,
    entryCost: 0.29,
    exitProceeds: 0.34
  },
  {
    id: 8,
    ticker: "SMR",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-12",
    entryDate: "2025-05-12",
    exitDate: "2025-05-13",
    pctReturn: 0,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-06",
    strike: 18,
    entryCost: 0.79,
    exitProceeds: 0.8
  },
  {
    id: 9,
    ticker: "FOXA",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-12",
    entryDate: "2025-05-12",
    exitDate: "2025-05-13",
    pctReturn: 0.2091,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-06",
    strike: 53,
    entryCost: 1.1,
    exitProceeds: 1.34
  },
  {
    id: 10,
    ticker: "OMEX",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-12",
    entryDate: "2025-05-12",
    exitDate: "2025-05-13",
    pctReturn: 0.5,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-06",
    strike: 1.5,
    entryCost: 0.08,
    exitProceeds: 0.13
  },
  {
    id: 11,
    ticker: "ASTS",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-12",
    entryDate: "2025-05-12",
    exitDate: "2025-05-13",
    pctReturn: 0.2453,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-06",
    strike: 27,
    entryCost: 1.06,
    exitProceeds: 1.33
  },
  {
    id: 12,
    ticker: "OKLO",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-13",
    entryDate: "2025-05-13",
    exitDate: "2025-05-14",
    pctReturn: 0.3929,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-13",
    strike: 32,
    entryCost: 2.24,
    exitProceeds: 3.13
  },
  {
    id: 13,
    ticker: "CSCO",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-14",
    entryDate: "2025-05-14",
    exitDate: "2025-05-15",
    pctReturn: 0.9808,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-13",
    strike: 61,
    entryCost: 0.52,
    exitProceeds: 1.04
  },
  {
    id: 14,
    ticker: "CRWV",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-14",
    entryDate: "2025-05-14",
    exitDate: "2025-05-15",
    pctReturn: -0.0676,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-13",
    strike: 65,
    entryCost: 3.7,
    exitProceeds: 3.46
  },
  {
    id: 15,
    ticker: "IREN",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-14",
    entryDate: "2025-05-14",
    exitDate: "2025-05-15",
    pctReturn: 0.5455,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-13",
    strike: 8,
    entryCost: 0.44,
    exitProceeds: 0.69
  },
  {
    id: 16,
    ticker: "RCAT",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-14",
    entryDate: "2025-05-14",
    exitDate: "2025-05-15",
    pctReturn: 2.64,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-13",
    strike: 6.5,
    entryCost: 0.25,
    exitProceeds: 0.92
  },
  {
    id: 17,
    ticker: "CAVA",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-15",
    entryDate: "2025-05-15",
    exitDate: "2025-05-16",
    pctReturn: 0.2222,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-13",
    strike: 99,
    entryCost: 3.06,
    exitProceeds: 3.75
  },
  {
    id: 18,
    ticker: "BTDR",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-15",
    entryDate: "2025-05-15",
    exitDate: "2025-05-16",
    pctReturn: 2.3488,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-13",
    strike: 14,
    entryCost: 0.43,
    exitProceeds: 1.45
  },
  {
    id: 19,
    ticker: "NNE",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-15",
    entryDate: "2025-05-15",
    exitDate: "2025-05-16",
    pctReturn: 0.2105,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-13",
    strike: 26,
    entryCost: 1.52,
    exitProceeds: 1.85
  },
  {
    id: 20,
    ticker: "FL",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-15",
    entryDate: "2025-05-15",
    exitDate: "2025-05-16",
    pctReturn: 0.85,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-13",
    strike: 25,
    entryCost: 0.2,
    exitProceeds: 0.38
  },
  {
    id: 21,
    ticker: "QSI",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-15",
    entryDate: "2025-05-15",
    exitDate: "2025-05-16",
    pctReturn: 0.2727,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-13",
    strike: 1.5,
    entryCost: 0.11,
    exitProceeds: 0.15
  },
  {
    id: 22,
    ticker: "WMT",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-15",
    entryDate: "2025-05-15",
    exitDate: "2025-05-16",
    pctReturn: 0.0591,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-13",
    strike: 96,
    entryCost: 1.86,
    exitProceeds: 1.98
  },
  {
    id: 23,
    ticker: "DE",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-15",
    entryDate: "2025-05-15",
    exitDate: "2025-05-16",
    pctReturn: 0.6158,
    status: "Close",
    nearExp: "2025-05-16",
    longExp: "2025-06-13",
    strike: 515,
    entryCost: 12.31,
    exitProceeds: 19.9
  },
  {
    id: 24,
    ticker: "TOL",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-20",
    entryDate: "2025-05-20",
    exitDate: "2025-05-21",
    pctReturn: 0.6395,
    status: "Close",
    nearExp: "2025-05-23",
    longExp: "2025-06-20",
    strike: 105,
    entryCost: 1.72,
    exitProceeds: 2.83
  },
  {
    id: 25,
    ticker: "XP",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-20",
    entryDate: "2025-05-20",
    exitDate: "2025-05-21",
    pctReturn: 1.4,
    status: "Close",
    nearExp: "2025-05-23",
    longExp: "2025-06-20",
    strike: 18.5,
    entryCost: 0.25,
    exitProceeds: 0.61
  },
  {
    id: 26,
    ticker: "NBIS",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-20",
    entryDate: "2025-05-20",
    exitDate: "2025-05-21",
    pctReturn: 0.1261,
    status: "Close",
    nearExp: "2025-05-23",
    longExp: "2025-06-20",
    strike: 39,
    entryCost: 2.3,
    exitProceeds: 2.6
  },
  {
    id: 27,
    ticker: "TGT",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-21",
    entryDate: "2025-05-21",
    exitDate: "2025-05-22",
    pctReturn: 0.0346,
    status: "Close",
    nearExp: "2025-05-23",
    longExp: "2025-06-20",
    strike: 93,
    entryCost: 2.89,
    exitProceeds: 3
  },
  {
    id: 28,
    ticker: "TJX",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-21",
    entryDate: "2025-05-21",
    exitDate: "2025-05-22",
    pctReturn: 0.039,
    status: "Close",
    nearExp: "2025-05-23",
    longExp: "2025-06-20",
    strike: 131,
    entryCost: 2.05,
    exitProceeds: 2.14
  },
  {
    id: 29,
    ticker: "GOOS",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-21",
    entryDate: "2025-05-21",
    exitDate: "2025-05-22",
    pctReturn: 1.2286,
    status: "Close",
    nearExp: "2025-05-23",
    longExp: "2025-06-20",
    strike: 10.5,
    entryCost: 0.35,
    exitProceeds: 0.79
  },
  {
    id: 30,
    ticker: "SNOW",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-21",
    entryDate: "2025-05-21",
    exitDate: "2025-05-22",
    pctReturn: 0.0697,
    status: "Close",
    nearExp: "2025-05-23",
    longExp: "2025-06-20",
    strike: 180,
    entryCost: 3.3,
    exitProceeds: 3.54
  },
  {
    id: 31,
    ticker: "ZM",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-21",
    entryDate: "2025-05-21",
    exitDate: "2025-05-22",
    pctReturn: 0.5455,
    status: "Close",
    nearExp: "2025-05-23",
    longExp: "2025-06-20",
    strike: 82,
    entryCost: 1.1,
    exitProceeds: 1.71
  },
  {
    id: 32,
    ticker: "AAP",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-22",
    entryDate: "2025-05-22",
    exitDate: "2025-05-23",
    pctReturn: 0.1632,
    status: "Close",
    nearExp: "2025-05-23",
    longExp: "2025-06-20",
    strike: 50,
    entryCost: 1.9,
    exitProceeds: 2.22
  },
  {
    id: 33,
    ticker: "ADI",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-22",
    entryDate: "2025-05-22",
    exitDate: "2025-05-23",
    pctReturn: 0.1889,
    status: "Close",
    nearExp: "2025-05-23",
    longExp: "2025-06-20",
    strike: 210,
    entryCost: 5.4,
    exitProceeds: 6.43
  },
  {
    id: 34,
    ticker: "ADSK",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-22",
    entryDate: "2025-05-22",
    exitDate: "2025-05-23",
    pctReturn: 0.775,
    status: "Close",
    nearExp: "2025-05-23",
    longExp: "2025-06-20",
    strike: 295,
    entryCost: 4,
    exitProceeds: 7.11
  },
  {
    id: 35,
    ticker: "INTU",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-22",
    entryDate: "2025-05-22",
    exitDate: "2025-05-23",
    pctReturn: 0.6342,
    status: "Close",
    nearExp: "2025-05-23",
    longExp: "2025-06-20",
    strike: 665,
    entryCost: 9.54,
    exitProceeds: 15.6
  },
  {
    id: 36,
    ticker: "OKTA",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-27",
    entryDate: "2025-05-27",
    exitDate: "2025-05-28",
    pctReturn: -0.0211,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 125,
    entryCost: 1.9,
    exitProceeds: 1.87
  },
  {
    id: 37,
    ticker: "NVDA",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-28",
    entryDate: "2025-05-28",
    exitDate: "2025-05-29",
    pctReturn: 0.0594,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 135,
    entryCost: 3.2,
    exitProceeds: 3.4
  },
  {
    id: 38,
    ticker: "M",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-28",
    entryDate: "2025-05-28",
    exitDate: "2025-05-29",
    pctReturn: -0.2821,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 12,
    entryCost: 0.39,
    exitProceeds: 0.29
  },
  {
    id: 39,
    ticker: "ELF",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-28",
    entryDate: "2025-05-28",
    exitDate: "2025-05-29",
    pctReturn: 1.0333,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 90,
    entryCost: 3,
    exitProceeds: 6.11
  },
  {
    id: 40,
    ticker: "CRM",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-28",
    entryDate: "2025-05-28",
    exitDate: "2025-05-29",
    pctReturn: -0.2262,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 275,
    entryCost: 3.89,
    exitProceeds: 3.02
  },
  {
    id: 41,
    ticker: "AI",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-28",
    entryDate: "2025-05-28",
    exitDate: "2025-05-29",
    pctReturn: 0.0658,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 23,
    entryCost: 0.76,
    exitProceeds: 0.82
  },
  {
    id: 42,
    ticker: "KSS",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-29",
    entryDate: "2025-05-29",
    exitDate: "2025-05-30",
    pctReturn: 0.5,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 8,
    entryCost: 0.38,
    exitProceeds: 0.58
  },
  {
    id: 43,
    ticker: "MRVL",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-29",
    entryDate: "2025-05-29",
    exitDate: "2025-05-30",
    pctReturn: 0.1,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 64,
    entryCost: 2,
    exitProceeds: 2.21
  },
  {
    id: 44,
    ticker: "HRL",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-29",
    entryDate: "2025-05-29",
    exitDate: "2025-05-30",
    pctReturn: 2.1538,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 30,
    entryCost: 0.26,
    exitProceeds: 0.83
  },
  {
    id: 45,
    ticker: "DELL",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-29",
    entryDate: "2025-05-29",
    exitDate: "2025-05-30",
    pctReturn: 0.9038,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 114,
    entryCost: 2.6,
    exitProceeds: 4.96
  },
  {
    id: 46,
    ticker: "COST",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-29",
    entryDate: "2025-05-29",
    exitDate: "2025-05-30",
    pctReturn: 0.1643,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 1010,
    entryCost: 16.07,
    exitProceeds: 18.72
  },
  {
    id: 47,
    ticker: "BBY",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-29",
    entryDate: "2025-05-29",
    exitDate: "2025-05-30",
    pctReturn: 0.2612,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 66,
    entryCost: 1.34,
    exitProceeds: 1.7
  },
  {
    id: 48,
    ticker: "AEO",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-29",
    entryDate: "2025-05-29",
    exitDate: "2025-05-30",
    pctReturn: 0.2286,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 11,
    entryCost: 0.35,
    exitProceeds: 0.44
  },
  {
    id: 49,
    ticker: "ULTA",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-29",
    entryDate: "2025-05-29",
    exitDate: "2025-05-30",
    pctReturn: 0.5941,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 420,
    entryCost: 6.48,
    exitProceeds: 10.34
  },
  {
    id: 50,
    ticker: "ZS",
    strategy: "Calendar Spread\nEarnings",
    eventDate: "2025-05-29",
    entryDate: "2025-05-29",
    exitDate: "2025-05-30",
    pctReturn: 0.9043,
    status: "Close",
    nearExp: "2025-05-30",
    longExp: "2025-06-27",
    strike: 250,
    entryCost: 3.76,
    exitProceeds: 7.17
  }
];

// Calculate ROI after fees: (Exit Proceeds - 0.0025*2) / (Entry Cost + 0.0025*2) - 1
const calculateRoiAfterFees = (exitProceeds: number, entryCost: number) => {
  const exitAfterFees = exitProceeds - (0.0025 * 2);
  const entryAfterFees = entryCost + (0.0025 * 2);
  return (exitAfterFees / entryAfterFees) - 1;
};

// Sort trades from most recent to oldest
const sortedTrades = [...mockHistoricalTrades].sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

// Calculate average ROI after fees
const calculateAverageRoiAfterFees = () => {
  const totalRoi = sortedTrades.reduce((sum, trade) => sum + calculateRoiAfterFees(trade.exitProceeds, trade.entryCost), 0);
  return (totalRoi / sortedTrades.length) * 100;
};

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
    title: "Average ROI (After Fees)",
    value: `${calculateAverageRoiAfterFees().toFixed(1)}%`,
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

const StrategyModal = ({ trade }: { trade: any }) => {
  const getRoiColor = (roi: number) => {
    if (roi > 0) return "text-green-400";
    if (roi < 0) return "text-red-400";
    return "text-slate-400";
  };

  const roiAfterFees = calculateRoiAfterFees(trade.exitProceeds, trade.entryCost);

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
              <div className="text-sm text-slate-400 mb-1">Entry Costs</div>
              <div className="text-lg font-semibold text-slate-100">${trade.entryCost}</div>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Exit Proceeds</div>
              <div className="text-lg font-semibold text-slate-100">${trade.exitProceeds}</div>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">ROI (After Fees)</div>
              <div className={`text-lg font-semibold ${getRoiColor(roiAfterFees)}`}>
                {roiAfterFees > 0 ? '+' : ''}{(roiAfterFees * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const getRoiColor = (roi: number) => {
  if (roi > 0) return "text-green-400";
  if (roi < 0) return "text-red-400";
  return "text-slate-400";
};

export function TradeTrackerView() {
  const [selectedTrade, setSelectedTrade] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <TrendingUp className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Trade Tracker</h1>
          <p className="text-slate-400">Monitor your trading performance and historical alerts</p>
        </div>
      </div>

      {/* Portfolio Stats */}
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

      {/* Historical Alerts */}
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
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">ROI (After Fees)</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-slate-200 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedTrades.map((trade) => {
                  const roiAfterFees = calculateRoiAfterFees(trade.exitProceeds, trade.entryCost);
                  return (
                    <tr key={trade.id} className="border-b border-slate-700 hover:bg-slate-700/30">
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-100">{trade.ticker}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-slate-300">
                          <div>Calendar Spread</div>
                          <div className="text-xs text-slate-500">Earnings</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{formatDate(trade.eventDate)}</td>
                      <td className="py-3 px-4">
                        <div className="text-slate-300">
                          <div className="text-sm">Entry: {formatDate(trade.entryDate)}</div>
                          <div className="text-xs text-slate-500">Exit: {formatDate(trade.exitDate)}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${getRoiColor(roiAfterFees)}`}>
                          {roiAfterFees > 0 ? '+' : ''}{(roiAfterFees * 100).toFixed(1)}%
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
                              onClick={() => setSelectedTrade(trade)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Strategy
                            </Button>
                          </DialogTrigger>
                          <StrategyModal trade={trade} />
                        </Dialog>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
