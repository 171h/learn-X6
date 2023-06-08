import type { Graph } from '@antv/X6'

export function scaleX(graph: Graph, sx: number) {
  const nodes = graph.getNodes()
  for (const node of nodes)
    node.scale(sx, 1, { x: 0, y: 0 })
  return true
}
