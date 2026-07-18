/**
 * Desktop + tablet app (phones unsupported).
 * Always report non-mobile so the sidebar stays in its desktop/tablet layout
 * instead of switching to the sheet drawer.
 */
export function useIsMobile() {
  return false
}
