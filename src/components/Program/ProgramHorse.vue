<template>
  <li :class="$style.horseItem">
    <span :class="$style.rank">{{ index + 1 }}</span>
    <span :class="$style.name">{{ horse.name }}</span>
  </li>
</template>

<script setup>
defineProps({
  horse: { type: Object, required: true },
  index: { type: Number, required: true },
})
</script>

<style module>
.horseItem {
  display: flex;
  align-items: center;
  background: #fdfdfd;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 6px 10px;
  margin-bottom: 6px;
  font-size: 0.95rem;
  transition: background 0.2s;
}
.horseItem:hover {
  background: #f5fff5;
}
.rank {
  background-color: #28a745;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  font-size: 0.8rem;
  font-weight: bold;
}
.name {
  flex: 1;
}
</style>
