<template>
  <div class="modal" :class="{ 'is-active' : isActive }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      isActive: {
        type: Boolean,
        default: false
      }
    }
  }
</script>