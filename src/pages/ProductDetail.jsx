import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { addToCart } from '../store/cartSlice';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { id }       = useParams();
  const dispatch     = useDispatch();
  const navigate     = useNavigate();
  const { data: product, loading, error } = useFetchProducts(id);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded]         = useState(false);

  const handleAdd = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  if (loading) return (
    <div className={styles.loadWrap}>
      <div className={styles.skeletonDetail} />
    </div>
  );

  if (error || !product) return (
    <div className={styles.loadWrap}>
      <p style={{ color: 'var(--danger)' }}>Product not found.</p>
      <Link to="/" className="btn btn-outline" style={{ marginTop: 16 }}>← Back to shop</Link>
    </div>
  );

  const images = product.images?.length ? product.images : [product.thumbnail];
  const stars  = Math.round(product.rating ?? 0);

  return (
    <main className={styles.page}>
      <div className="container">

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <button onClick={() => navigate(-1)} className={styles.backBtn}>← Back</button>
          <span>/</span>
          <span className={styles.bcCat}>{product.category}</span>
          <span>/</span>
          <span className={styles.bcTitle}>{product.title}</span>
        </nav>

        <div className={styles.grid}>
          {/* Image gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImg}>
              <img src={images[activeImg]} alt={product.title} />
            </div>
            {images.length > 1 && (
              <div className={styles.thumbs}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className={styles.info}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.title}>{product.title}</h1>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < stars ? '#E8A838' : 'var(--border)', fontSize: 16 }}>★</span>
                ))}
              </div>
              <span className={styles.ratingNum}>{product.rating?.toFixed(1)}</span>
              <span className={styles.stock}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Price */}
            <div className={styles.priceRow}>
              <span className={styles.price}>${product.price.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <span className={styles.discountBadge}>
                  −{Math.round(product.discountPercentage)}% off
                </span>
              )}
            </div>

            {/* Description */}
            <p className={styles.description}>{product.description}</p>

            {/* Brand */}
            {product.brand && (
              <p className={styles.brand}>Brand: <strong>{product.brand}</strong></p>
            )}

            {/* CTA */}
            <div className={styles.cta}>
              <button
                className={`btn btn-accent ${styles.addBtn}`}
                onClick={handleAdd}
                disabled={product.stock === 0}
              >
                {added
                  ? '✓ Added to cart'
                  : product.stock === 0
                  ? 'Out of stock'
                  : 'Add to cart'}
              </button>
              <Link to="/cart" className="btn btn-outline">View cart</Link>
            </div>

            {/* Meta tags */}
            {product.tags?.length > 0 && (
              <div className={styles.tags}>
                {product.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
