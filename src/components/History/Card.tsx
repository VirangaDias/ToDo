import { useState, useEffect } from "react";
import './Card.css';
import { fetchTasksHistory } from '../utils/api'; 

type Task = {
  id: number;
  todo: string;
  completed: boolean;
};

export default function Card() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const taskList = await fetchTasksHistory();
        setTasks(taskList);
      } catch (err) {
        setError('Error fetching tasks.');
      }
    };

    getTasks();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="main-content">
      <div className="todos">
        <h2>To-Do List History</h2>
        <div className="todos-list">
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className={task.completed ? "completed" : ""}>
                <span className="todo-span">{task.todo}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
