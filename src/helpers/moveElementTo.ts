export function moveElementTo(
  el: HTMLElement | undefined | null,
  x: number | string,
  y: number | string
): void {
  if (!el) return
  el.style.left = `${x}px`
  el.style.top = `${y}px`
}
