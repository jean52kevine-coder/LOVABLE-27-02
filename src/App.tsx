import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const SiteVitrine = lazy(() => import("./pages/SiteVitrine"));
const SiteEcommerce = lazy(() => import("./pages/SiteEcommerce"));
const Maintenance = lazy(() => import("./pages/Maintenance"));
const Tarifs = lazy(() => import("./pages/Tarifs"));
const PourquoiUnSite = lazy(() => import("./pages/PourquoiUnSite"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
};

const Loading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 rounded-full border-2 border-violet border-t-transparent animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CosmicBackground />
        <ScrollToTop />
        <Navbar />
        <main className="relative z-10">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/site-vitrine" element={<SiteVitrine />} />
              <Route path="/site-ecommerce" element={<SiteEcommerce />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/tarifs" element={<Tarifs />} />
              <Route path="/pourquoi-un-site" element={<PourquoiUnSite />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
