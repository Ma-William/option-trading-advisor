
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Opportunities from "./pages/Opportunities";
import Alerts from "./pages/Alerts";
import TradeTracker from "./pages/TradeTracker";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Index />
            </Layout>
          } />
          <Route path="/opportunities" element={
            <Layout>
              <Opportunities />
            </Layout>
          } />
          <Route path="/alerts" element={
            <Layout>
              <Alerts />
            </Layout>
          } />
          <Route path="/tracker" element={
            <Layout>
              <TradeTracker />
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout>
              <Settings />
            </Layout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
