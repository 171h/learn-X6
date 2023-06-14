import type { Graph, Node } from '@antv/x6'
import { Logger } from '@171h/log'

const logger = new Logger('utils/timeline.ts')

export function pruducer(graph: Graph) {
  const width = window.innerWidth * 2
  logger.info('pruducer', width)
  const options = {
    startTime: 0,
    interval: 25,
    height: 30,
    y: -30,
    x: 0,
  }
  const opt = Object.assign({ interval: 15 }, options)
  const count = Math.ceil(3840 / opt.interval)
  const node = {
    id: 'time-line',
    shape: 'path',
    x: 0,
    y: 0,
    width,
    markup: [
      {
        tagName: 'path',
        selector: 'body',
      },
      {
        tagName: 'path',
        selector: 'bottom',
      },
    ],
    attrs: {
      body: {
        stroke: '#000',
        strokeWidth: 1,
        fill: '#000',
        d: `M 0 0 L ${width} 0`,
      },
      bottom: {
        stroke: '#000',
        strokeWidth: 1,
        fill: '#000',
        d: '',
      },
    },
  }
  for (let i = 0; i < count; i++)
    node.attrs.bottom.d += `M ${i * opt.interval} 0 L ${i * opt.interval} -${opt.height / 3}`

  return node
}

export function extendTimeline(timeline: Node<Node.Properties>, left?: Node<Node.Properties>) {
  const count = 100
  const interval = 25
  const body = timeline.getAttrs().body.d as string
  const bottom = timeline.getAttrs().bottom.d as string

  logger.info('extendTimeline:path', { body, bottom })

  const firstIndexEnd = bottom.slice(1).indexOf('M') + 1
  const first = bottom.slice(0, firstIndexEnd)
  logger.info('extendTimeline:first', first)

  const bodyVector = pathVertor(body)
  const firstBottomVector = pathVertor(first)

  logger.info('extendTimeline:bodyVector', bodyVector)
  logger.info('extendTimeline:firstBottomVector', firstBottomVector)

  const newBody = `M ${bodyVector.x1 - count * interval} ${bodyVector.y1} L ${bodyVector.x2} ${bodyVector.y2}`
  let newBottom = bottom
  for (let i = 0; i < count; i++)
    newBottom += `M ${firstBottomVector.x1 - i * interval} ${firstBottomVector.y1} L ${firstBottomVector.x2 - i * interval} ${firstBottomVector.y2}`
  timeline.size(5000, 30)
  const newTimeline = timeline.setAttrs({
    body: {
      d: newBody,
      fill: 'red',
      stroke: 'red',
    },
    bottom: {
      d: newBottom,
    },
  })
  if (left)
    left.position(bodyVector.x1 - count * interval, 0)

  logger.info('extendTimeline:newTimeline', newTimeline)
}

export function pathVertor(path: string) {
  path = path.replace('M', ' ').replace('L', ' ').replace(',', ' ')
  const vector = path.split(' ').filter(v => v !== '').map(v => Number(v))
  if (vector.length !== 4)
    throw new Error('pathVertor: path is not a line')
  const [x1, y1, x2, y2] = vector
  return { x1, y1, x2, y2 }
}
