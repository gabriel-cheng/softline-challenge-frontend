import { useCallback, useEffect, useState } from 'react'
import { deleteProduct, fetchProducts } from '../api/products'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const [deletingCode, setDeletingCode] = useState(null)

  const load = useCallback(async () => {
    setStatus((current) => (current === 'ready' ? 'ready' : 'loading'))
    setError(null)
    try {
      const data = await fetchProducts()
      setProducts(data)
      setStatus('ready')
    } catch (err) {
      setError(err)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    function handleVisibility() {
      if (document.visibilityState === 'visible') {
        load()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [load])

  const removeProduct = useCallback(async (code) => {
    setDeletingCode(code)
    try {
      await deleteProduct(code)
      setProducts((current) => current.filter((p) => p.code !== code))
    } finally {
      setDeletingCode(null)
    }
  }, [])

  return {
    products,
    status,
    error,
    deletingCode,
    refetch: load,
    removeProduct,
  }
}
