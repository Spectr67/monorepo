<script>
export default {
  emits: ['post'],

  data() {
    return {
      brand: '',
      price: '',
    }
  },
  methods: {
    submitForm() {
      this.$emit('post', {
        brand: this.brand,
        price: this.price,
      })
      this.brand = ''
      this.price = ''
    },
  },
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <input v-model="brand" placeholder="Brand" />
    <input v-model="price" placeholder="Price" type="text" />
    <button type="submit">Submit</button>
  </form>
</template>
