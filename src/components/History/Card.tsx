import { useState, useEffect } from "react";
import './Card.css';

type Task = {
  id: number;
  todo: string;
  completed: boolean;
};

export default function Card() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.todos);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div className="main-content">
      <div className="todos">
        <h2>To-Do List  History</h2>
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
