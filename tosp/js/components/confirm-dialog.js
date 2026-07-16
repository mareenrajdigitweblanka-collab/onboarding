// components/confirm-dialog.js — accessible confirmation dialog replacing
// window.confirm(). Uses the native <dialog> element: showModal() gives
// built-in focus trapping and Escape-to-close for free; we handle explicit
// focus-return to the control that opened it.

let dialogEl = null;

function ensureDialog() {
  if (dialogEl) return dialogEl;

  dialogEl = document.createElement('dialog');
  dialogEl.className = 'confirm-dialog';
  dialogEl.innerHTML = `
    <form method="dialog" class="confirm-dialog__form">
      <h2 class="confirm-dialog__title"></h2>
      <p class="confirm-dialog__message"></p>
      <div class="confirm-dialog__actions">
        <button type="button" class="btn btn--ghost confirm-dialog__cancel">Cancel</button>
        <button type="button" class="btn btn--primary confirm-dialog__confirm">Confirm</button>
      </div>
    </form>
  `;
  document.body.appendChild(dialogEl);
  return dialogEl;
}

/**
 * Shows a modal confirmation dialog and resolves true/false. `danger`
 * styles the confirm button as destructive (used for reset).
 */
export function confirmDialog({ title = 'Please confirm', message = '', confirmLabel = 'Confirm', cancelLabel = 'Cancel', danger = false } = {}) {
  return new Promise((resolve) => {
    const dialog = ensureDialog();
    const invoker = document.activeElement;

    dialog.querySelector('.confirm-dialog__title').textContent = title;
    dialog.querySelector('.confirm-dialog__message').textContent = message;

    const confirmBtn = dialog.querySelector('.confirm-dialog__confirm');
    const cancelBtn = dialog.querySelector('.confirm-dialog__cancel');
    confirmBtn.textContent = confirmLabel;
    cancelBtn.textContent = cancelLabel;
    confirmBtn.className = `btn ${danger ? 'btn--danger' : 'btn--primary'} confirm-dialog__confirm`;

    function cleanup(result) {
      confirmBtn.removeEventListener('click', onConfirm);
      cancelBtn.removeEventListener('click', onCancel);
      dialog.removeEventListener('cancel', onDialogCancel);
      dialog.close();
      if (invoker && typeof invoker.focus === 'function') invoker.focus();
      resolve(result);
    }
    function onConfirm() { cleanup(true); }
    function onCancel() { cleanup(false); }
    function onDialogCancel(event) {
      event.preventDefault(); // We close explicitly in cleanup() so focus-return always runs.
      cleanup(false);
    }

    confirmBtn.addEventListener('click', onConfirm);
    cancelBtn.addEventListener('click', onCancel);
    dialog.addEventListener('cancel', onDialogCancel);

    dialog.showModal();
    cancelBtn.focus();
  });
}
