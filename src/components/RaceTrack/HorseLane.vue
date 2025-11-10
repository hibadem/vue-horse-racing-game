<template>
  <div :class="$style.lane">
    <button :class="$style.button" :style="{ backgroundColor: horse.colorCode }">
      {{ index + 1 }}
    </button>
    <div :class="$style.name">{{ horse.name }}</div>
    <img
      :src="horse.isRacing ? horseRun : horseStatic"
      :alt="horse.name"
      :style="{ left: position + '%', filter: horseFilter }"
    />
    <div :class="$style.finishLine" :style="{ left: finishLinePos + '%' }"></div>
  </div>
</template>

<script setup lang="ts">
import horseStatic from '../../assets/horse-2.png'
import horseRun from '../../assets/horse-run.gif'
import { computed, defineProps } from 'vue'

interface Horse {
  id: number
  name: string
  colorCode: string
  isRacing: boolean
}

const props = defineProps<{
  horse: Horse
  index: number
  position: number
  finishLinePos: number
}>()

const horseFilter = computed(
  () => `hue-rotate(120deg) drop-shadow(0 0 6px ${props.horse.colorCode})`,
)
</script>

<style module>
.lane {
  position: relative;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 6px;
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.2) 10px,
    transparent 10px,
    transparent 20px
  );
}
.button {
  width: 36px;
  position: absolute;
  left: -25px;
  top: 10px;
  transform: rotate(270deg);
  color: white;
  border: none;
  padding: 3px;
  font-weight: bold;
  border-radius: 4px;
  z-index: 1;
}
img {
  position: absolute;
  bottom: 0;
  width: 40px;
  height: 40px;
  transition: left 0.3s ease-in-out;
  z-index: 1;
}
.name {
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 2px #000;
  z-index: 2;
}
.finishLine {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
  background: repeating-linear-gradient(45deg, white, white 6px, red 6px, red 12px);
  border-left: 2px solid #fff;
}
</style>
