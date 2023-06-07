import type { Graph, TransformManager } from '@antv/x6'

export function zoomTo(graph: Graph, factor: number, options?: TransformManager.ZoomOptions) {
  graph.zoomTo(factor, options)
}

export function zoomXTo(graph: Graph, factor: number, options?: TransformManager.ZoomOptions) {
  graph.zoomXTo(factor, options)
}
