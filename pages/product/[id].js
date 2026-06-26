import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/ProductDetails.module.css';
import fs from 'fs';
import path from 'path';

export default function ProductDetails({ product, error }) {
  if (error || !product) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar hideSearch={true} />
        <main className="flex-grow-1 bg-light py-5 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h3 className="fw-bold mb-3">Product not found</h3>
            <Link href="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
    <>
      <Head>
        <title>{product.title} | ShopSphere</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="d-flex flex-column min-vh-100">
        <Navbar hideSearch={true} />

        <main className="flex-grow-1 bg-light py-5">
          <div className="container py-lg-4">
            <div className="bg-white rounded-4 shadow-sm border overflow-hidden">
              <div className="px-4 px-md-5 pt-4 pt-md-5 pb-2">
                <Link href="/" className="text-decoration-none text-muted fw-medium d-inline-flex align-items-center">
                  <i className="bi bi-arrow-left me-2"></i> Back to Products
                </Link>
              </div>

              <div className="row g-5 align-items-center p-4 p-md-5 pt-0">
              <div className="col-12 col-md-6 text-center">
                <div className={styles.imageContainer}>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className={styles.image}
                  />
                </div>
              </div>
              
              <div className="col-12 col-md-6">
                <span className="badge bg-light text-secondary text-uppercase fw-normal border mb-3 px-3 py-2">
                  {product.category}
                </span>
                
                <h1 className="fw-bold mb-3 fs-2">{product.title}</h1>
                
                <div className="d-flex align-items-center mb-4">
                  <div className="me-3 border-end pe-3">
                    {renderStars(product.rating?.rate || 0)}
                    <span className="ms-2 fw-medium">{product.rating?.rate}</span>
                  </div>
                  <span className="text-muted">
                    {product.rating?.count || 0} Reviews
                  </span>
                </div>
                
                <div className="mb-4">
                  <span className="display-5 fw-bold amazon-price">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="mb-5">
                  <h5 className="fw-bold mb-3">Description</h5>
                  <p className="text-muted lh-lg" style={{ fontSize: '1.05rem' }}>
                    {product.description}
                  </p>
                </div>
                
                <div className="d-grid gap-2 d-md-flex">
                  <button className="btn btn-primary btn-lg px-5 rounded-pill me-md-2 mb-2 mb-md-0 fw-medium shadow-sm">
                    <i className="bi bi-cart-plus me-2"></i> Add to Cart
                  </button>
                  <button className="btn btn-outline-secondary btn-lg px-5 rounded-pill fw-medium">
                    <i className="bi bi-heart me-2"></i> Save
                  </button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    });
    
    if (!res.ok) {
      return {
        props: {
          product: null,
          error: true,
        },
      };
    }
    
    const product = await res.json();
    
    return {
      props: {
        product,
        error: false,
      },
    };
  } catch (error) {
    // API is unavailable (e.g. 403 from Render), silently fallback to local data
    try {
      const filePath = path.join(process.cwd(), 'data', 'fallbackProducts.json');
      const jsonData = fs.readFileSync(filePath, 'utf8');
      const fallbackProducts = JSON.parse(jsonData);
      
      const fallbackProduct = fallbackProducts.find(p => p.id.toString() === params.id.toString());
      
      if (!fallbackProduct) {
        return {
          props: {
            product: null,
            error: true,
          }
        };
      }
      
      return {
        props: {
          product: fallbackProduct,
          error: false,
          isFallback: true
        }
      };
    } catch (fallbackError) {
      return {
        props: {
          product: null,
          error: true,
        },
      };
    }
  }
}
