<!-- eslint-disable no-console -->
<script lang="ts">
import { Node } from '@antv/x6'

const getNode = inject('getNode', () => Node)
const percentage = ref(80)

onNuxtReady(() => {
  const node = getNode()
  console.log(node)
})
</script>

<template>
  <el-progress type="dashboard" :percentage="percentage" :width="80">
    <template #default="{ percentage }">
      <span class="percentage-value">{{ percentage }}%</span>
    </template>
  </el-progress>
</template>
