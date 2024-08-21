import { createApp } from 'vue';
import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Router
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomeEmployee.vue';
import SearchEmployee from './views/SearchEmployee.vue';

const vuetify = createVuetify({
  components,
  directives,
});

const routes = [
  { path: '/home', component: Home },
  { path: '/search', component: SearchEmployee },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount('#app');