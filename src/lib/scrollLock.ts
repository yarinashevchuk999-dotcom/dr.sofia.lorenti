/**
 * Shared body scroll lock with a reference count, so independent overlays
 * (intro gate, mobile nav, booking modal) can each lock/unlock without
 * clobbering each other's `document.body.style.overflow` — one naively
 * setting it back to "" on close previously undid another's active lock.
 */
let count = 0;

export function lockScroll() {
  if (typeof document === "undefined") return;
  count += 1;
  if (count === 1) {
    document.body.style.overflow = "hidden";
  }
}

export function unlockScroll() {
  if (typeof document === "undefined") return;
  count = Math.max(0, count - 1);
  if (count === 0) {
    document.body.style.overflow = "";
  }
}
