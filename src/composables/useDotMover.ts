import { Ref } from '@vue/reactivity'
import { useEvent } from '@/composables/useEvent'
import { moveElementTo } from '@/helpers/moveElementTo'
import { getEventCoords } from '@/helpers/getEventCoords'

export function useDotMover(
  el: Ref<HTMLElement | undefined | null>,
  onMove: (x: number, y: number) => void
): void {
  let _isMoving = false
  const _onMoveStart = () => {
    _isMoving = true
  }
  const _onMove = (event: Event) => {
    if (!_isMoving) return
    const [x, y] = getEventCoords(event as MouseEvent | TouchEvent)
    moveElementTo(el.value, x, y)
    onMove(x, y)
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

  return
}
