import { useEffect, useState } from 'react';

/**
 * ছোট্ট "রাউটার": ব্রাউজারের ঠিকানা (যেমন /umrah, /hajj/sylhet) পড়ে
 * এবং ঠিকানা বদলালে React-কে জানায়। কোনো বাইরের লাইব্রেরি লাগে না।
 */
function normalize(path: string): string {
  let p = path.toLowerCase();
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}

export function usePath(): string {
  const [path, setPath] = useState(() =>
    typeof window === 'undefined' ? '/' : normalize(window.location.pathname)
  );
  useEffect(() => {
    const onChange = () => setPath(normalize(window.location.pathname));
    window.addEventListener('popstate', onChange);
    window.addEventListener('maskhajj:navigate', onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('maskhajj:navigate', onChange);
    };
  }, []);
  return path;
}

/** পেজ রিলোড ছাড়াই অন্য ঠিকানায় যাওয়া */
export function navigate(to: string) {
  if (typeof window === 'undefined') return;
  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event('maskhajj:navigate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
