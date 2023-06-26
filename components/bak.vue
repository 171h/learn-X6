<script setup lang="ts">
import _ from 'lodash'
import type { Graph, Node } from '@antv/x6'
import { Logger } from '@171h/log'
import type { Bar } from '@proj/gantt'
import { Gantt, addEdge, barNames, getJoinVertices, randomFloat, randomInt, resize, scaleX, transform } from '@proj/gantt'
import type { CalendarInstance } from '@proj/kit'
import { businessTimeToDate, getBusinessTime } from '@proj/kit'
import type { TimeLine } from '@proj/timeline'
import type { Scroller } from '@antv/x6-plugin-scroller'

import type { FileInstance, Props, RowData } from '@proj/types'
import { useScaleStore } from '~/store/scale'
import { data as d } from '~/examples/x6'

const fi = inject<Ref<FileInstance>>('fileInstance')
const ci = inject<Ref<CalendarInstance>>('calendarInstance')
const data = computed(() => fi?.value?.data || [])

const basetime = ref(new Date().getTime())
const connectorRound = 3

const logger = new Logger('Demo.client.vue')

// Graph.registerNode(workNode.name, workNode.entity, workNode.inherit)
// Graph.registerNode(tlBot.name, tlBot.entity, tlBot.inherit)
// Graph.registerNode(tlTop.name, tlTop.entity, tlTop.inherit)

const container = ref<HTMLDivElement>() as Ref<HTMLDivElement>
const scrollerContainer = ref<HTMLDivElement>() as Ref<HTMLDivElement>
const timeline = ref<TimeLine>() as Ref<TimeLine>
const minimap = ref<HTMLDivElement>() as Ref<HTMLDivElement>
const graph = ref<Graph>() as Ref<Graph>
const node = ref<Node<Node.Properties>>() as Ref<Node<Node.Properties>>
const state = ref({
  canRedo: false,
  canUndo: false,
})
const zeroLeftGap = ref(0)
const zeroTopGap = ref(0)
const graphVisibleWidth = ref(0)
const graphVisibleHeight = ref(0)

onNuxtReady(() => {
  graph.value = useCreateGraph(graph.value, container.value, minimap.value, d)
  scrollerContainer.value = (graph.value.getPlugin('scroller') as Scroller).container
  timeline.value = (graph.value.getPlugin('timeline') as TimeLine)

  graph.value.on('node:click', ({ node: n }) => {
    node.value = n
    logger.info('onNuxtReady', node.value)
  })

  graph.value.on('histore:change', () => {
    state.value.canRedo = graph.value.canRedo()
    state.value.canUndo = graph.value.canUndo()
  })

  // 渲染横道图
  addTasks(data.value)
  addEdges(data.value)

  const scrollEvent = useThrottleFn(() => {
    // logger.info('graph:scroll', zeroLeftGap.value, zeroTopGap.value, graphVisibleWidth.value, graphVisibleHeight.value)
    const startX = -zeroLeftGap.value
    const endX = -zeroLeftGap.value + graphVisibleWidth.value

    if (startX < timeline.value.startX || endX > timeline.value.endX) {
      const options = timeline.value.options
      logger.info('scrollEvent', options)
      const newStartDate = new Date(options.startDate.getTime() - 60000 * 60 * 3)
      const newEndDate = new Date(options.endDate.getTime() + 60000 * 60 * 3)
      logger.info('scrollEvent', { newStartDate, newEndDate })
      graph.value.updateTimeline({
        ...options,
        startDate: newStartDate,
        endDate: newEndDate,
      })
      // const newX1 = startX - 200
      // const newX2 = endX + 200
      // const newStartDate = timeline.value.getDateByX(newX1)
      // const newEndDate = timeline.value.getDateByX(newX2)
      logger.debug('1234515')
    }
  })

  scrollerContainer.value?.addEventListener('scroll', () => {
    const scroll = scrollerContainer.value
    const zeroClientPoint = graph.value.localToClient(0, 0)
    const [zeroClientLeft, zeroClientTop] = [zeroClientPoint.x, zeroClientPoint.y]
    zeroLeftGap.value = zeroClientLeft - scroll.offsetLeft
    zeroTopGap.value = zeroClientTop - scroll.offsetTop
    graphVisibleWidth.value = scroll.clientWidth
    graphVisibleHeight.value = scroll.clientHeight
    timeline.value.timeline.position(0, -zeroTopGap.value)
    scrollEvent()
  })
})

