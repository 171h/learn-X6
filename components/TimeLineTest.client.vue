<script setup lang="ts">
import { Timeline } from '@knight-lab/timelinejs'
import '@knight-lab/timelinejs/dist/css/timeline.css'
import { data, options } from '~/data/timeline'

// const slides = ref<TimelineJSSlide[]>(data)
const timelineEmbed = ref<HTMLElement | null>(null)
const timelineInstance = ref<Timeline | null>(null)
onNuxtReady(() => {
  timelineInstance.value = new Timeline('timeline-embed', data, options)
})
</script>

<template>
  <div id="timeline-embed" ref="timelineEmbed" />
</template>

<style>

</style>
