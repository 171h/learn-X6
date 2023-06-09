export const data = {
  nodes: [
    {
      id: 'node0',
      shape: 'rect',
      x: 0,
      y: 0,
      width: 100,
      height: 40,
      label: '左上角为原点',
      attrs: {
        body: {
          stroke: '#000',
          strokeWidth: 1,
        },
      },
    },
    {
      id: 'node02',
      shape: 'rect',
      x: 0,
      y: -40,
      width: 100,
      height: 40,
      label: '左下角为原点',
      attrs: {
        body: {
          stroke: '#000',
          strokeWidth: 1,
        },
      },
    },
    {
      id: 'node1',
      shape: 'rect',
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: 'hello',
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: 'node2',
      shape: 'rect',
      x: 160,
      y: 180,
      width: 100,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    },
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
  ],
}
