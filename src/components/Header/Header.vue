<template>
  <div :class="$style.wrapper">
    <h1 :class="$style.title">🏇 Horse Racing</h1>
    <div :class="$style.buttonWrapper">
      <Button :disabled="isRunning" @click="generateProgram"> GENERATE PROGRAM </Button>
      <Button :disabled="isRunning" @click="toggleRace">
        {{ isRunning ? 'RACING' : 'START' }}
      </Button>
    </div>
  </div>
</template>

<script setup>
import Button from '../UI/Button.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const isRunning = computed(() => store.state.isRunning)
const isProgramVisible = computed(() => store.state.isProgramVisible)
const results = computed(() => store.state.results)
const generateProgram = () => {
  store.dispatch('generateProgram')
}

const toggleRace = () => {
  store.dispatch('toggleRace')
}
</script>

<style module>
.wrapper {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  background: url('https://thumb.photo-ac.com/1e/1ede0eb3f0b438b3b4361f534283fe64_t.jpeg');
  padding: 10px;
  @media (max-width: 768px) {
    display: block;
  }
}
.wrapper *,
.wrapper *::before,
.wrapper *::after {
  box-sizing: inherit;
}
.title {
  color: white;
}
.buttonWrapper {
  display: flex;
  align-items: center;
}
.button {
  padding: 12px 24px;
  border: none;
  background: white;
  color: black;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 16px;
  font-weight: 600;
}
button:hover {
  background: #0e7210;
  color: white;
}
</style>
