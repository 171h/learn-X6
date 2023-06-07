<script setup lang="ts">
import { Timeline } from '@knight-lab/timelinejs'
import { Data } from '~/types/index'
import '@knight-lab/timelinejs/dist/css/timeline.css'
import { data } from '~/data/timeline'

// const slides = ref<TimelineJSSlide[]>(data)
const timelineEmbed = ref<HTMLElement | null>(null)
const timelineInstance = ref<Timeline | null>(null)
useNuxtApp().hook('app:mounted', () => {
  timelineInstance.value = new Timeline('timeline-embed', data)
})
</script>

<template>
  <div id="timeline-embed" ref="timelineEmbed" />
</template>

<style>

</style>
