<template>
  <div class="dot-sync">
    <div class="dot-sync__dot" ref="dotEl"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useDotMover } from '@/composables/useDotMover'
import { useDotSync } from '@/composables/useDotSync'

export default defineComponent({
  setup() {
    const dotEl = ref<HTMLElement>()

    const { send } = useDotSync(dotEl, 'http://127.0.0.1:3000')
    useDotMover(dotEl, (x, y) => send({ x, y }))

    return { dotEl }
  },
})
</script>

<style scoped>
.dot-sync {
  background: #7b8795;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dot-sync__dot {
  background: white;
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.4);
  display: block;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  user-select: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
