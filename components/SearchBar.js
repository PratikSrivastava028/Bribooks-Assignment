import { useState, useEffect } from 'react';

export default function SearchBar({ searchQuery, onSearchChange }) {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localQuery);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, onSearchChange]);

  // Sync if external searchQuery changes
  useEffect(() => {
    if (searchQuery !== localQuery) {
      setLocalQuery(searchQuery || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div className="position-relative">
      <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
      <input
        type="text"
        className="form-control bg-white border-0 ps-5 py-2 text-dark"
        placeholder="Search products by title..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        aria-label="Search products"
      />
    </div>
  );
}
