import type { Node } from '@antv/x6'

export const customNode = {
  name: 'custom-node',
  entity: {
    inherit: 'rect',
    width: 100,
    height: 40,
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'image',
        selector: 'img',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        stroke: '#8f8f8f',
        strokeWidth: 1,
        fill: '#fff',
        rx: 6,
        ry: 6,
      },
      img: {
        'xlink:href':
          'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
        'width': 16,
        'height': 16,
        'x': 12,
        'y': 12,
      },
    },
  },
  inherit: true,
}

export const workNode = {
  name: 'work-node',
  entity: {
    inherit: 'rect',
    width: 100,
    height: 40,
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        stroke: 'transparent',
        fill: '#155abf',
      },
    },
  },
  inherit: true,
}

type CustomNode = Node.Definition | (Node.Config & {
  inherit?: string | Node.Definition | undefined
})
