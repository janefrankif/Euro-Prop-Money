import React, { useState, useEffect } from 'react';
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

import { Product } from './types';
import { PRODUCTS } from './data/products';
import { BlogPost } from './data/blog';

type PageType = 'home' | 'shop' | 'about' | 'contact' | 'blog' | 'compliance' | 'product';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [shopCategory, setShopCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
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

  // Sync with URL hash for browser history / back-forward support
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#/', '').replace('#', '');
      
      // Single product page format: #/product/:slug
      if (rawHash.startsWith('product/')) {
        const slug = rawHash.replace('product/', '').trim();
        const found = PRODUCTS.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedProduct(found);
          setCurrentPage('product');
          return;
        } else {
          setCurrentPage('shop');
          return;
        }
      }

      const cleanHash = rawHash.toLowerCase();
      if (['home', 'shop', 'about', 'contact', 'blog', 'compliance', 'product'].includes(cleanHash)) {
        setCurrentPage(cleanHash as PageType);
      } else if (!cleanHash) {
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

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.location.hash = `#/product/${product.slug}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleInspect = (product: Product) => {
    setInspectedProduct(product);
  };

  const handleReadPost = (post: BlogPost) => {
    setSelectedPost(post);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-900">
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
            onSelectProduct={navigateToProduct}
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
            onSelectProduct={navigateToProduct}
            initialCategory={shopCategory}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {currentPage === 'product' && selectedProduct && (
          <SingleProductPage
            product={selectedProduct}
            onNavigateShop={(cat) => navigateTo('shop', cat)}
            onNavigateHome={() => navigateTo('home')}
            onSelectProduct={navigateToProduct}
            onOpenCompliance={() => navigateTo('compliance')}
            onOpenQuote={() => setIsQuoteOpen(true)}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
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

      {/* Global Footer with Pages and Legal sections */}
      <Footer
        onNavigate={(p) => navigateTo(p)}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenLegal={handleOpenLegal}
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
          navigateTo('compliance');
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
