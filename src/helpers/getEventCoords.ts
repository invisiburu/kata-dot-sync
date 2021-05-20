export function getEventCoords(
  event: MouseEvent | TouchEvent
): [x: number, y: number] {
  return 'clientX' in event
    ? [event.clientX, event.clientY]
    : [event.targetTouches[0].clientX, event.targetTouches[0].clientY]
}
