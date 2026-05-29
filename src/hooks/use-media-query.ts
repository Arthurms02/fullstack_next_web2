import { useEffect, useState } from 'react';

/**
 * Hook simples para detectar media queries no cliente.
 * Retorna `false` no SSR e atualiza no client.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Inicializa
    setMatches(mql.matches);

    // Compatibilidade com addEventListener / addListener
    if (mql.addEventListener) {
      mql.addEventListener('change', handler as EventListener);
    } else {
      // deprecated but fallback
      // @ts-ignore
      mql.addListener(handler);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handler as EventListener);
      } else {
        // @ts-ignore
        mql.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
