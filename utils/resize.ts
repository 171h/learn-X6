import type { Node } from '@antv/x6'

export function resize(node: Node<Node.Properties>, width: number, options?: Node.ResizeOptions) {
  node.resize(width, node.size().height, options)
}
