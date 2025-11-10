<template>
  <div :class="$style.wrapper">
    <h3 :class="$style.title">Results</h3>
    <div v-if="!results?.length" :class="$style.empty">No results yet.</div>

    <div v-for="result in results" :key="result.round" :class="$style.roundCard">
      <div :class="$style.roundHeader">
        <h4>{{ result.round }}. Round</h4>
        <span>{{ result.distance }}m</span>
      </div>

      <ul :class="$style.horseList">
        <li v-for="(h, i) in result.results" :key="h.id" :class="$style.horseItem">
          <span :class="$style.rank">{{ i + 1 }}</span>
          <span :class="$style.name">{{ h.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const results = computed(() => store.state.results)
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
  @media (max-width: 768px) {
    min-width: 90%;
  }
}

.title {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
  background: linear-gradient(to right, #056105, #28a745);
  color: #fff;
  padding: 12px;
  border-radius: 6px;
  margin: 0 0 16px;
  letter-spacing: 0.5px;
}

.roundCard {
  background: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  margin-bottom: 14px;
  padding: 12px 14px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
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

.empty {
  text-align: center;
  color: #777;
  font-style: italic;
  margin-top: 20px;
}
</style>
