<script setup lang="ts">
import { ref } from 'vue';
import EmployeeTable from '../components/EmployeeTable.vue';
import { getAllEmployees, getEmployee, type Employee } from '@/api/employee';

enum MessageType {
  ERROR = 'error',
  ALERT = 'alert',
}

const employeeId = ref<number | null>(null);
const items = ref<Employee[]>([]);

const snackbar = ref(false);
const snackbarColor = ref('red');
const snackbarColorMapping = {
  [MessageType.ERROR]: 'red',
  [MessageType.ALERT]: 'yellow',
};
const requestError = ref('');

const loading = ref(false);

const inputRules = [
  (v: string) => !isNaN(Number(v)) || 'Input must be a number',
];

async function wrapLoading(callback: () => Promise<any>) {
  try {
    loading.value = true;
    return await callback();
  } catch (error: any) {
    loading.value = false;
  } finally {
    loading.value = false;
  }
}

function callSnackbark(message: string, type: MessageType) {
  snackbarColor.value = snackbarColorMapping[type];
  requestError.value = message;
  snackbar.value = true;
}

async function searchEmployee() {
  return wrapLoading(async () => {
    const res = employeeId.value
      ? await getEmployee(employeeId.value)
      : await getAllEmployees();
      
    if (res.status === 429) {
      callSnackbark('Too many requests, please try again later', MessageType.ALERT);
      items.value = [];
      return;
    }

    if (res.status === 400) {
      callSnackbark('Invalid input. Please provide a valid number.', MessageType.ALERT);
      items.value = [];
      return;
    }
    

    if (res.status !== 200) {
      callSnackbark(requestError.value = res.statusText || 'Unexpected error', MessageType.ERROR);
      items.value = [];
      return;
    }
    
    if (!res.data) {
      items.value = [];
      return;
    }
    
    items.value = Array.isArray(res.data) 
      ? res.data 
      : [res.data];
  });
}
</script>

<template>
  <div>
    <v-text-field
      label="Employee ID"
      v-model="employeeId"
      :rules="inputRules"
      @keydown.enter="searchEmployee"
    ></v-text-field>
    <v-btn variant="outlined" :loading="loading" @click="searchEmployee">Search Employee</v-btn>

    <EmployeeTable :items="items"></EmployeeTable>

    <v-snackbar
      :color="snackbarColor"
      v-model="snackbar"
      multi-line
    >
      {{ requestError }}

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