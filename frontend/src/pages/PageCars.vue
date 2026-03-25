<script>
export default {
  data() {
    return {
      cars: [
        {
          id: 1,
          brand: 'Audi',
          price: 21000,
        },
        {
          id: 2,
          brand: 'Ford',
          price: 33000,
        },
        {
          id: 3,
          brand: 'Fiat',
          price: 42000,
        },
        {
          id: 3,
          brand: 'mazda',
          price: 43000,
        },
      ],
    }
  },
}
</script>

<template>
  <div>
    <h2>Cars</h2>
    <ul>
      <li v-for="car of cars" :key="car.id">
        <input :value="car.brand" />
        <input :value="car.price" />
        <button>del</button>
        <button>upd</button>
      </li>
    </ul>
    <!-- <form action="">
      <input :value="car.brand" />
      <input :value="car.price" />
      <input type="submit" />
    </form> -->
  </div>
</template>
