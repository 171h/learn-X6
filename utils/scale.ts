import type { Node, Point } from '@antv/x6'
import { Logger } from '@171h/log'

const logger = new Logger('utils/scale.ts')

export function scale(node: Node<Node.Properties>, sx: number, origin?: Point.PointLike | null, options?: Node.SetOptions) {
  node.scale(sx, 1, origin, options)
}
