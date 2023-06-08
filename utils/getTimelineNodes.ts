import type { Node } from '@antv/x6'

/**
 * @description 时间轴节点级别
 */
interface Level {
  botUnit: Unit
  botDur: number
  botCount: number
  midUnit: Unit
  midDur: number
  midCount: number | null
  topUnit: Unit
  topDur: number
  topCount: number | null
}

/**
 * @description 时间单位
 * 分别对应：分、时、天、周、月、季、半年、年
 */
type Unit = 'm' | 'h' | 'd' | 'w' | 'M' | 'q' | 'H' | 'y'

const levels: Record<string, Level> = {
  level1: {
    botUnit: 'm',
    botDur: 15,
    botCount: 1,
    midUnit: 'h',
    midDur: 1,
    midCount: 4,
    topUnit: 'd',
    topDur: 1,
    topCount: 24,
  },
  level2: {
    botUnit: 'h',
    botDur: 2,
    botCount: 1,
    midUnit: 'd',
    midDur: 1,
    midCount: 12,
    topUnit: 'w',
    topDur: 1,
    topCount: 84,
  },
  level3: {
    botUnit: 'h',
    botDur: 6,
    botCount: 1,
    midUnit: 'd',
    midDur: 1,
    midCount: 4,
    topUnit: 'w',
    topDur: 1,
    topCount: 28,
  },
  level4: {
    botUnit: 'd',
    botDur: 1,
    botCount: 1,
    midUnit: 'w',
    midDur: 1,
    midCount: 7,
    topUnit: 'm',
    topDur: 1,
    topCount: null,
  },
  level5: {
    botUnit: 'd',
    botDur: 3,
    botCount: 1,
    midUnit: 'm',
    midDur: 1,
    midCount: null,
    topUnit: 'q',
    topDur: 1,
    topCount: null,
  },
  level6: {
    botUnit: 'w',
    botDur: 1,
    botCount: 1,
    midUnit: 'm',
    midDur: 1,
    midCount: null,
    topUnit: 'y',
    topDur: 1,
    topCount: 12,
  },
  level7: {
    botUnit: 'm',
    botDur: 1,
    botCount: 1,
    midUnit: 'q',
    midDur: 1,
    midCount: 3,
    topUnit: 'y',
    topDur: 1,
    topCount: 4,
  },
  level8: {
    botUnit: 'm',
    botDur: 6,
    botCount: 1,
    midUnit: 'y',
    midDur: 1,
    midCount: 12,
    topUnit: 'y',
    topDur: 1,
    topCount: 12,
  },
  level9: {
    botUnit: 'q',
    botDur: 1,
    botCount: 1,
    midUnit: 'y',
    midDur: 1,
    midCount: 4,
    topUnit: 'y',
    topDur: 5,
    topCount: 20,
  },
  level10: {
    botUnit: 'H',
    botDur: 1,
    botCount: 1,
    midUnit: 'y',
    midDur: 1,
    midCount: 2,
    topUnit: 'y',
    topDur: 10,
    topCount: 20,
  },
}

/**
 * Timeline 级别
 * 1. 最细级别
 * bot: 15min mid: 1h top: 1d
 * @returns
 */
export function timelineNodes(level: number, start: Date, end: Date) {
  const nodes: Node.Metadata[] = []
  // 底部
  for (let i = 0; i < 100; i++) {
    const node = {
      id: `tl-bot-${i}`,
      shape: tlBot.name,
      x: i * tlBot.entity.width,
      y: -tlBot.entity.height,
      label: `${i * 15 % 60}`,
    }
    nodes.push(node)
  }
  // 中部
  for (let i = 0; i < 25; i++) {
    const node = {
      id: `tl-mid-${i}`,
      shape: tlTop.name,
      x: i * tlTop.entity.width * 4,
      y: -tlTop.entity.height * 2,
      label: `${i % 24}`,
    }
    nodes.push(node)
  }
  // 顶部
  for (let i = 0; i < 10; i++) {
    const node = {
      id: `tl-top-${i}`,
      shape: tlTop.name,
      x: i * tlTop.entity.width * 24,
      y: -tlTop.entity.height * 3,
      label: `${i}`,
    }
    nodes.push(node)
  }
  return nodes
}

function layerNodes(start: Date, end: Date, unit: string, dur: number, count: number, layer: 'bot' | 'mid' | 'top') {
  const y = 0
}

/**
 * 获取每个单元格的时间长度
 * @param unit // 时间单位
 * @param dur // 时间长度
 * @returns // 每个单元格的时间长度, 单位: ms
 */
function getTimeLongPerCell(dur: number, unit: Unit) {
  const timeLongPerCell = 0
  return timeLongPerCell
}

export function timelineLevel1(level: Level, start: Date, end: Date) {
  const nodes: Node.Metadata[] = []
  const botTimeLongPerNode = level.botDur * 60 * 1000

  let startTime = start.getTime()
  startTime = startTime - startTime % (level.botDur * 60 * 1000)
  const endTime = end.getTime()
  const duration = endTime - startTime
  const botCount = Math.ceil(duration / (level.botDur * 60 * 1000))

  // for (let i = 0; i < botCount; i++) {
  //   const time = startTime + i * level.botDur * 60 * 1000
  //   const node = {
  //     id: `tl-bot-${i}`,
  //     shape: tlBot.name,
  //     x: i * tlBot.entity.width,
  //     y: -tlBot.entity.height,
  //     label: `${i * 15 % 60}`,
  //   }
  //   nodes.push(node)
  // }
  return nodes
}
