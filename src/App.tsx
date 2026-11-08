import React, { useState } from 'react';
import { RouterProvider, useRouter } from './router';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CameraInspectorModal } from './components/CameraInspectorModal';
import { CheckoutModal } from './components/CheckoutModal';
import { StudioQuoteModal } from './components/StudioQuoteModal';
import { BlogModal } from './components/BlogModal';
import { LegalModal, LegalTab } from './components/LegalModal';
import { MobileBottomNav } from './components/MobileBottomNav';

// Distinct WooCommerce Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { CompliancePage } from './pages/CompliancePage';
import { SingleProductPage } from './pages/SingleProductPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { Product } from './types';
import { PRODUCTS } from './data/products';
import { BlogPost } from './data/blog';

function AppContent() {
  const { route, navigate, navigateToProduct, navigateToCategory } = useRouter();

  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [isLegalOpen, setIsLegalOpen] = useState<boolean>(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('terms');

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  const handleNavigate = (page: string, category?: string) => {
    const p = page.toLowerCase();
    if (p === 'home') {
      navigate('/');
    } else if (p === 'shop') {
      navigateToCategory(category || 'all');
    } else if (p === 'about') {
      navigate('/about');
    } else if (p === 'contact') {
      navigate('/contact');
    } else if (p === 'blog') {
      navigate('/blog');
    } else if (p === 'compliance') {
      navigate('/compliance');
    } else {
      navigate(`/${p}`);
    }
  };

  const handleInspect = (product: Product) => {
    setInspectedProduct(product);
  };

  const handleReadPost = (post: BlogPost) => {
    setSelectedPost(post);
  };

  // Determine current active page for header navigation highlight
  const activeHeaderPage = route.view === '404' ? '' : route.view;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-900">
      {/* Top Automated Announcement Marquee */}
      <AnnouncementBar />

      {/* WooCommerce Top Header Navigation with Active Page State & Direct Route Sync */}
      <Header
        currentPage={activeHeaderPage}
        onNavigate={handleNavigate}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Distinct WooCommerce Page Router Views */}
      <main className="flex-1 w-full">
        {route.view === 'home' && (
          <HomePage
            onInspectProduct={handleInspect}
            onSelectProduct={navigateToProduct}
            onNavigateShop={(cat) => navigateToCategory(cat || 'all')}
            onNavigateAbout={() => navigate('/about')}
            onNavigateContact={() => navigate('/contact')}
            onNavigateBlog={() => navigate('/blog')}
            onOpenCompliance={() => navigate('/compliance')}
            onOpenQuote={() => setIsQuoteOpen(true)}
            onReadPost={handleReadPost}
          />
        )}

        {route.view === 'shop' && (
          <ShopPage
            onInspectProduct={handleInspect}
            onSelectProduct={navigateToProduct}
            initialCategory={route.category || 'all'}
            onNavigateHome={() => navigate('/')}
          />
        )}

        {route.view === 'product' && (
          <SingleProductPage
            product={route.product || PRODUCTS[0]}
            onNavigateShop={(cat) => navigateToCategory(cat || 'all')}
            onNavigateHome={() => navigate('/')}
            onSelectProduct={navigateToProduct}
            onOpenCompliance={() => navigate('/compliance')}
            onOpenQuote={() => setIsQuoteOpen(true)}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
          />
        )}

        {route.view === 'about' && (
          <AboutPage
            onNavigateHome={() => navigate('/')}
            onNavigateShop={() => navigate('/shop')}
            onOpenCompliance={() => navigate('/compliance')}
            onOpenQuote={() => setIsQuoteOpen(true)}
          />
        )}

        {route.view === 'contact' && (
          <ContactPage
            onNavigateHome={() => navigate('/')}
            onOpenCompliance={() => navigate('/compliance')}
          />
        )}

        {route.view === 'blog' && (
          <BlogPage
            onNavigateHome={() => navigate('/')}
            onReadPost={handleReadPost}
          />
        )}

        {route.view === 'compliance' && (
          <CompliancePage
            onNavigateHome={() => navigate('/')}
            onNavigateShop={() => navigate('/shop')}
            onOpenQuote={() => setIsQuoteOpen(true)}
          />
        )}

        {route.view === '404' && <NotFoundPage />}
      </main>

      {/* Global Footer with Pages and Legal sections */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenLegal={handleOpenLegal}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        currentPage={activeHeaderPage}
        onNavigate={handleNavigate}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Persistent Zustand Slide-Over Cart Drawer */}
      <CartDrawer
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenCompliance={() => navigate('/compliance')}
        onOpenLegal={handleOpenLegal}
        onSelectProduct={navigateToProduct}
      />

      {/* 8K Studio Camera Tester Modal */}
      <CameraInspectorModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
      />

      {/* WooCommerce Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOpenCompliance={() => {
          setIsCheckoutOpen(false);
          navigate('/compliance');
        }}
        onOpenLegal={handleOpenLegal}
      />

      {/* Legal & Compliance Modal */}
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        initialTab={legalTab}
        onOpenCompliance={() => {
          setIsLegalOpen(false);
          navigate('/compliance');
        }}
      />

      {/* Studio Purchase Order (PO) Requisition Modal */}
      <StudioQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

      {/* Full-Length Blog Article Reader Modal */}
      <BlogModal
        post={selectedPost || route.blogPost || null}
        onClose={() => {
          setSelectedPost(null);
          if (route.blogPost) {
            navigate('/blog', { replace: true, scroll: false });
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
