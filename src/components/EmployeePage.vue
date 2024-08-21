<template>
    <div class="employee-page">
      <h1>Employee Search</h1>
      
      <v-text-field
        label="Employee ID"
        v-model="employeeId"
        :rules="inputRules"
      ></v-text-field>
      <br>
      <v-btn variant="outlined" :loading="loading" @click="searchEmployee">Search Employees</v-btn>
      
      <template v-if="items.length !== 0">
        <hr class="my-8">
        <v-data-table
          :headers="headers"
          :items="items"
          height="400"
        ></v-data-table>
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  export interface Employee {
    id: number;
    employeeName: string;
    employeeSalary: number;
    employeeAge: number;
    profileImage: string;
  }
  
  const employeeId = ref<string>(''); // ID del empleado, vacío para buscar todos
  const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Name', key: 'employeeName' },
    { title: 'Salary', key: 'employeeSalary' },
    { title: 'Age', key: 'employeeAge' },
    { title: 'Image', key: 'profileImage' },
  ];
  const items = ref<Employee[]>([]);
  const snackbar = ref(false);
  const requestError = ref('');
  const loading = ref(false);
  const inputRules = [
    (v: string) => !isNaN(Number(v)) || 'Input must be a number',
  ];
  
  // Función para manejar el estado de carga y errores
  async function wrapLoading(callback: () => Promise<any>) {
    loading.value = true;
    try {
      await callback();
    } catch (error: any) {
      requestError.value = error.message;
      snackbar.value = true;
    } finally {
      loading.value = false;
    }
  }
  
  // Función para buscar empleados (por ID o todos si no se proporciona ID)
  async function searchEmployee() {
    return wrapLoading(async () => {
      const url = 'http://localhost:8080/api/employees' + (employeeId.value ? `/${employeeId.value}` : '');
  
      const res = await fetch(url);
  
      if (res.status === 429) {
        requestError.value = 'Too many requests, please try again later.';
        snackbar.value = true;
        return;
      }
  
      if (res.status !== 200) {
        const errData = await res.json();
        requestError.value = errData.message || 'An error occurred';
        snackbar.value = true;
        items.value = [];
        return;
      }
  
      const data = await res.json() as Employee[];
      items.value = data;
    });
  }
  </script>
  
  <style scoped>
  .employee-page {
    padding: 2em;
  }
  </style>