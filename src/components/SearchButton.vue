<template>
  <button :disabled="isDisabled" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
  button {
      min-width: 46px;
      min-height: 46px;
      max-height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--border-radius);
      border-color: #c8d8e7;
      margin-left: 12px;
      box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6), 2px 2px 12px #c8d8e7;
      cursor: pointer;
  }
</style>