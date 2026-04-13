<script>
export default {}
</script>

<template>
  <div>
    <h1>App</h1>
    <ul>
      <li>
        <RouterLink to="/">main</RouterLink>
      </li>
      <li>
        <RouterLink to="/cars">cars</RouterLink>
      </li>
      <li>
        <RouterLink to="/Bybit">Bybit</RouterLink>
      </li>
      <li>
        <RouterLink to="/Mexc">Mexc</RouterLink>
      </li>
    </ul>
    <RouterView />
  </div>
</template>

<style>
html {
  font-family: Arial, Helvetica, sans-serif;
}

button {
  padding: 0.3rem 0.8rem;
}
</style>
