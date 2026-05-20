<template>
  <div class="auth-card">
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
});
</script>

<style scoped>
.auth-card {
  width: 100%;
  max-width: 420px;
  background: var(--color-white);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 18px 45px rgba(47, 52, 55, 0.12);
}

h1 {
  margin: 0 0 8px;
  color: var(--color-text);
  font-size: 28px;
  font-weight: 700;
}

p {
  margin: 0 0 24px;
  color: var(--color-muted);
  font-size: 15px;
  line-height: 1.5;
}
</style>