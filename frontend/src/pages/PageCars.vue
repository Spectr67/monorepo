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
      const data = await loadCars()

      this.cars = data.map(car => ({
        ...car,
        isEditing: false,
      }))
    },

    async postCar(dto) {
      const addedCar = await postItem(dto)

      this.cars.push({
        ...addedCar,
        isEditing: false,
      })
    },

    async deleteCar(id) {
      await deleteCar(id)
      this.cars = this.cars.filter(car => car.id !== id)
    },

    editCar(car) {
      car.isEditing = true
    },

    cancelEdit(car) {
      car.isEditing = false
    },

    async saveCar(car) {
      const updated = await updateCar(car.id, {
        brand: car.brand,
        price: car.price,
      })

      car.brand = updated.brand
      car.price = updated.price
      car.isEditing = false
    },
  },
}
</script>

<template>
  <h2>Cars</h2>

  <div class="add-car">
    <InputForm @post="postCar" />
  </div>

  <ul>
    <CarsList
      :cars="cars"
      @delete="deleteCar"
      @edit="editCar"
      @save="saveCar"
      @cancel="cancelEdit"
    />
  </ul>
</template>
<style scoped>
h2 {
  margin-bottom: 1rem;
  font-family: Arial, sans-serif;
}

.add-car {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-car button {
  padding: 0.3rem 0.8rem;
}
</style>
