import type { Graph } from '@antv/x6'
import '~/assets/css/x6.css'

declare global {
  interface Window {
    __x6_instances__: Graph[]
  }
}

export default defineNuxtPlugin((nuxtApp) => {
})
