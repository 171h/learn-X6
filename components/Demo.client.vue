<script setup lang="ts">
import type { Node } from '@antv/x6'
import { Graph } from '@antv/x6'
import { Logger } from '@171h/log'
import { useScaleStore } from '../store/scale'
import { data } from '~/data/demo'
import { tlBot, tlTop, workNode } from '~/utils/x6-node'

const store = useScaleStore()

const logger = new Logger('Demo.client.vue')

Graph.registerNode(workNode.name, workNode.entity, workNode.inherit)
Graph.registerNode(tlBot.name, tlBot.entity, tlBot.inherit)
Graph.registerNode(tlTop.name, tlTop.entity, tlTop.inherit)

const container = ref<HTMLDivElement>() as Ref<HTMLDivElement>
const graph = ref<Graph>() as Ref<Graph>
const node = ref<Node<Node.Properties>>() as Ref<Node<Node.Properties>>
const scale = ref<number>(1)
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

function zoomX(sx: number) {
  logger.debug('zoomX', 'store.sx', store.sx)
  sx = store.tryScale(sx + store.sx)
  logger.info('zoomX sx', sx)
  logger.info('zoomX store.sx', store.sx)
  const ret = scaleX(graph.value, sx / store.sx)
  if (ret)
    store.scaleTo(sx)
}

function zoomXTo(sx: number) {
  sx = store.tryScale(sx)
  logger.info('zoomXTo sx', sx)
  logger.info('zoomXTo store.sx', store.sx)
  const ret = scaleX(graph.value, sx / store.sx)
  if (ret)
    store.scaleTo(sx)
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
    <UButton label="zoomX+" @click="zoomX(0.2)" />
    <UButton label="zoomX-" @click="zoomX(-0.2)" />
    <UButton label="zoomXTo" @click="zoomXTo(randomInt(10))" />
  </div>
  <div class="h-90% w-full">
    <div ref="container" />
  </div>
</template>
