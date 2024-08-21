<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Navbar from './components/EmployeeNavbar.vue';
</script>

<style scoped>
</style>