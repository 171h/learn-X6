<script setup lang="ts">
import { Graph } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'
import { data } from '@/data/demo'

const container = ref<HTMLElement>()
const nuxtApp = useNuxtApp()
const graph = ref<Graph>() as Ref<Graph>
nuxtApp.hook('app:mounted', () => {
  graph.value = new Graph({
    container: container.value,
    autoResize: true,
    background: {
      color: '#F2F7FA',
    },
    grid: {
      visible: true,
      type: 'doubleMesh',
      args: [
        {
          color: '#eee',
          thickness: 1,
        },
        {
          color: '#ddd',
          thickness: 1,
          factor: 4,
        },
      ],
    },
    panning: true,
    mousewheel: true,
  })
  graph.value.fromJSON(data)
  graph.value.centerContent()
  graph.value.use(
    new Snapline({ enabled: true }),
  )
})

function transform(command: string) {
  switch (command) {
    case 'translate':
      graph.value.translate(20, 20)
      break
    case 'zoomIn':
      graph.value.zoom(0.2)
      break
    case 'zoomOut':
      graph.value.zoom(-0.2)
      break
    case 'zoomTo':
      graph.value.zoomTo(1)
      break
    case 'zoomToFit':
      graph.value.zoomToFit()
      break
    case 'centerContent':
      graph.value.centerContent()
      break
    default:
      break
  }
}
</script>

<template>
  <div class="flex gap-2">
    Hello X6
    <UButton label="translate" @click="() => transform('translate')" />
    <UButton label="zoomIn" @click="() => transform('zoomIn')" />
    <UButton label="zoomOut" @click="() => transform('zoomOut')" />
    <UButton label="zoomTo" @click="() => transform('zoomTo')" />
    <UButton label="zoomToFit" @click="() => transform('zoomToFit')" />
    <UButton label="centerContent" @click="() => transform('centerContent')" />
  </div>
  <div class="h-50% w-full">
    <div ref="container" />
  </div>
</template>
