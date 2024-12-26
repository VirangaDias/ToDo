
const API_BASE_URL = 'https://dummyjson.com';

export const fetchTasks = async (limit = 7, skip = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos?limit=${limit}&skip=${skip}`);
    const data = await response.json();
    return data.todos;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTask = async (todo: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo,
        completed: false,
        userId: 5,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const fetchTasksHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/https://dummyjson.com/todos`);
    const data = await response.json();
    return data.todos;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

