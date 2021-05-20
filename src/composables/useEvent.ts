import { onMounted, onUnmounted, Ref, unref } from 'vue'

export function useEvent(
  elRef:
    | Ref<Element | Document | undefined | null>
    | Element
    | Document
    | undefined
    | null,
  type: keyof HTMLElementEventMap,
  listener: EventListener | EventListenerObject,
  options?: AddEventListenerOptions | boolean
): void {
  onMounted(() => {
    const el = unref(elRef)
    el && el.addEventListener(type, listener, options)
  })
  onUnmounted(() => {
    const el = unref(elRef)
    el && el.removeEventListener(type, listener)
  })
}
