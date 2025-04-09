
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Airports from "./pages/Airports";
import Airlines from "./pages/Airlines";
import Flights from "./pages/Flights";
import Employees from "./pages/Employees";
import Passengers from "./pages/Passengers";
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
            <>
              <Navigation />
              <Index />
            </>
          } />
          <Route path="/airports" element={
            <>
              <Navigation />
              <Airports />
            </>
          } />
          <Route path="/airlines" element={
            <>
              <Navigation />
              <Airlines />
            </>
          } />
          <Route path="/flights" element={
            <>
              <Navigation />
              <Flights />
            </>
          } />
          <Route path="/employees" element={
            <>
              <Navigation />
              <Employees />
            </>
          } />
          <Route path="/passengers" element={
            <>
              <Navigation />
              <Passengers />
            </>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
