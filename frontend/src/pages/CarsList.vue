<script>
import CarItem from './CarItem.vue'

export default {
  components: { CarItem },

  props: ['cars'],

  emits: ['update:model-value'],
}
</script>

<template>
  <ul>
    <CarItem
      v-for="car in cars"
      :key="car.id"
      :car="car"
      @delete="$emit('delete', $event)"
      @save="$emit('save', $event)"
    />
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
