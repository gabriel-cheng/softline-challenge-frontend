// hooks/useDocumentTitle.js
import { useEffect } from 'react'

export function useDocumentTitle(title) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title ? `${title} · Soft-Line` : 'Soft-Line'

    return () => {
      document.title = previousTitle
    }
  }, [title]);
}