import type { Graph, Node } from '@antv/x6'
import { Logger } from '@171h/log'

const logger = new Logger('utils/timeline.ts')

export function pruducer(graph: Graph) {
  const width = 1920
  logger.info('pruducer', width)
  const options = {
    startTime: 0,
    interval: 15,
    height: 30,
    y: -30,
    x: 0,
  }
  const opt = Object.assign({ interval: 25 }, options)
  const count = Math.ceil(width / opt.interval)
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
        d: `M 0 0 L ${(count - 1) * opt.interval} 0`,
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

interface Options {
  left?: Node<Node.Properties>
  right?: Node<Node.Properties>
  count?: number
  direction?: 'left' | 'right'
}
export function extendTimeline(timeline: Node<Node.Properties>, options: Options) {
  // 默认值设置
  const count = options.count || 10
  const direction = options.direction || 'right'

  // 获取时间轴的body和bottom
  const body = timeline.getAttrs().body.d as string
  const bodyVector = pathVertor(body)

  const bottom = timeline.getAttrs().bottom.d as string
  const firstBottomVector = pathVertor(bottom, 'first')
  const lastBottomVector = pathVertor(bottom, 'last')

  const interval = getInterval(bottom)

  let newBody = ''
  let newBottom = bottom
  if (direction === 'right') {
    newBody = `M ${bodyVector.x1} ${bodyVector.y1} L ${bodyVector.x2 + count * interval} ${bodyVector.y2}`
    for (let i = 1; i <= count; i++)
      newBottom = `${newBottom}M ${lastBottomVector.x1 + i * interval} ${lastBottomVector.y1} L ${lastBottomVector.x2 + i * interval} ${lastBottomVector.y2}`
  }
  else {
    newBody = `M ${bodyVector.x1 - count * interval} ${bodyVector.y1} L ${bodyVector.x2} ${bodyVector.y2}`
    for (let i = 1; i <= count; i++)
      newBottom = `M ${firstBottomVector.x1 - i * interval} ${firstBottomVector.y1} L ${firstBottomVector.x2 - i * interval} ${firstBottomVector.y2}${newBottom}`
  }

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
  if (options.left && direction !== 'right')
    options.left.position(bodyVector.x1 - count * interval, 0)
  else if (options.right && direction === 'right')
    options.right.position(bodyVector.x2 + count * interval, 0)
  return newTimeline
}

export function cutTimeline(timeline: Node<Node.Properties>, options: Options) {

}

export function getInterval(path: string) {
  const firstVertor = pathVertor(path, 'first')
  const secondVertor = pathVertor(path, 2)
  return (secondVertor.x1 - firstVertor.x1) || 25
}

export function pathVertor(path: string, location: 'first' | 'last' | number = 'first') {
  path = path.trim()
  if (location === 'first') {
    const firstIndexEnd = path.slice(1).indexOf('M') + 1
    if (firstIndexEnd !== 0)
      path = path.slice(0, firstIndexEnd)
  }
  else if (location === 'last') {
    const lastIndexStart = path.lastIndexOf('M')
    path = path.slice(lastIndexStart)
  }
  else if (Number.isInteger(location)) {
    if (location >= 0) {
      let indexStart = 0
      let indexEnd = 0
      for (let i = 0; i < location; i++) {
        path = path.slice(indexEnd)
        indexStart = path.indexOf('M')
        indexEnd = path.slice(indexStart + 1).indexOf('M') + 1
      }
      indexEnd = path.slice(indexStart + 1).indexOf('M') + indexStart + 1
      path = path.slice(indexStart, indexEnd)
    }
    else {
      let indexStart = path.length
      let indexEnd = path.length
      for (let i = 0; i < Math.abs(location) - 1; i++) {
        path = path.slice(0, indexStart)
        indexStart = path.lastIndexOf('M')
        indexEnd = path.slice(0, indexStart).lastIndexOf('M')
      }
      indexEnd = path.slice(0, indexStart).lastIndexOf('M')
      path = path.slice(indexEnd, indexStart)
    }
  }

  path = path.replace('M', ' ').replace('L', ' ').replace(',', ' ')
  const vector = path.split(' ').filter(v => v !== '').map(v => Number(v))
  if (vector.length !== 4)
    throw new Error('pathVertor: path is not a line')
  const [x1, y1, x2, y2] = vector
  return { x1, y1, x2, y2 }
}
