import type { Graph, Node } from '@antv/x6'
import { v4 as uuid } from 'uuid'
import { Logger } from '@171h/log'

const logger = new Logger('add.ts')

const count = ref(0)

export function addNode(graph: Graph) {
  count.value++
  const newNode: Node.Metadata = {
    id: uuid(),
    shape: 'work-node',
    x: 30,
    y: count.value * 30,
    width: Math.round(Math.random() * 400),
    height: 25,
    label: `任务 ${count.value}`,
    attrs: {
      text: {
        refX: 0,
        refY: 0.5,
        textAnchor: 'start',
      },
    },
  }
  const node = graph.addNode(newNode)

  logger.info('addNode', node)
}
