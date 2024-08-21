import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'; // Importación de tipo

import Home from '@/views/HomeEmployee.vue';
import Search from '@/views/SearchEmployee.vue';

// Definición de rutas con tipado explícito
const routes: Array<RouteRecordRaw> = [
  { 
    path: '/home', 
    component: Home 
  },
  { 
    path: '/search', 
    component: Search 
  },
  { 
    path: '/', 
    redirect: '/home' 
  },
];

// Creación del router con historial web
const router = createRouter({
  history: createWebHistory(),
  routes, // Definición de rutas
});

export default router;