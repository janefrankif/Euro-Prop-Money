import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CameraInspectorModal } from './components/CameraInspectorModal';
import { CheckoutModal } from './components/CheckoutModal';
import { StudioQuoteModal } from './components/StudioQuoteModal';
import { BlogModal } from './components/BlogModal';
import { MobileBottomNav } from './components/MobileBottomNav';

// Distinct WooCommerce Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { CompliancePage } from './pages/CompliancePage';

import { Product } from './types';
import { BlogPost } from './data/blog';

type PageType = 'home' | 'shop' | 'about' | 'contact' | 'blog' | 'compliance';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [shopCategory, setShopCategory] = useState<string>('all');
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);

  // Sync with URL hash for browser history / back-forward support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
      if (['home', 'shop', 'about', 'contact', 'blog', 'compliance'].includes(hash)) {
        setCurrentPage(hash as PageType);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, category?: string) => {
    const target = page.toLowerCase() as PageType;
    if (category) {
      setShopCategory(category);
    }
    setCurrentPage(target);
    window.location.hash = `#/${target}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleInspect = (product: Product) => {
    setInspectedProduct(product);
  };

  const handleReadPost = (post: BlogPost) => {
    setSelectedPost(post);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950">
      {/* Top Automated Announcement Marquee */}
      <AnnouncementBar />

      {/* WooCommerce Top Header Navigation with Active Page State */}
      <Header
        currentPage={currentPage}
        onNavigate={(p) => navigateTo(p)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Distinct WooCommerce Page Router Views */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onInspectProduct={handleInspect}
            onNavigateShop={(cat) => navigateTo('shop', cat)}
            onNavigateAbout={() => navigateTo('about')}
            onNavigateContact={() => navigateTo('contact')}
            onNavigateBlog={() => navigateTo('blog')}
            onOpenCompliance={() => navigateTo('compliance')}
            onOpenQuote={() => setIsQuoteOpen(true)}
            onReadPost={handleReadPost}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            onInspectProduct={handleInspect}
            initialCategory={shopCategory}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigateHome={() => navigateTo('home')}
            onNavigateShop={() => navigateTo('shop')}
            onOpenCompliance={() => navigateTo('compliance')}
            onOpenQuote={() => setIsQuoteOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigateHome={() => navigateTo('home')}
            onOpenCompliance={() => navigateTo('compliance')}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            onNavigateHome={() => navigateTo('home')}
            onReadPost={handleReadPost}
          />
        )}

        {currentPage === 'compliance' && (
          <CompliancePage
            onNavigateHome={() => navigateTo('home')}
            onNavigateShop={() => navigateTo('shop')}
            onOpenQuote={() => setIsQuoteOpen(true)}
          />
        )}
      </main>

      {/* WooCommerce Global Footer */}
      <Footer
        onNavigate={(p) => navigateTo(p)}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={(p) => navigateTo(p)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Persistent Zustand Slide-Over Cart Drawer */}
      <CartDrawer
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenCompliance={() => navigateTo('compliance')}
      />

      {/* 8K Studio Camera Tester Modal */}
      <CameraInspectorModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
      />

      {/* 1-Click Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOpenCompliance={() => {
          setIsCheckoutOpen(false);
          navigateTo('compliance');
        }}
      />

      {/* Studio Purchase Order (PO) Requisition Modal */}
      <StudioQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

      {/* Full-Length Blog Article Reader Modal */}
      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
}
