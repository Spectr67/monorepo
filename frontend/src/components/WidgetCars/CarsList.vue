<script>
import CarItem from './CarItem.vue'

export default {
  components: { CarItem },

  props: ['modelValue'],
  emits: ['update:modelValue'],
}
</script>

<template>
  <ul>
    <CarItem
      v-for="car in modelValue"
      :key="car.id"
      :car="car"
      :cars="modelValue"
      @update:cars="$emit('update:modelValue', $event)"
    />
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
