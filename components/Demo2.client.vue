<script lang="ts">
import { defineComponent } from 'vue'
import { Graph } from '@antv/x6'
import { getTeleport, register } from '@antv/x6-vue-shape'
import ProgressNode from './ProgressNode2.client.vue'

register({
  shape: 'custom-vue-node',
  width: 100,
  height: 100,
  component: ProgressNode,
})
const TeleportContainer = getTeleport()

export default defineComponent({
  name: 'App',
  components: {
    TeleportContainer,
  },
  mounted() {
    const graph = new Graph({
      container: document.getElementById('container')!,
      background: {
        color: '#F2F7FA',
      },
      autoResize: true,
    })

    graph.addNode({
      shape: 'custom-vue-node',
      x: 100,
      y: 60,
    })
  },
})
</script>

<template>
  <div class="app-content">
    <div id="container" />
    <TeleportContainer />
    <ProgressNode />
  </div>
</template>
