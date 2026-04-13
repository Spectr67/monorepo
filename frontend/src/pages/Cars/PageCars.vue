<script>
import InputForm from '@/components/InputForm.vue'
import { postItem, loadCars } from '../../api/carsApi'
import CarsList from './CarsList.vue'

export default {
  components: { InputForm, CarsList },

  data() {
    return {
      cars: [],
    }
  },

  async created() {
    this.cars = await loadCars()
  },

  methods: {
    async postCar(dto) {
      const added = await postItem(dto)
      this.cars = [...this.cars, added]
    },
  },
}
</script>

<template>
  <h2>Cars</h2>

  <InputForm @post="postCar" />

  <CarsList v-model="cars" />
</template>
