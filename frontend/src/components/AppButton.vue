<template>
  <button class="app-button" :class="variant">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
  },
});
</script>

<style scoped>
.app-button {
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 13px 18px;
  font-family: var(--font-main);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.secondary {
  background: var(--color-secondary);
  color: var(--color-text);
}

.success {
  background: var(--color-success);
  color: var(--color-white);
}

.app-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>