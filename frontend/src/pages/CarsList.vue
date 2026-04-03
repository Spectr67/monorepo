<script>
import CarItem from './CarItem.vue'

export default {
  components: { CarItem },
  props: ['cars'],
  emits: ['delete', 'edit', 'save', 'cancel'],
}
</script>

<template>
  <CarItem
    v-for="car in cars"
    :key="car.id"
    :car="car"
    @delete="$emit('delete', $event)"
    @edit="$emit('edit', $event)"
    @save="$emit('save', $event)"
    @cancel="$emit('cancel', $event)"
  />
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
