import type { Node, Point } from '@antv/x6'

export function scale(node: Node<Node.Properties>, sx: number, origin?: Point.PointLike | null, options?: Node.SetOptions) {
  node.scale(sx, 1, origin, options)
}
