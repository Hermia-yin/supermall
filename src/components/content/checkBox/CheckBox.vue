<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 1px solid #aaa;
  width: 16px;
  height: 16px;
  overflow: hidden;
}

.check {
  background-color: var(--color-high-text);
  border-color: var(--color-high-text);
}
</style>
