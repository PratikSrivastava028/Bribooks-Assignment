export default function EmptyState({ onClear }) {
  return (
    <div className="text-center py-5 my-5">
      <div className="display-1 text-muted mb-4">
        <i className="bi bi-search"></i>
      </div>
      <h3 className="fw-bold mb-2">Oops! No products found</h3>
      <p className="text-muted mb-4">Try searching with a different keyword</p>
      {onClear && (
        <button onClick={onClear} className="btn btn-primary px-4 py-2">
          Clear Search
        </button>
      )}
    </div>
  );
}
