import type { Model } from '@antv/x6'
import { Graph } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'

export function useCreateGraph(graph: Graph, container: HTMLDivElement, data: Model.FromJSONData) {
  graph = new Graph({
    container,
    autoResize: true,
    background: {
      color: '#F2F7FA',
    },
    grid: {
      visible: true,
      type: 'doubleMesh',
      args: [
        {
          color: '#eee',
          thickness: 1,
        },
        {
          color: '#ddd',
          thickness: 1,
          factor: 4,
        },
      ],
    },
    panning: true,
    mousewheel: true,
    translating: {
      restrict: true,
    },
  })
  graph.fromJSON(data)
  graph.centerContent()
  graph.use(
    new Snapline({ enabled: true }),
  )
  // 连接调试工具
  if (!window.__x6_instances__)
    window.__x6_instances__ = []
  window.__x6_instances__.push(graph)

  return graph
}
