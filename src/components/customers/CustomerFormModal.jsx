import { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { extractErrorMessage } from '../../api/errors';

const EMPTY_FORM = {
  code: '',
  name: '',
  nickname: '',
  document: '',
  address: '',
};

export function CustomerFormModal({ open, mode, customer, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const isEdit = mode === 'edit';

  useEffect(() => {
    if (!open) return
    setError(null)
    setForm(
      isEdit && customer
        ? {
            code: customer.code,
            name: customer.name ?? '',
            nickname: customer.nickname ?? '',
            document: customer.document ?? '',
            address: customer.address ?? '',
          }
        : EMPTY_FORM
    )
  }, [open, isEdit, customer]);

  function handleChange(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      code: Number(form.code),
      name: form.name,
      nickname: form.nickname,
      document: form.document,
      address: form.address,
    };

    try {
      await onSubmit(payload);
      onClose();
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal open={open} title={isEdit ? 'Atualizar cliente' : 'Criar cliente'} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-4">
          <Input
            id="customer-code"
            label="Code"
            type="number"
            value={form.code}
            onChange={handleChange('code')}
            disabled={isEdit || submitting}
            required
          />

          <Input
            id="customer-name"
            label="Name"
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            disabled={submitting}
            required
          />

          <Input
            id="customer-nickname"
            label="Nickname"
            type="text"
            value={form.nickname}
            onChange={handleChange('nickname')}
            disabled={submitting}
          />

          <Input
            id="customer-document"
            label="Document"
            type="text"
            value={form.document}
            onChange={handleChange('document')}
            disabled={submitting}
          />

          <Input
            id="customer-address"
            label="Address"
            type="text"
            value={form.address}
            onChange={handleChange('address')}
            disabled={submitting}
          />
        </div>

        {error && (
          <div className="mt-4 rounded-md border border-danger/30 bg-danger-soft px-3 py-2 text-xs text-danger">
            {error}
          </div>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" size="md" onClick={onClose} disabled={submitting}>
            cancel
          </Button>
          <Button type="submit" variant="primary" size="md" loading={submitting}>
            {isEdit ? 'save changes' : 'create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}