import type { Markup, Node } from '@antv/x6'

export const task = {
  name: 'task',
  entity: {
    inherit: 'rect',
    height: 25,
    markup: [
      {
        tagName: 'rect',
        selector: 'mid',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    // attrs: 必须写在 markup 外部通过选择器设置样式
    attrs: {
      mid: {
        fill: '#8abbed',
        stroke: 'transparent',
        strokeWidth: 0,
        refWidth: '100%',
        refHeight: '50%',
        rx: 0,
        ry: 0,
      },
    },
  },
  inherit: true,
}

export const verLine = {
  name: 'ver-line',
  entity: {
    inherit: 'path',
    markup: [
      {
        tagName: 'rect',
        selector: 'mid',
      },
      {
        tagName: 'path',
        selector: 'body',
      },
    ],
    attrs: {
      mid: {
        fill: '#8abbed',
        stroke: 'transparent',
        strokeWidth: 0,
        refWidth: '100%',
        refHeight: '50%',
        rx: 0,
        ry: 0,
      },
      body: {
        stroke: '#ccc',
        strokeWidth: 5,
        d: 'M 0 0 L 0 100%',
        refX: '50%',
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
