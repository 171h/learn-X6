<script setup lang="ts">
import { Card, Checkbox, Col, Row, Slider } from 'antd'
import { Dom, Graph } from '@antv/x6'
import type { Model, Node } from '@antv/x6'
import { Logger } from '@171h/log'
import { Scroller } from '@antv/x6-plugin-scroller'

const logger = new Logger('Demo.client.vue')

const container = ref<HTMLDivElement>() as Ref<HTMLDivElement>
const minimap = ref<HTMLDivElement>() as Ref<HTMLDivElement>
const graph = ref<Graph>() as Ref<Graph>

const data = {
  hello: {
    id: 'hello',
    x: 32,
    y: 32,
    width: 100,
    height: 40,
    label: 'Hello',
    attrs: {
      body: {
        stroke: '#8f8f8f',
        strokeWidth: 1,
        fill: '#fff',
        rx: 6,
        ry: 6,
      },
    },
  },
  world: {
    id: 'world',
    shape: 'circle',
    x: 160,
    y: 1200,
    width: 60,
    height: 60,
    label: 'World',
    attrs: {
      body: {
        stroke: '#8f8f8f',
        strokeWidth: 1,
        fill: '#fff',
      },
    },
  },
  rect: {
    id: 'rect',
    x: -60,
    y: 100,
    width: 100,
    height: 40,
    label: 'Rect',
    attrs: {
      body: {
        stroke: '#8f8f8f',
        strokeWidth: 1,
        fill: '#fff',
        rx: 6,
        ry: 6,
      },
    },
  },
}

onNuxtReady(() => {
  // graph.value = useCreateGraph(graph.value, container.value, minimap.value, [])
  graph.value = new Graph({
    container: container.value,
    autoResize: true,
    width: 800,
    height: 600,
    background: {
      color: '#F2F7FA',
    },
  })
  graph.value.fromJSON({ nodes: Object.keys(data).map(key => data[key]) })
  graph.value.use(
    new Scroller({
      enabled: true,
      pannable: true,
      width: 200,
      height: 200,
      pageBreak: true,
      pageVisible: true,
      pageHeight: 20,
      pageWidth: 400,
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      // minVisibleHeight: 20000,
      // minVisibleWidth: 20000,
    }),
  )

  const sc = graph.value.getPlugin('scroller') as Scroller
  const content = sc.container.querySelector('.x6-graph-scroller-content') as HTMLDivElement

  graph.value.on('resize', ({ width, height }) => {
    Dom.css(content, {
      width,
      height,
    })
  })

  // sc.container
})
</script>

<template>
  <div class="relative flex gap-2">
    Hello X6
  </div>
  <div class="h-90% w-full">
    <div ref="container" />
    <div ref="minimap" class="absolute bottom-0 right-0" />
  </div>
</template>