function addTasks(data: RowData[]) {
  for (let i = 0; i < data.length; i++) {
    const startCompute = unref(data[i].startCompute)
    const finishCompute = unref(data[i].finishCompute)
    const calendarUuid = unref(data[i].calendarUuid)
    if (!startCompute || !finishCompute || !calendarUuid || !ci?.value)
      continue
    const startTime = getBusinessTime(startCompute, ci.value.businessOptionMap[calendarUuid])
    const finishTime = getBusinessTime(finishCompute, ci.value.businessOptionMap[calendarUuid])
    const realDuration = finishTime - startTime

    if (i === 0)
      basetime.value = startTime

    const childRows = unref(data[i].childRows)
    const hasChild = !!(childRows && childRows.length > 0)
    let shape: Bar.BarName = 'task'
    if (realDuration === 0)
      shape = 'milestone'
    else if (hasChild)
      shape = 'summary'
    const node = {
      id: unref(data[i].uuid),
      x: (startTime - basetime.value),
      index: i,
      width: realDuration,
      // label: unref(data[i].name) || '',
      shape,
      data: data[i],
    }

    graph.value.addGanttNode(node)
  }
}

function addEdges(data: RowData[]) {
  const edges = []
  const rowH = graph.value.ganttConfig()?.rowH || 20
  for (let i = 0; i < data.length; i++) {
    const joins = unref(data[i].preWork)
    if (!joins)
      continue
    const targetUuid = unref(data[i].uuid)
    const target = graph.value.getCellById(targetUuid) as Node
    for (let j = 0; j < joins.length; j++) {
      const type = (joins[j].type?.toLocaleLowerCase() || 'fs') as Props.JoinType
      const sourceUuid = joins[j].uuid
      const source = graph.value.getCellById(sourceUuid) as Node
      const { vertices, sourceAnchor, targetAnchor } = getJoinVertices(source, target, { rowH, type })
      const edge = {
        source: { cell: source, anchor: sourceAnchor }, //
        target: { cell: target, anchor: targetAnchor }, // , port: targetPort
        connector: {
          name: 'rounded',
          args: {
            radius: connectorRound,
          },
        },
        vertices,
        attrs: {
          line: {
            targetMarker: {
              name: 'block',
              args: {
                size: '6',
              },
            },
            stroke: 'red',
            strokeWidth: 1,
          },
        },
        data: {
          type,
          sourceUuid,
          targetUuid,
        },
      }
      edges.push(edge)
    }
  }
  logger.info('addEdges', edges)
  graph.value.addEdges(edges)
  logger.info(graph.value)
}

const count = ref(0)
</script>

<template>
  <div class="relative flex gap-2">
    Hello X6
    <!-- <UButton label="translate" @click="() => transform('translate', graph)" />
    <UButton label="zoomIn" @click="() => transform('zoomIn', graph)" />
    <UButton label="zoomOut" @click="() => transform('zoomOut', graph)" />
    <UButton label="zoomTo" @click="() => transform('zoomTo', graph)" /> -->
    <!-- <UButton class="bg-blue" label="addReactiveNode" @click="addReactiveNode" /> -->
    <UButton class="bg-blue" label="zoomTo1" @click="() => transform('zoomTo', graph)" />
    <UButton class="bg-blue" label="zoomToFit" @click="() => transform('zoomToFit', graph)" />
    <UButton class="bg-blue" label="centerContent" @click="() => transform('centerContent', graph)" />
    <UButton class="bg-blue" label="addNode" @click="addTask()" />
    <!-- <UButton class="bg-blue" label="strechTimeline" @click="graph.extendTimeline(1000, 'left')" /> -->
    <UButton class="bg-blue" label="addTask" @click="addTask()" />
    <UButton class="bg-blue" label="addSummary" @click="addSummary()" />
    <UButton class="bg-blue" label="addMilestone" @click="addMilestone()" />
    <UButton class="bg-blue" label="addEdge" @click="addEdge" />
    <!-- <UButton class="bg-blue" label="resize" @click="resize(node, randomInt())" />
    <UButton class="bg-blue" label="resizeLeft" @click="resize(node, randomInt(), { direction: 'left' })" /> -->
    <!-- <UButton label="scale" @click="scale(node, randomFloat(2), { x: 0, y: 0 })" /> -->
    <!-- <UButton label="zoomTo" @click="zoomTo(graph, randomFloat(3))" /> -->
    <!-- <UButton label="zoomXTo" @click="zoomXTo(graph, randomFloat(3))" /> -->
    <UButton class="bg-blue" label="zoomX+" @click="zoomX(0.001)" />
    <UButton class="bg-blue" label="zoomX-" @click="zoomX(-0.001)" />
    <UButton class="bg-blue" label="zoomXTo" @click="zoomXTo(randomInt(10))" />
    <!-- <UButton class="bg-blue" :disabled="state.canUndo" label="undo" @click="onUndo" />
    <UButton class="bg-blue" :disabled="state.canRedo" label="redo" @click="onRedo" /> -->
  </div>
</template>

<style>

</style>
