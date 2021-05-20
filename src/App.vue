<template>
  <DotSync />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DotSync from './components/DotSync.vue'

export default defineComponent({
  name: 'App',
  components: {
    DotSync,
  },
})
</script>

<style>
body {
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
