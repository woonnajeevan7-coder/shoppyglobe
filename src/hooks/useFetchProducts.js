import { useState, useEffect } from 'react';

const BASE = 'https://dummyjson.com/products';

/**
 * useFetchProducts
 * @param {string|number|null} id  — if provided, fetch single product; else fetch list
 * @param {string} [search]        — search query string for list view
 */
export function useFetchProducts(id = null, search = '') {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const url = id
      ? `${BASE}/${id}`
      : search.trim()
      ? `${BASE}/search?q=${encodeURIComponent(search.trim())}&limit=30`
      : `${BASE}?limit=30`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!cancelled) {
          // list response has .products; single response is the object itself
          setData(id ? json : json.products ?? []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [id, search]);

  return { data, loading, error };
}
