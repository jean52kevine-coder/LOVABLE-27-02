import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import CosmicBackground from '@/components/CosmicBackground';
import { TubelightNavBar } from '@/components/ui/tubelight-navbar';
import { Footer } from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollToTop from '@/components/ScrollToTop';

const Index = lazy(() => import('./pages/Index'));
const Services = lazy(() => import('./pages/Services'));
const SiteVitrine = lazy(() => import('./pages/SiteVitrine'));
const SiteEcommerce = lazy(() => import('./pages/SiteEcommerce'));
const Maintenance = lazy(() => import('./pages/Maintenance'));
const Tarifs = lazy(() => import('./pages/Tarifs'));
const PourquoiUnSite = lazy(() => import('./pages/PourquoiUnSite'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-[#7B2FFF] border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 500ms ease 100ms', background: '#03030A', minHeight: '100vh' }}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <CosmicBackground />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <TubelightNavBar />
                <main>
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
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </>
  );
}
