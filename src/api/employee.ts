import { BASE_URL } from "./base";

export interface Employee {
  id: number;
  employeeName: string;
  employeeSalary: number;
  employeeAnualSalary: number;
  employeeAge: number;
  profileImage: string;
}

export interface Response<T> {
    data: T | undefined;
    status: number;
    statusText: string;
}

export async function handleRequest(url: string, method: RequestInit['method'] = 'GET') {
    const res = await fetch(url, { method });
    const { status, statusText } = res;
    
    return {
        data: status === 200 ? await res.json() : undefined,
        status,
        statusText,
    }
}

export async function getEmployee(id: number): Promise<Response<Employee>> {
    const url = `${BASE_URL}/employees/${id}`;
    
    return handleRequest(url);
}

export async function getAllEmployees(): Promise<Response<Employee[]>> {
    const url = `${BASE_URL}/employees`;
    
    return handleRequest(url);
}
