<script>
export default {}
</script>

<template>
  <div class="app-container">
    <nav class="navbar">
      <h1 class="logo">App</h1>
      <ul class="nav-links">
        <li><RouterLink to="/" class="nav-item">main</RouterLink></li>
        <li><RouterLink to="/cars" class="nav-item">cars</RouterLink></li>
        <li><RouterLink to="/chart" class="nav-item">chart</RouterLink></li>
        <li><RouterLink to="/coins" class="nav-item">coins</RouterLink></li>
        <li><RouterLink to="/bitcoin" class="nav-item">bitcoin</RouterLink></li>
        <li>
          <RouterLink to="/pageCharts" class="nav-item">charts</RouterLink>
        </li>
      </ul>
    </nav>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style>
html {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #121212;
  color: white;
  margin: 0;
}

.navbar {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1e1e1e;
  border-bottom: 1px solid #333;
}

.logo {
  margin: 0;
  margin-right: 2rem;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.5rem;
}

.nav-item {
  text-decoration: none;
  color: #bbb;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-item:hover {
  color: #fbca03;
}

.router-link-active {
  color: #fbca03;
  border-bottom: 2px solid #fbca03;
}

.content {
  padding: 20px;
}

button {
  padding: 0.3rem 0.8rem;
  cursor: pointer;
}
</style>
