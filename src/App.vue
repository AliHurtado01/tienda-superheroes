<!-- src/App.vue -->
<template>
  <NavBar />
  <main class="main-container">
    <RouterView />
  </main>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5;
  color: #333;
}

.main-container {
  width: 90%;
  max-width: 1400px;
  margin: 30px auto;
}
</style>