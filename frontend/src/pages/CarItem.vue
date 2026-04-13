<script>
import { deleteCar, updateCar } from '../carsApi'

export default {
  props: ['car', 'cars'],
  emits: ['update:cars'],

  data() {
    return {
      isEditing: false,
      localCar: this.initCar(),
    }
  },

  methods: {
    initCar() {
      return { ...this.car }
    },

    async handleDelete() {
      await deleteCar(this.car.id)

      const updated = this.cars.filter(c => c.id !== this.car.id)
      this.$emit('update:cars', updated)
    },

    async handleSave() {
      const updatedCar = await updateCar(this.car.id, {
        brand: this.localCar.brand,
        price: this.localCar.price,
      })

      const updated = this.cars.map(c =>
        c.id === updatedCar.id ? updatedCar : c,
      )

      this.$emit('update:cars', updated)
      this.isEditing = false
    },

    cancelEdit() {
      this.isEditing = false
      this.localCar = this.initCar()
    },
  },

  watch: {
    car: {
      handler() {
        this.localCar = this.initCar()
      },
      deep: true,
    },
  },
}
</script>

<template>
  <li>
    <div>
      <div v-if="!isEditing">
        <b>{{ car.brand }}</b>
        <b>{{ car.price }}</b>
      </div>

      <div v-else>
        <input v-model="localCar.brand" placeholder="Brand" />
        <input
          v-model.number="localCar.price"
          type="number"
          placeholder="Price"
        />
      </div>
    </div>

    <div>
      <button v-if="!isEditing" @click="isEditing = true">Edit</button>
      <button v-if="!isEditing" @click="handleDelete">Delete</button>

      <button v-if="isEditing" @click="handleSave">Save</button>
      <button v-if="isEditing" @click="cancelEdit">Cancel</button>
    </div>
  </li>
</template>
<style scoped>
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
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}
input {
  padding: 0.3rem 0.5rem;
}
b {
  padding: 15px;
}
</style>
