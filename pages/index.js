import Head from 'next/head';
import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';
import fs from 'fs';
import path from 'path';

export default function Home({ initialProducts, error }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8;

  // Simulate loading spinner for 400ms when search query changes
  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Client-side filtering
  const filteredProducts = useMemo(() => {
    if (!initialProducts) return [];
    if (!searchQuery.trim()) return initialProducts;
    
    const lowercasedQuery = searchQuery.toLowerCase();
    return initialProducts.filter(product => 
      product.title.toLowerCase().includes(lowercasedQuery)
    );
  }, [initialProducts, searchQuery]);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <>
      <Head>
        <title>ShopSphere | Discover Amazing Products</title>
        <meta name="description" content="ShopSphere ecommerce platform built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="d-flex flex-column min-vh-100">
        <Navbar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          productCount={filteredProducts.length}
        />

        <main className="flex-grow-1 bg-light py-5">
          <div className="container">
            {error ? (
              <div className="text-center py-5 my-5">
                <div className="display-1 text-danger mb-4">
                  <i className="bi bi-exclamation-triangle"></i>
                </div>
                <h3 className="fw-bold mb-2">Unable to load products.</h3>
                <p className="text-muted mb-4">Please check your connection and try again.</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary px-4 py-2">
                  Retry
                </button>
              </div>
            ) : isSearching ? (
              <Loader message="Filtering products..." />
            ) : filteredProducts.length === 0 ? (
              <EmptyState onClear={() => setSearchQuery('')} />
            ) : (
              <>
                <ProductGrid products={paginatedProducts} />
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakestoreapi.com/products', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch status: ${res.status}`);
    }
    
    const products = await res.json();
    
    return {
      props: {
        initialProducts: products,
        error: false,
      },
    };
  } catch (error) {
    // API is unavailable (e.g. 403 from Render), silently fallback to local data
    try {
      const filePath = path.join(process.cwd(), 'data', 'fallbackProducts.json');
      const jsonData = fs.readFileSync(filePath, 'utf8');
      const fallbackProducts = JSON.parse(jsonData);
      
      return {
        props: {
          initialProducts: fallbackProducts,
          error: false,
          isFallback: true
        },
      };
    } catch (fallbackError) {
      return {
        props: {
          initialProducts: [],
          error: true,
        },
      };
    }
  }
}
