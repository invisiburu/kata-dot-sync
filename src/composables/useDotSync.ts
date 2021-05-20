import { moveElementTo } from '@/helpers/moveElementTo'
import { Ref, unref } from '@vue/reactivity'
import { onUnmounted } from '@vue/runtime-core'
import { io } from 'socket.io-client'

interface DotSync {
  x: number
  y: number
}

export function useDotSync(
  el: Ref<HTMLElement | undefined | null>,
  host: string
): { send: (sync: DotSync) => void } {
  const _socket = io(host)
  _socket.on('connect', () => {
    console.debug('Connected to the sync server')
  })
  _socket.on('disconnect', () => {
    console.debug('Disconnected from the sync server')
  })
  _socket.on('syncDot', (sync: DotSync) => {
    moveElementTo(unref(el), sync.x, sync.y)
  })

  // NOTE: we can throttle the send() to lower the network impact,
  // but it is so sexy the other dots react just immediately...
  let _prevSync = { x: -1, y: -1 }
  const send = (sync: DotSync) => {
    if (_prevSync.x === sync.x && _prevSync.y === sync.y) return
    _prevSync = sync
    _socket.emit('dotMove', sync)
  }

  onUnmounted(() => {
    _socket.disconnect()
  })

  return { send }
}
