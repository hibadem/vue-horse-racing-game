<template>
  <div :class="$style.wrapper">
    <h3 :class="$style.title">Race Program</h3>
    <div v-if="!schedule?.length" :class="$style.empty">No scheduled races yet.</div>
    <ProgramRound v-for="round in schedule" :key="round.round" :round="round" />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import ProgramRound from './ProgramRound.vue'

const store = useStore()
const schedule = computed(() => store.getters.raceSchedule)
</script>

<style module>
.wrapper {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin: 0 auto;
  min-width: 350px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 650px;
}
.title {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
  background: linear-gradient(to right, #056105, #28a745);
  color: #fff;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
  margin-top: 0;
}
.empty {
  text-align: center;
  color: #777;
  font-style: italic;
  margin-top: 20px;
}
</style>
