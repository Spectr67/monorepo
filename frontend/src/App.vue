<script>
export default {
  data() {
    return {
      text: '',
      cars: [],
    }
  },

  created() {
    this.loadHello()
    this.loadCars()
  },

  methods: {
    async loadHello() {
      const resp = await fetch('http://localhost:3000/api/v0/hello')
      const data = await resp.text()
      this.text = data.toUpperCase()
    },
    async loadCars() {
      const resp = await fetch('http://localhost:3000/api/v0/cars')
      this.cars = await resp.json()
    },
  },
}
</script>

<template>
  <h1>You did it!</h1>
  <h2>{{ text }}</h2>
  <button @click="loadHello">Load Hello</button>
  <button @click="loadCars">Load Cars</button>
  <ul>
    <li v-for="car of cars" :key="car.id">
      <b>{{ car.brand }}</b> <i>{{ car.price }}</i>
    </li>
  </ul>
</template>
