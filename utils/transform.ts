import type { Graph } from '@antv/x6'

export function transform(command: string, graph: Graph) {
  switch (command) {
    case 'translate':
      graph.translate(20, 20)
      break
    case 'zoomIn':
      graph.zoom(0.2)
      break
    case 'zoomOut':
      graph.zoom(-0.2)
      break
    case 'zoomTo':
      graph.zoomTo(1)
      break
    case 'zoomToFit':
      graph.zoomToFit()
      break
    case 'centerContent':
      graph.centerContent()
      break
    default:
      break
  }
}
