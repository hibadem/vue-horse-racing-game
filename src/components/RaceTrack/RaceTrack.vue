<template>
  <div :class="$style.track" :style="{ width: trackWidth + 'px' }">
    <HorseLane
      v-for="(horse, index) in currentHorses"
      :key="horse.id"
      :horse="horse"
      :index="index"
      :position="positions[index]"
      :finishLinePos="finishLinePos"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import HorseLane from './HorseLane.vue'

const store = useStore()

const currentRound = computed(() => store.getters['raceSchedule']?.[store.state.currentRound])
const currentHorses = computed(() => currentRound.value?.horses || [])
const positions = computed(() => store.state.positions || [])

const trackWidth = computed(() => {
  const distance = currentRound.value?.distance || 1200
  return Math.min(1200, distance * 0.5)
})

const finishLinePos = 100
</script>

<style module>
.track {
  position: relative;
  background: linear-gradient(to bottom, #4caf50 0%, #3e8e41 100%);
  padding: 30px 24px;
  border-radius: 12px;
  margin: 20px auto;
  box-shadow: inset 0 0 0 2px #2e7d32;
}
</style>
