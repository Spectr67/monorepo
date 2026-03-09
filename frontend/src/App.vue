<script>
export default {
  data() {
    return {
      text: '',
    }
  },

  created() {
    this.loadHello()
  },

  methods: {
    async loadHello() {
      const resp = await fetch('http://localhost:3000/api/v0/hello')
      const data = await resp.text()
      this.text = data.toUpperCase()
    },
  },
}
</script>

<template>
  <h1>You did it!</h1>
  <h2>{{ text }}</h2>
  <button @click="loadHello">Load Hello</button>
</template>
