import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { BLOG_POSTS, BlogPost } from '../data/blog';

export type PageView = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'blog' | 'compliance' | '404';

export interface RouteState {
  view: PageView;
  path: string;
  category?: string;
  product?: Product;
  blogPost?: BlogPost;
}

export function findProduct(param: string): Product | undefined {
  if (!param) return undefined;
  const clean = decodeURIComponent(param).trim().toLowerCase();
  return PRODUCTS.find(
    (p) =>
      p.id.toLowerCase() === clean ||
      p.slug.toLowerCase() === clean ||
      p.id.replace('-stack', '').toLowerCase() === clean ||
      String(p.denomination) === clean
  );
}

export function findBlogPost(param: string): BlogPost | undefined {
  if (!param) return undefined;
  const clean = decodeURIComponent(param).trim().toLowerCase();
  return BLOG_POSTS.find(
    (b) =>
      b.id.toLowerCase() === clean ||
      b.slug.toLowerCase() === clean
  );
}

export function parseCurrentLocation(): RouteState {
  if (typeof window === 'undefined') {
    return { view: 'home', path: '/' };
  }

  // Support legacy hash migration if user bookmarked #/product/... or #/about
  let pathname = window.location.pathname;
  const search = window.location.search;
  const hash = window.location.hash;

  if ((!pathname || pathname === '/') && hash && hash.startsWith('#/')) {
    const migrated = hash.replace('#/', '/');
    try {
      window.history.replaceState({}, '', migrated);
      pathname = migrated;
    } catch {
      // Fallback
    }
  }

  // Normalize path: strip trailing slash except for root
  const cleanPath = pathname.length > 1 && pathname.endsWith('/') 
    ? pathname.slice(0, -1) 
    : pathname || '/';

  const searchParams = new URLSearchParams(search);

  // 1. Root / Home
  if (cleanPath === '' || cleanPath === '/' || cleanPath === '/home') {
    return { view: 'home', path: '/' };
  }

  // 2. Shop page: /shop or /shop/:category or /shop?category=...
  if (cleanPath === '/shop' || cleanPath.startsWith('/shop/')) {
    let category = searchParams.get('category') || undefined;
    if (cleanPath.startsWith('/shop/')) {
      const sub = cleanPath.replace('/shop/', '').trim();
      if (sub && sub !== 'all') {
        category = sub;
      }
    }
    return { view: 'shop', path: cleanPath, category: category || 'all' };
  }

  // 3. Single Product page: /products/:id or /product/:id
  if (cleanPath.startsWith('/products/') || cleanPath.startsWith('/product/')) {
    const slug = cleanPath.startsWith('/products/') 
      ? cleanPath.replace('/products/', '').trim()
      : cleanPath.replace('/product/', '').trim();

    const product = findProduct(slug);
    if (product) {
      return { 
        view: 'product', 
        path: `/products/${product.slug}`, 
        product 
      };
    }
    // If not found, fallback to shop with warning or 404
    return { view: '404', path: cleanPath };
  }

  // 4. About page: /about or /about-us
  if (cleanPath === '/about' || cleanPath === '/about-us') {
    return { view: 'about', path: '/about' };
  }

  // 5. Contact page: /contact or /contact-us
  if (cleanPath === '/contact' || cleanPath === '/contact-us') {
    return { view: 'contact', path: '/contact' };
  }

  // 6. Blog page: /blog or /blog/:slug
  if (cleanPath === '/blog' || cleanPath.startsWith('/blog/')) {
    if (cleanPath.startsWith('/blog/')) {
      const slug = cleanPath.replace('/blog/', '').trim();
      const post = findBlogPost(slug);
      return { view: 'blog', path: cleanPath, blogPost: post };
    }
    return { view: 'blog', path: '/blog' };
  }

  // 7. ECB Compliance page: /compliance or /legal-compliance
  if (cleanPath === '/compliance' || cleanPath === '/legal-compliance') {
    return { view: 'compliance', path: '/compliance' };
  }

  // Fallback: check if path matches a product slug directly (e.g. /euro-50-prop-notes-stack)
  const potentialSlug = cleanPath.replace('/', '');
  const directProduct = findProduct(potentialSlug);
  if (directProduct) {
    return {
      view: 'product',
      path: `/products/${directProduct.slug}`,
      product: directProduct,
    };
  }

  return { view: '404', path: cleanPath };
}

interface RouterContextType {
  route: RouteState;
  navigate: (to: string, options?: { replace?: boolean; scroll?: boolean }) => void;
  navigateToProduct: (product: Product) => void;
  navigateToCategory: (category: string) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteState>(() => parseCurrentLocation());

  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseCurrentLocation();
      setRoute(parsed);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronize document title and meta description dynamically for indexability and SEO
  useEffect(() => {
    switch (route.view) {
      case 'home':
        document.title = 'Euro Prop Money - Realistic Film & AI Studio Props';
        break;
      case 'shop':
        if (route.category && route.category !== 'all') {
          document.title = `Shop ${route.category.replace('-', ' ').toUpperCase()} | Euro Prop Money EU`;
        } else {
          document.title = 'Shop Realistic Euro Prop Currency Catalog | Euro Prop Money EU';
        }
        break;
      case 'product':
        if (route.product) {
          document.title = `${route.product.name} (€${route.product.price.toFixed(2)}) | Euro Prop Money EU`;
        }
        break;
      case 'about':
        document.title = 'About Our Studio Heritage & Craftsmanship | Euro Prop Money EU';
        break;
      case 'contact':
        document.title = 'Contact Art Department & 24H Soundstage Support | Euro Prop Money EU';
        break;
      case 'blog':
        if (route.blogPost) {
          document.title = `${route.blogPost.title} | Euro Prop Money EU`;
        } else {
          document.title = 'Production Blog & Filmmaking Prop Guides | Euro Prop Money EU';
        }
        break;
      case 'compliance':
        document.title = 'European Central Bank Decision 2013/10 Compliance | Euro Prop Money EU';
        break;
      case '404':
        document.title = 'Page Not Found | Euro Prop Money EU';
        break;
    }
  }, [route]);

  const navigate = (to: string, options?: { replace?: boolean; scroll?: boolean }) => {
    let cleanTo = to.trim();
    if (!cleanTo.startsWith('/')) {
      cleanTo = `/${cleanTo}`;
    }

    if (options?.replace) {
      window.history.replaceState({}, '', cleanTo);
    } else {
      window.history.pushState({}, '', cleanTo);
    }

    const updated = parseCurrentLocation();
    setRoute(updated);

    if (options?.scroll !== false) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const navigateToProduct = (product: Product) => {
    navigate(`/products/${product.slug || product.id}`);
  };

  const navigateToCategory = (category: string) => {
    if (category === 'all' || !category) {
      navigate('/shop');
    } else {
      navigate(`/shop?category=${encodeURIComponent(category)}`);
    }
  };

  const value = useMemo(
    () => ({
      route,
      navigate,
      navigateToProduct,
      navigateToCategory,
    }),
    [route]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
  scroll?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({
  to,
  replace,
  scroll = true,
  className = '',
  onClick,
  children,
  ...rest
}) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Preserve standard browser behavior for middle clicks, command/ctrl clicks, or external targets
    if (
      !e.defaultPrevented &&
      e.button === 0 && // Left click only
      !e.metaKey &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.shiftKey &&
      (!rest.target || rest.target === '_self')
    ) {
      e.preventDefault();
      onClick?.(e);
      navigate(to, { replace, scroll });
    } else {
      onClick?.(e);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
};
