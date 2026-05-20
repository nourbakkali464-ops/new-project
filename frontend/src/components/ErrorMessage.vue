<template>
  <p v-if="message" class="error-message">
    {{ message }}
  </p>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.error-message {
  margin: 0 0 14px;
  color: #b42318;
  font-size: 13px;
  font-weight: 500;
}
</style>