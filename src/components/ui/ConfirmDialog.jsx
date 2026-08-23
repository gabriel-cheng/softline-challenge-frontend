import { Button } from './Button';

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className="w-full max-w-sm rounded-lg border border-hairline bg-panel p-5 shadow-2xl">
        <h2 id="confirm-dialog-title" className="text-sm font-semibold text-text-primary">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm text-text-muted">{description}</p>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" size="md" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={variant} size="md" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
