import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  return (
    <div className="row g-4">
      {products.map(product => (
        <div key={product.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
