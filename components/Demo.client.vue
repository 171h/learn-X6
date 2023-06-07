<script setup lang="ts">
import { Graph } from '@antv/x6'
import { data } from '~/data/demo'
import { customNode, workNode } from '~/utils/x6-node'
import { addNode } from '~/utils/addNode'
import { addEdge } from '~/utils/addEdge'
import { transform } from '~/utils/transform'

Graph.registerNode(workNode.name, workNode.entity, workNode.inherit)
Graph.registerNode(customNode.name, customNode.entity, customNode.inherit)

const container = ref<HTMLDivElement>() as Ref<HTMLDivElement>
const graph = ref<Graph>() as Ref<Graph>
useNuxtApp().hook('app:mounted', () => {
  graph.value = useCreateGraph(graph.value, container.value, data)
})
onNuxtReady(() => {
  graph.value = useCreateGraph(graph.value, container.value, data)
})
</script>

<template>
  <div class="flex gap-2">
    Hello X6
    <UButton label="translate" @click="() => transform('translate', graph)" />
    <UButton label="zoomIn" @click="() => transform('zoomIn', graph)" />
    <UButton label="zoomOut" @click="() => transform('zoomOut', graph)" />
    <UButton label="zoomTo" @click="() => transform('zoomTo', graph)" />
    <UButton label="zoomToFit" @click="() => transform('zoomToFit', graph)" />
    <UButton label="centerContent" @click="() => transform('centerContent', graph)" />
    <UButton label="addNode" @click="addNode(graph)" />
    <UButton label="addEdge" @click="addEdge" />
  </div>
  <div class="h-50% w-full">
    <div ref="container" />
  </div>
</template>
