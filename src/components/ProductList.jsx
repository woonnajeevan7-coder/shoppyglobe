import ProductItem from './ProductItem';
import styles from './ProductList.module.css';

export default function ProductList({ products, loading, error }) {
  if (loading) {
    return (
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorBox}>
        <span className={styles.errorIcon}>⚠</span>
        <p>Failed to load products: {error}</p>
        <button className="btn btn-outline" onClick={() => window.location.reload()}>
          Try again
        </button>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className={styles.empty}>
        <span>🔍</span>
        <p>No products found. Try a different search.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
}
