<script>
export default {}
</script>

<template>
  <div>
    <h1>App</h1>
    <ul>
      <li>
        <RouterLink to="/">maian</RouterLink>
      </li>
      <li>
        <RouterLink to="/cars">cars</RouterLink>
      </li>
    </ul>
    <RouterView />
  </div>
</template>
