<template>
  <div :class="$style.roundCard">
    <div :class="$style.roundHeader">
      <h4>{{ round.round }}. Round</h4>
      <span>{{ round.distance }}m</span>
    </div>

    <ul :class="$style.horseList">
      <ProgramHorse v-for="(h, i) in round.horses" :key="h.id" :horse="h" :index="i" />
    </ul>
  </div>
</template>

<script setup>
import ProgramHorse from './ProgramHorse.vue'
defineProps({
  round: {
    type: Object,
    required: true,
  },
})
</script>

<style module>
.roundCard {
  background: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  margin-bottom: 14px;
  padding: 12px 14px;
  transition: all 0.2s ease;
}
.roundCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
}
.roundHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f1f8f1;
  border-left: 4px solid #28a745;
  padding: 6px 10px;
  border-radius: 4px;
  font-weight: 600;
  margin-bottom: 10px;
}
.horseList {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
