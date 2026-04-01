<script>
import Item from './Item.vue'

export default {
  components: { Item },
  },
  methods: {
  },
}
</script>

<template>
  <Item v-for="car in cars" :key="car.id"></Item>
</template>
