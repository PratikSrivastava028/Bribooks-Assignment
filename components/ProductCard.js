import Link from 'next/link';
import styles from '@/styles/ProductCard.module.css';

export default function ProductCard({ product }) {
  // Generate stars based on rating
  const renderStars = (rate) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.round(rate)) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning me-1"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star text-warning me-1"></i>);
      }
    }
    return stars;
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} loading="lazy" />
      </div>
      <div className="card-body d-flex flex-column p-4 flex-grow-1">
        <div className="mb-2">
          <span className="badge bg-light text-secondary text-uppercase fw-normal border" style={{ fontSize: '0.75rem' }}>
            {product.category}
          </span>
        </div>
        <h5 className={styles.title} title={product.title}>
          {product.title}
        </h5>
        
        <div className="d-flex align-items-center mb-4">
          {renderStars(product.rating?.rate || 0)}
          <span className="text-muted ms-1 small">
            ({product.rating?.count || 0})
          </span>
        </div>
        
        <div className="mt-auto d-flex align-items-center justify-content-between">
          <span className="fs-5 fw-bold amazon-price">
            ${product.price.toFixed(2)}
          </span>
          <Link href={`/product/${product.id}`} className="btn btn-outline-primary stretched-link rounded-pill px-3 py-1 fw-medium">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
