<script setup lang="ts">
import { ref } from 'vue';
import EmployeeTable from '../components/EmployeeTable.vue';

export interface Employee {
  id: number;
  employeeName: string;
  employeeSalary: number;
  employeeAnualSalary: number;
  employeeAge: number;
  profileImage: string;
}

const employeeId = ref<number | null>(null);
const items = ref<Employee[]>([]);
const snackbar = ref(false);
const requestError = ref('');
const loading = ref(false);
const inputRules = [
  (v: string) => !isNaN(Number(v)) || 'Input must be a number',
];

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

async function searchEmployee() {
  return wrapLoading(async () => {
    let res;
    if (employeeId.value === null) {
      res = await fetch('http://localhost:8080/api/employees');
    } else {
      res = await fetch(`http://localhost:8080/api/employees/${employeeId.value}`);
    }

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

    const data = employeeId.value === null
      ? await res.json() as Employee[]
      : [await res.json() as Employee];
    items.value = data;
  });
}
</script>

<template>
  <div>
    <v-text-field
      label="Employee ID"
      v-model="employeeId"
      :rules="inputRules"
    ></v-text-field>
    <v-btn variant="outlined" :loading="loading" @click="searchEmployee">Search Employee</v-btn>

    <EmployeeTable :items="items"></EmployeeTable>

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