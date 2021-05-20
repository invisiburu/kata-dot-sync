import { Ref } from '@vue/reactivity'
import { useEvent } from '@/composables/useEvent'

export function useDotMover(el: Ref<HTMLElement | undefined | null>): void {
  let _isMoving = false
  const _onMoveStart = () => {
    _isMoving = true
  }
  const _onMove = (event: Event) => {
    if (!_isMoving) return
    const [x, y] = _getEventCoords(event as MouseEvent | TouchEvent)
    el.value && (el.value.style.left = `${x}px`)
    el.value && (el.value.style.top = `${y}px`)
  }
  const _onMoveEnd = () => {
    _isMoving = false
  }

  useEvent(el, 'mousedown', _onMoveStart)
  useEvent(document, 'mousemove', _onMove)
  useEvent(document, 'mouseup', _onMoveEnd)
  useEvent(el, 'touchstart', _onMoveStart)
  useEvent(document, 'touchmove', _onMove)
  useEvent(document, 'touchend', _onMoveEnd)
}

function _getEventCoords(event: MouseEvent | TouchEvent) {
  return 'clientX' in event
    ? [event.clientX, event.clientY]
    : [event.targetTouches[0].clientX, event.targetTouches[0].clientY]
}
