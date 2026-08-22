const SEARCH_HISTORY_KEY = 'mask_hajj_search_history';
const MAX_HISTORY_ITEMS = 5;

export const getSearchHistory = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_HISTORY_ITEMS) : [];
  } catch {
    return [];
  }
};

export const addSearchHistory = (keyword: string): string[] => {
  if (typeof window === 'undefined') return [];
  const trimmed = keyword.trim();
  if (!trimmed || trimmed.length < 2) return getSearchHistory();

  try {
    const existing = getSearchHistory();
    // Filter out duplicates (case-insensitive check)
    const filtered = existing.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getSearchHistory();
  }
};

export const clearSearchHistory = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch {
    // Ignore error
  }
};

export const removeSearchHistoryItem = (keyword: string): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getSearchHistory();
    const updated = existing.filter((item) => item.toLowerCase() !== keyword.toLowerCase());
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getSearchHistory();
  }
};
