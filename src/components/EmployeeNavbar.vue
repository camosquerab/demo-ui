<template>
    <v-app-bar app>
      <v-toolbar-title>DC Latam</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="goToHome()">Inicio</v-btn>
      <v-btn @click="goToSearch()">Buscar</v-btn>
    </v-app-bar>
  </template>
  
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function goToHome() {
    router.push('/home');
  }

  function goToSearch() {
    router.push('/search');
  }
  </script>
  
  <style scoped>
  </style>