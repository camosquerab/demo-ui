<template>
  <v-app>
    <Navbar />

    <v-main class="px-8 mt-8 main-body">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Navbar from './components/EmployeeNavbar.vue';
</script>

<style scoped>
.main-body {
  max-width: 1200px;
  min-width: 1000px;
  margin: 0 auto;
}
</style>