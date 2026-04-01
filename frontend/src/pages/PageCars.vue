<script>
import InputForm from './InputForm.vue'
import { postItem } from '@/API'
export default {
  components: { InputForm },
  data() {
    return {
      text: '',
      cars: [],
    }
  },

  created() {
    this.loadCars()
  },

  methods: {
    async loadCars() {
      const resp = await fetch('http://localhost:3000/api/v0/cars')
      this.cars = await resp.json()
    },
    async deleteCar(id) {
      const resp = await fetch(`http://localhost:3000/api/v0/cars/${id}`, {
        method: 'DELETE',
      })
      this.loadCars()
    },
    async postCar(dto) {
      const addedCar = await postItem(dto, 'cars')
      this.cars.push(addedCar)
    },
    editCar(car) {
      car.isEditing = true
    },
    cancelEdit(car) {
      car.isEditing = false
      car.tempBrand = car.brand
      car.tempPrice = car.price
    },
    async saveCar(car) {
      const resp = await fetch(`http://localhost:3000/api/v0/cars/${car.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: car.tempBrand, price: car.tempPrice }),
      })
      const updated = await resp.json()
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
    <li v-for="car in cars" :key="car.id">
      <div class="car-left">
        <div v-if="!car.isEditing">
          <b>{{ car.brand }}</b>
          <b>{{ car.price }}</b>
        </div>
        <div v-else class="car-edit">
          <input v-model="car.tempBrand" placeholder="Brand" />
          <input v-model="car.tempPrice" type="number" placeholder="Price" />
        </div>
      </div>

      <div class="car-right actions">
        <button v-if="!car.isEditing" @click="editCar(car)">Edit</button>
        <button v-if="!car.isEditing" @click="deleteCar(car.id)">Delete</button>
        <button v-if="car.isEditing" @click="saveCar(car)">Save</button>
        <button v-if="car.isEditing" @click="cancelEdit(car)">Cancel</button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
b {
  padding: 15px;
}
h2 {
  margin-bottom: 1rem;
  font-family: Arial, sans-serif;
}

.add-car {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-car input {
  padding: 0.3rem 0.5rem;
}

.add-car button {
  padding: 0.3rem 0.8rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.car-left {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.car-edit input {
  margin-right: 0.5rem;
  padding: 0.2rem 0.4rem;
}

.car-right button {
  margin-left: 0.3rem;
  padding: 0.2rem 0.5rem;
}
</style>
