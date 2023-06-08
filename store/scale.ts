import { defineStore } from 'pinia'

export const useScaleStore = defineStore({
  id: 'scaleStore',
  state: () => ({ sx: 1, minSx: 0.1, maxSx: 10 }),
  actions: {
    scale(sx: number) {
      this.scaleTo(this.sx - sx)
    },
    scaleTo(sx: number) {
      this.sx = this.tryScale(sx)
    },
    tryScale(sx: number) {
      if (sx < this.minSx)
        return this.minSx
      else if (sx > this.maxSx)
        return this.maxSx
      return sx
    },
  },
})
