import type { Graph } from '@antv/x6'

export function addEdge(graph: Graph) {
  graph.addEdge({
    shape: 'edge',
    source: 'node1',
    target: 'node3',
    label: 'custom',
  })
}
