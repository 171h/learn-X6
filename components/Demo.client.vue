<script setup lang="ts">
import type { Node } from '@antv/x6'
import { Graph } from '@antv/x6'
import { Logger } from '@171h/log'
import { data } from '~/data/demo'
import { customNode, workNode } from '~/utils/x6-node'

const logger = new Logger('Demo.client.vue')

Graph.registerNode(workNode.name, workNode.entity, workNode.inherit)
Graph.registerNode(customNode.name, customNode.entity, customNode.inherit)

const container = ref<HTMLDivElement>() as Ref<HTMLDivElement>
const graph = ref<Graph>() as Ref<Graph>
const node = ref<Node<Node.Properties>>() as Ref<Node<Node.Properties>>
useNuxtApp().hook('app:mounted', () => {
  graph.value = useCreateGraph(graph.value, container.value, data)
  graph.value.on('node:click', ({ node: n }) => {
    node.value = n
    logger.info('useNuxtApp', node.value)
  })
})
onNuxtReady(() => {
  graph.value = useCreateGraph(graph.value, container.value, data)
  graph.value.on('node:click', ({ node: n }) => {
    node.value = n
    logger.info('onNuxtReady', node.value)
  })
})

function scaleGraph() {
  const nodes = graph.value.getNodes()
  for (const node of nodes)
    node.scale(randomFloat(3), 1, { x: 0, y: 0 })
}
</script>

<template>
  <div class="flex gap-2">
    Hello X6
    <!-- <UButton label="translate" @click="() => transform('translate', graph)" />
    <UButton label="zoomIn" @click="() => transform('zoomIn', graph)" />
    <UButton label="zoomOut" @click="() => transform('zoomOut', graph)" />
    <UButton label="zoomTo" @click="() => transform('zoomTo', graph)" />
    <UButton label="zoomToFit" @click="() => transform('zoomToFit', graph)" /> -->
    <UButton label="centerContent" @click="() => transform('centerContent', graph)" />
    <UButton label="addNode" @click="addNode(graph)" />
    <UButton label="addEdge" @click="addEdge" />
    <UButton label="resize" @click="resize(node, randomInt())" />
    <UButton label="resizeLeft" @click="resize(node, randomInt(), { direction: 'left' })" />
    <UButton label="scale" @click="scale(node, randomFloat(2), { x: 0, y: 0 })" />
    <UButton label="zoomTo" @click="zoomTo(graph, randomFloat(3))" />
    <UButton label="zoomXTo" @click="zoomXTo(graph, randomFloat(3))" />
    <UButton label="scaleGraph" @click="scaleGraph" />
  </div>
  <div class="h-50% w-full">
    <div ref="container" />
  </div>
</template>
