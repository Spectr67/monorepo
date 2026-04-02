Полный исправленный CarItem.vue
<script>
export default {
  props: ['car'],
  emits: ['delete', 'edit', 'save', 'cancel'],
}
</script>

<template>
  <li>
    <div class="car-left">
      <div v-if="!car.isEditing">
        <b>{{ car.brand }}</b>
        <b>{{ car.price }}</b>
      </div>

      <div v-else class="car-edit">
        <input v-model="car.brand" placeholder="Brand" />
        <input v-model="car.price" type="number" placeholder="Price" />
      </div>
    </div>

    <div class="car-right actions">
      <button v-if="!car.isEditing" @click="$emit('edit', car)">Edit</button>
      <button v-if="!car.isEditing" @click="$emit('delete', car.id)">
        Delete
      </button>

      <button v-if="car.isEditing" @click="$emit('save', car)">Save</button>
      <button v-if="car.isEditing" @click="$emit('cancel', car)">Cancel</button>
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
