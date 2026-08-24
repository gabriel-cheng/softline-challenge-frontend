import { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { extractErrorMessage } from '../../api/errors';
import { currencyMask, unmaskCurrency, weightMask, unmaskWeight } from '../../utils/MaskUtils';

const EMPTY_FORM = {
  code: '',
  description: '',
  barCode: '',
  sellingPrice: '',
  grossWeight: '',
  netWeight: ''
};

export function ProductFormModal({ open, mode, product, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const isEdit = mode === 'edit';

  useEffect(() => {
    if (!open) return
    setError(null);
    setForm(
      isEdit && product
        ? {
            code: product.code,
            description: product.description ?? '',
            barCode: product.barCode ?? '',
            sellingPrice: currencyMask(String(Math.round((product.sellingPrice ?? 0) * 100))),
            grossWeight: weightMask(String(Math.round((product.grossWeight ?? 0) * 1000))),
            netWeight: weightMask(String(Math.round((product.netWeight ?? 0) * 1000))),
          }
        : EMPTY_FORM
    );
  }, [open, isEdit, product]);

  function handleChange(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  }

  function handleCodeChange(event) {
    const digitsOnly = event.target.value.replace(/\D/g, '')
    setForm((current) => ({ ...current, code: digitsOnly }))
  }

  function handleSellingPriceChange(event) {
    const masked = currencyMask(event.target.value);
    setForm((current) => ({ ...current, sellingPrice: masked }));
  }

  function handleGrossWeightChange(event) {
    const masked = weightMask(event.target.value)
    setForm((current) => ({ ...current, grossWeight: masked }))
  }

  function handleNetWeightChange(event) {
    const masked = weightMask(event.target.value)
    setForm((current) => ({ ...current, netWeight: masked }))
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      code: Number(form.code),
      description: form.description,
      bar_code: form.barCode,
      selling_price: Number(unmaskCurrency(form.sellingPrice)),
      gross_weight: form.grossWeight === '' ? null : Number(unmaskWeight(form.grossWeight)),
      net_weight: form.netWeight === '' ? null : Number(unmaskWeight(form.netWeight)),
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
    <Modal open={open} title={isEdit ? 'Atualizar produto' : 'Criar produto'} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-4">
          <Input
            id="product-code"
            label="Code"
            type="text"
            inputMode="numeric"
            value={form.code}
            onChange={handleCodeChange}
            disabled={isEdit || submitting}
            required
          />

          <Input
            id="product-description"
            label="Description"
            type="text"
            value={form.description}
            maxLength={60}
            onChange={handleChange('description')}
            disabled={submitting}
            required
          />

          <Input
            id="product-bar-code"
            label="Bar code"
            type="text"
            value={form.barCode}
            maxLength={14}
            onChange={handleChange('barCode')}
            disabled={submitting}
          />

          <Input
            id="product-selling-price"
            label="Selling price"
            type="text"
            value={form.sellingPrice}
            onChange={handleSellingPriceChange}
            disabled={submitting}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              id="product-gross-weight"
              label="Gross weight"
              type="text"
              inputMode="decimal"
              value={form.grossWeight}
              onChange={handleGrossWeightChange}
              disabled={submitting}
            />
            <Input
              id="product-net-weight"
              label="Net weight"
              type="text"
              inputMode="decimal"
              value={form.netWeight}
              onChange={handleNetWeightChange}
              disabled={submitting}
            />
          </div>
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