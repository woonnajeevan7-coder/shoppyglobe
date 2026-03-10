import { useState, useEffect } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import ProductList from '../components/ProductList';
import styles from './Home.module.css';

const CATEGORIES = ['All', 'smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'furniture'];

export default function Home({ searchQuery }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const { data: products, loading, error } = useFetchProducts(null, debouncedSearch);

  const filtered = activeCategory === 'All'
    ? products
    : products?.filter((p) => p.category === activeCategory);

  return (
    <main className={styles.page}>
      {/* Hero strip */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.heroEyebrow}>New arrivals every day</p>
          <h1 className={styles.heroTitle}>
            Discover products<br />
            <em>you'll love</em>
          </h1>
        </div>
      </section>

      <div className="container">
        {/* Category filter */}
        <div className={styles.filters}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.chip} ${activeCategory === cat ? styles.chipActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        {!loading && filtered && (
          <p className={styles.count}>
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            {debouncedSearch ? ` for "${debouncedSearch}"` : ''}
          </p>
        )}

        <ProductList products={filtered} loading={loading} error={error} />
      </div>
    </main>
  );
}
