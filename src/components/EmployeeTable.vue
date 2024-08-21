<template>
    <v-data-table-virtual
      :headers="headers"
      :items="items"
      height="400"
    ></v-data-table-virtual>
  </template>
  
  <script setup lang="ts">
  import type { Employee } from '@/views/SearchEmployee.vue'; // Update the path to use the correct alias or relative path

  const props = defineProps<{
    items: Employee[];
  }>();
  
  const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Name', key: 'employeeName' },
    { title: 'Salary', key: 'employeeSalary' },
    { title: 'Anual Salary', key: 'employeeAnualSalary' },
    { title: 'Age', key: 'employeeAge' },
    { title: 'Image', key: 'profileImage' },
  ];
  </script>
  
  <style scoped>
  </style>