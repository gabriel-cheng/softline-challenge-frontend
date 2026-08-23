import { useCallback, useEffect, useState } from 'react';
import { createCustomer, deleteCustomer, fetchCustomers, updateCustomer } from '../api/customers';

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [deletingCode, setDeletingCode] = useState(null);

  const load = useCallback(async () => {
    setStatus((current) => (current === 'ready' ? 'ready' : 'loading'));
    setError(null);
    try {
      const data = await fetchCustomers();
      setCustomers(data);
      setStatus('ready');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, [])

  useEffect(() => {
    load()
  }, [load]);

  useEffect(() => {
    function handleVisibility() {
      if (document.visibilityState === 'visible') {
        load()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [load]);

  const removeCustomer = useCallback(async (code) => {
    setDeletingCode(code)
    try {
      await deleteCustomer(code)
      setCustomers((current) => current.filter((c) => c.code !== code))
    } finally {
      setDeletingCode(null)
    }
  }, []);

  const create = useCallback(async (payload) => {
    await createCustomer(payload);
    await load();
  }, [load]);

  const update = useCallback(async (code, payload) => {
    await updateCustomer(code, payload);
    await load();
  }, [load]);

  return {
    customers,
    status,
    error,
    deletingCode,
    refetch: load,
    removeCustomer,
    create,
    update
  };
}