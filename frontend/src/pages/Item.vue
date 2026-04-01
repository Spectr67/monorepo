<script>
export default {
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

<template></template>
