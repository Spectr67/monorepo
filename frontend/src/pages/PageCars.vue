<script>
import InputForm from '../components/InputForm.vue'
import CarsList from './CarsList.vue'
import { postItem, loadCars, deleteCar, updateCar } from '../carsApi'

export default {
  components: { InputForm, CarsList },

  data() {
    return {
      cars: [],
    }
  },

  async created() {
    await this.loadCars()
  },

  methods: {
    async loadCars() {
      this.cars = await loadCars()
    },

    async postCar(dto) {
      const addedCar = await postItem(dto)
      this.cars.push(addedCar)
    },

    async deleteCar(id) {
      await deleteCar(id)
      this.cars = this.cars.filter(car => car.id !== id)
    },

    async saveCar(car) {
      const updated = await updateCar(car.id, {
        brand: car.brand,
        price: car.price,
      })

      car.brand = updated.brand
      car.price = updated.price
    },
  },
}
</script>

<template>
  <h2>Cars</h2>

  <InputForm @post="postCar" />

  <CarsList :cars="cars" @update:model-value="cars = $event" />
</template>
