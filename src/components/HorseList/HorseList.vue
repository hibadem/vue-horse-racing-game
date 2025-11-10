<template>
  <div :class="$style.list">
    <h2 :class="$style.title">Horse List (1 - 20)</h2>

    <div :class="$style.tableWrapper">
      <table :class="$style.table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <HorseRow
            v-for="(horse, index) in horses"
            :key="horse.id"
            :index="index"
            :horse="horse"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import HorseRow from './HorseRow.vue'

const store = useStore()
const horses = computed(() => store.state.horses)
</script>

<style module>
.list {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

.tableWrapper {
  overflow-x: auto;
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
  letter-spacing: 0.5px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;
}

th {
  background-color: #e7f3e7;
  padding: 8px;
  border-bottom: 2px solid #ccc;
  font-weight: 600;
  color: #333;
}

tr:nth-child(even) {
  background-color: #fafafa;
}

tr:hover {
  background-color: #f0f8f0;
  transition: background-color 0.2s ease;
}
</style>
