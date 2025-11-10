<template>
  <button
    :class="[$style.button, { [$style.disabled]: disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: Boolean,
})
</script>

<style module>
.button {
  padding: 12px 24px;
  border: none;
  background: white;
  color: black;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 16px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
}
.button:hover:not(.disabled) {
  background: #0e7210;
  color: white;
}
.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
