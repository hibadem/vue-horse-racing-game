<template>
  <div :class="$style.container">
    <Header />
    <RaceTrack />

    <div :class="$style.main">
      <HorseList />
      <Program />
      <Results />
    </div>
    <Modal />
  </div>
</template>

<script setup>
import HorseList from './components/HorseList/HorseList.vue'
import RaceTrack from './components/RaceTrack/RaceTrack.vue'
import Program from './components/Program/Program.vue'
import Results from './components/Results/Results.vue'
import Header from './components/Header/Header.vue'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Modal from './components/UI/Modal.vue'

const store = useStore()

onMounted(() => {
  store.commit('resetSchedule')
  store.commit('generateHorses')
})
</script>

<style module>
.container {
  width: 100%;
  max-width: 100%;
}
.main {
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  gap: 8px;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
