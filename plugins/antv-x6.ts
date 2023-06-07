import type { Graph } from '@antv/x6'

declare global {
  interface Window {
    __x6_instances__: Graph[]
  }
}

export default defineNuxtPlugin((nuxtApp) => {
})
