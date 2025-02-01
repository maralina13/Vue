<template>
  <div id="app">
    <nav>
      <router-link to="/">Трекер задач</router-link>
      <router-link to="/habits">Трекер привычек</router-link>
      <router-link to="/wishlist">Список желаний</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
#app {
  width: 90%;
  max-width: 800px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
}

nav {
  font-size: 1.5rem;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

nav a:hover {
  background-color: #42b983;
  color: white;
}

nav a.router-link-exact-active {
  color: #42b983;
  background-color: #e8f5e9;
}
</style>