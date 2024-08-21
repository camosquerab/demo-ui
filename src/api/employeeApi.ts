const BASE_URL = 'http://localhost:8080/api/employees';

export async function fetchEmployees(id?: string): Promise<Employee[]> {
  let url = BASE_URL;
  if (id) url += `/${id}`;

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Too Many Requests. Please try again later.');
    } else {
      throw new Error('An error occurred while fetching data.');
    }
  }
  return response.json();
}
