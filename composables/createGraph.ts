import type { Model } from '@antv/x6'
import { Graph } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'
import { MiniMap } from '@antv/x6-plugin-minimap'
import { History } from '@antv/x6-plugin-history'
import { Transform } from '@antv/x6-plugin-transform'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Keyboard } from '@antv/x6-plugin-keyboard'

export function useCreateGraph(graph: Graph, container: HTMLDivElement, minimap: HTMLDivElement, data: Model.FromJSONData) {
  graph = new Graph({
    container,
    autoResize: true,
    width: 800,
    height: 600,
    background: {
      color: '#F2F7FA',
    },
    grid: {
      visible: false,
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
    // panning: true,
    // mousewheel: true,
    // translating: {
    //   restrict: true,
    // },
  })
  graph.fromJSON(data)
  graph.centerContent()
  graph.use(
    new Snapline({ enabled: true }),
  )
  graph.use(
    new MiniMap({
      container: minimap,
      minScale: 1,
      maxScale: 1,
    }),
  )
  graph.use(
    new History({
      enabled: true,
    }),
  )
  graph.use(
    new Transform({
      resizing: {
        enabled: true,
      },
    }),
  )
  graph.use(
    new Clipboard({
      enabled: true,
    }),
  )
  graph.use(
    new Keyboard({
      enabled: true,
    }),
  )

  // 连接调试工具
  if (!window.__x6_instances__)
    window.__x6_instances__ = []
  window.__x6_instances__.push(graph)

  return graph
}
