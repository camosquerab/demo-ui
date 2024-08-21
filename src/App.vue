<script setup lang="ts">
import { request } from 'http';
import { ref } from 'vue';

export interface Employee {
  id: number;
  employeeName: string;
  employeeSalary: number;
  employeeAge: number;
  profileImage: string;
}
const employeeId = defineModel(); 
const headers = [
 { title: 'ID', key: 'id' },
 { title: 'Name', key: 'employeeName' },
 { title: 'Salary', key: 'employeeSalary' },
 { title: 'Age', key: 'employeeAge' },
 { title: 'Image', key: 'profileImage' },
]
const items = ref<Employee[]>([]);
const snackbar = ref(false);
const requestError = ref('');
const loading = ref(false);
const inputRules = [
  (v: string) => !isNaN(Number(v)) || 'Input must be a number',
];

async function wrapLoading(callback: () => any) {
  loading.value = true;
  const res = await callback();
  loading.value = false;

  return res;
}
  
async function searchEmployee() {
  return wrapLoading(async () => {
    const res = await fetch(`http://localhost:8080/api/employees/${employeeId.value}`, {
      
    })
      .catch(error => {
        requestError.value = error.message;
        snackbar.value = true;
      });
      
      console.log({res});
      
    if (!res) {
      items.value = [];
      loading.value = false;
      return;
    }

    if (res.status !== 200) {
      const errData = await res.json();
      requestError.value = errData.error;
      snackbar.value = true;
      loading.value = false;
      items.value = [];
      return;
    }

    const data = await res.json() as Employee;
    loading.value = false;
    
    if (!data) {
      items.value = [];
      return;
    }
    
    items.value = [data];
  });
}
</script>

<template>
  <div>
    <h1>DC Latam</h1>
    
    <v-text-field
      label="Employee ID"
      v-model="employeeId"
      :rules="inputRules"
    ></v-text-field>
    <br>
    <v-btn variant="outlined" :loading="loading" @click="searchEmployee">Search employee</v-btn>
    
    <template v-if="items.length !== 0">
      <hr class="my-8">
      <v-data-table-virtual
        :headers="headers"
        :items="items"
        height="400"
    ></v-data-table-virtual>
    </template>
    
    <v-snackbar
      color="red"
      v-model="snackbar"
      multi-line
    >
      Error: {{ requestError }}

      <template v-slot:actions>
        <v-btn
          color="gray"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style scoped>
</style>
