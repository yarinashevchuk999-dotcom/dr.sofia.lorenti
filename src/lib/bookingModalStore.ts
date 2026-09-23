let isOpen = false;
let source: string | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getIsOpen(): boolean {
  return isOpen;
}

export function getServerIsOpen(): boolean {
  return false;
}

export function getSource(): string | null {
  return source;
}

/** `procedureName` — when opened from a procedure card, shown in the modal for context. */
export function openBookingModal(procedureName?: string) {
  isOpen = true;
  source = procedureName ?? null;
  emit();
}

export function closeBookingModal() {
  isOpen = false;
  emit();
}
