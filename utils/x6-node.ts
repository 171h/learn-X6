import type { Node } from '@antv/x6'

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

export const tlConfig = {
  w: 25,
  h: 15,
}
export const tlBot = {
  name: 'tl-bot',
  entity: {
    inherit: 'rect',
    width: tlConfig.w,
    height: tlConfig.h,
    markup: [
      {
        tagName: 'polyline',
        selector: 'body',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        stroke: '#ccc',
        strokeWidth: 1,
        fill: 'transparent',
        points: '0,0 0,15 25,15',
      },
    },
  },
  inherit: true,
}
export const tlTop = {
  name: 'tl-top',
  entity: {
    inherit: 'rect',
    width: tlConfig.w,
    height: tlConfig.h,
    markup: [
      {
        tagName: 'polyline',
        selector: 'body',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        stroke: '#ccc',
        strokeWidth: 1,
        fill: 'transparent',
        points: '0,0 0,15',
      },
      text: {
        refX: 0,
        refY: 0.5,
        textAnchor: 'start',
      },
    },
  },
  inherit: true,
}

type CustomNode = Node.Definition | (Node.Config & {
  inherit?: string | Node.Definition | undefined
})
