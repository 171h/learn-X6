<script setup lang="ts">
import type { Node } from '@antv/x6'
import { Graph } from '@antv/x6'
import { Logger } from '@171h/log'
import { History } from '@antv/x6-plugin-history'
import { useScaleStore } from '../store/scale'
import { data } from '~/data/demo'
import { task, tlBot, tlTop, verLine, workNode } from '~/utils/x6-node'
import { extendTimeline, pruducer } from '~/utils/timeline'

const store = useScaleStore()

const logger = new Logger('Demo.client.vue')

Graph.registerNode(task.name, task.entity, task.inherit)
Graph.registerNode(verLine.name, verLine.entity, verLine.inherit)
Graph.registerNode(workNode.name, workNode.entity, workNode.inherit)
Graph.registerNode(tlBot.name, tlBot.entity, tlBot.inherit)
Graph.registerNode(tlTop.name, tlTop.entity, tlTop.inherit)

const container = ref<HTMLDivElement>() as Ref<HTMLDivElement>
const minimap = ref<HTMLDivElement>() as Ref<HTMLDivElement>
const graph = ref<Graph>() as Ref<Graph>
const node = ref<Node<Node.Properties>>() as Ref<Node<Node.Properties>>
const timeline = ref<Node<Node.Properties>>()
const left = ref<Node<Node.Properties>>()
const right = ref<Node<Node.Properties>>()
const scale = ref<number>(1)
const state = ref({
  canRedo: false,
  canUndo: false,
})
onNuxtReady(() => {
  graph.value = useCreateGraph(graph.value, container.value, minimap.value, data)
  graph.value.on('node:click', ({ node: n }) => {
    node.value = n
    logger.info('onNuxtReady', node.value)
  })

  graph.value.use(
    new History({
      enabled: true,
    }),
  )

  graph.value.on('histore:change', () => {
    state.value.canRedo = graph.value.canRedo()
    state.value.canUndo = graph.value.canUndo()
  })

  graph.value.on('translate', ({ tx, ty }) => {
    logger.info('translate', tx, ty)
  })

  graph.value.on('graph:scroll', (evt: any) => {
    logger.info('graph:scroll', evt.e.scrollLeft, evt.e.scrollTop)
    const bbox = timeline.value?.getBBox()
    logger.info('graph:scroll', 'time-line,bbox', bbox)
  })

  left.value = graph.value.addNode({
    id: 'left',
    shape: 'rect',
    x: 0,
    y: 0,
    visible: true,
    label: '最左侧',
  })
  right.value = graph.value.addNode({
    id: 'right',
    shape: 'rect',
    x: 0,
    y: 0,
    visible: true,
    label: '最右侧',
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

function onUndo() {
  graph.value?.undo()
}

function onRedo() {
  graph.value?.redo()
}

const count = ref(0)
function addTask() {
  graph.value.addNode({
    shape: 'task',
    label: `task${count.value}`,
    y: count.value * 30,
    // width height 高度必须同时传递
    width: count.value * 30,
    height: 25,
    h: 23,
  })
  count.value++
}
function addVerline() {
  graph.value.addNode({
    shape: 'ver-line',
    y: count.value * 30,
    // width height 高度必须同时传递
    width: count.value * 30,
    height: 25,
  })
  count.value++
}

function addPath() {
  const node = pruducer(graph.value)
  timeline.value = graph.value.addNode(node)
}
function test() {
  const pos = graph.value.getScrollbarPosition()
  logger.info('test, pos', pos)
}
</script>

<template>
  <div class="relative flex gap-2">
    Hello X6
    <!-- <UButton label="translate" @click="() => transform('translate', graph)" />
    <UButton label="zoomIn" @click="() => transform('zoomIn', graph)" />
    <UButton label="zoomOut" @click="() => transform('zoomOut', graph)" />
    <UButton label="zoomTo" @click="() => transform('zoomTo', graph)" /> -->
    <UButton label="zoomTo1" @click="() => transform('zoomTo', graph)" />
    <UButton label="zoomToFit" @click="() => transform('zoomToFit', graph)" />
    <UButton label="centerContent" @click="() => transform('centerContent', graph)" />
    <UButton label="addNode" @click="addNode(graph)" />
    <UButton label="addPath" @click="addPath()" />
    <UButton label="extendTimelineL" @click="extendTimeline(timeline!, { left, right, direction: 'left' })" />
    <UButton label="extendTimelineR" @click="extendTimeline(timeline!, { left, right })" />
    <UButton label="test" @click="test()" />
    <!-- <UButton label="addTask" @click="addTask()" />
    <UButton label="addVerline" @click="addVerline()" />
    <UButton label="addEdge" @click="addEdge" />
    <UButton label="resize" @click="resize(node, randomInt())" />
    <UButton label="resizeLeft" @click="resize(node, randomInt(), { direction: 'left' })" />
    <UButton label="scale" @click="scale(node, randomFloat(2), { x: 0, y: 0 })" /> -->
    <!-- <UButton label="zoomTo" @click="zoomTo(graph, randomFloat(3))" /> -->
    <!-- <UButton label="zoomXTo" @click="zoomXTo(graph, randomFloat(3))" /> -->
    <UButton label="zoomX+" @click="zoomX(0.2)" />
    <UButton label="zoomX-" @click="zoomX(-0.2)" />
    <UButton label="zoomXTo" @click="zoomXTo(randomInt(10))" />
    <!-- <UButton :disabled="state.canUndo" label="undo" @click="onUndo" />
    <UButton :disabled="state.canRedo" label="redo" @click="onRedo" /> -->
  </div>
  <div class="h-90% w-full">
    <div ref="container" />
    <div ref="minimap" class="absolute bottom-0 right-0" />
  </div>
</template>
