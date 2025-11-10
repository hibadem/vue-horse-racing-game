<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ horse.name }}</td>
    <td>{{ horse.condition }}</td>
    <td>
      <div :class="$style.colorCell">
        <span :style="{ backgroundColor: horse.colorCode }" :class="$style.colorBox"></span>
        {{ horse.color }}
      </div>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  index: Number,
  horse: Object,
})
</script>

<style module>
.colorCell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: left;
}

.colorBox {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid #888;
}
td {
  text-align: center;
}
</style>
