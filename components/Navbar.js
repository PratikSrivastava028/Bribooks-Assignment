import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Navbar({ hideSearch, searchQuery, onSearchChange, productCount }) {
  return (
    <nav className="navbar navbar-expand-lg amazon-navbar sticky-top shadow-sm py-3">
      <div className="container d-flex flex-wrap align-items-center justify-content-between">
        <Link href="/" className="navbar-brand fw-bold fs-4 m-0 d-flex align-items-center mb-2 mb-lg-0">
          ShopSphere
        </Link>
        
        {!hideSearch && (
          <div className="d-flex align-items-center flex-grow-1 justify-content-lg-end mt-2 mt-lg-0">
            <div className="w-100 me-3 ms-lg-auto" style={{ maxWidth: '400px' }}>
              <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
            </div>
            <span className="badge rounded-pill py-2 px-3 fw-bold text-nowrap">
              {productCount} {productCount === 1 ? 'Product' : 'Products'}
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}
