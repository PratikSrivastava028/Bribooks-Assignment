export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Product pagination" className="mt-5 d-flex justify-content-center">
      <ul className="pagination mb-0">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link rounded-start-pill px-3" 
            onClick={() => onPageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        
        {pages.map(page => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link rounded-end-pill px-3" 
            onClick={() => onPageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
