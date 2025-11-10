<template>
  <transition name="fade">
    <div v-if="modalState.visible" class="modal-overlay" @click.self="close">
      <transition name="scale">
        <div class="modal-content">
          <button class="modal-close" @click="close">×</button>
          <h2 class="modal-title">{{ modalState.content.title }}</h2>

          <div class="modal-body">
            <p>{{ modalState.content.desc }}</p>
          </div>

          <div class="modal-footer">
            <Button @click="close">CLOSE</Button>
            <Button @click="openProgram">GENERATE PROGRAM</Button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import Button from './Button.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const modalState = computed(() => store.getters.modalState)

const close = () => {
  store.commit('toggleModal', { visible: false })
}

const openProgram = () => {
  store.commit('toggleModal', { visible: false })
  store.commit('generateSchedule')
  store.commit('toggleProgramVisibility', true)
}

const props = defineProps({
  visible: { type: Boolean, required: true },
  title: { type: String, default: '' },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active {
  animation: scaleIn 0.3s ease;
}
.scale-leave-active {
  animation: scaleOut 0.2s ease forwards;
}

@keyframes scaleIn {
  0% {
    transform: scale(0.85);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes scaleOut {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0;
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 15, 15, 0.5);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 20px;
}

.modal-content {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  width: 420px;
  max-width: 90%;
  color: #f0f0f0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
  padding: 24px 28px;
  animation: floatUp 0.3s ease;
}

@keyframes floatUp {
  from {
    transform: translateY(15px);
    opacity: 0.8;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-title {
  text-align: center;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
  background: linear-gradient(to right, #56ab2f, #a8e063);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.modal-body {
  font-size: 0.97rem;
  line-height: 1.6;
  color: #e2e2e2;
  text-align: center;
}

.modal-footer {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 14px;
  background: rgba(255, 255, 255, 0.1);
  color: #f0f0f0;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.modal-close:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: rotate(90deg);
}

@media (max-width: 500px) {
  .modal-content {
    width: 95%;
    padding: 20px;
  }
  .modal-title {
    font-size: 1.2rem;
  }
}
</style>
