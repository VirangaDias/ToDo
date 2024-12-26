import { useState, useEffect } from 'react';
import './CardWindow.css';
import { fetchTasks, addTask } from '../utils/api'; 

type Task = {
  id: number;
  todo: string;
  completed: boolean;
};

export default function CardWindow() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTodo, setEditedTodo] = useState('');
  const [tid, setTid] = useState<number>(1000);

  useEffect(() => {
    fetchTasks()
      .then((todos) => setTasks(todos))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleAddClick = () => setIsPopupVisible(true);

  const handleOkClick = () => {
    if (newTask.trim()) {
      addTask(newTask)
        .then(() => {
          setTid((prev) => prev + 1);
          setTasks((prevTasks) => [
            ...prevTasks,
            { id: tid, todo: newTask, completed: false },
          ]);
        })
        .catch((error) => console.error('Error:', error));
    }
    setIsPopupVisible(false);
    setNewTask('');
  };

  const handleCancelClick = () => {
    setIsPopupVisible(false);
    setNewTask('');
  };

  const handleEditClick = (taskId: number, currentTodo: string) => {
    setEditingTaskId(taskId);
    setEditedTodo(currentTodo);
  };

  const handleSaveEditClick = () => {
    if (editedTodo.trim()) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTaskId
            ? { ...task, todo: editedTodo }
            : task
        )
      );
      setEditingTaskId(null);
      setEditedTodo('');
    }
  };

  const handleDeleteClick = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleCompleteClick = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: true }
          : task
      )
    );
  };

  return (
    <div className="main-content">
      <div className="todos">
        <h2>To-Do List</h2>
        <div className="todos-list">
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                <span className="todo-span">
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editedTodo}
                      onChange={(e) => setEditedTodo(e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    task.todo
                  )}
                </span>
                <button
                  className={task.completed ? 'completed' : 'complete'}
                  onClick={() =>
                    task.completed ? null : handleCompleteClick(task.id)
                  }
                >
                  {task.completed ? 'Done ✔️' : 'Complete'}
                </button>
                <button
                  className="Edit"
                  onClick={() =>
                    editingTaskId === task.id
                      ? handleSaveEditClick()
                      : handleEditClick(task.id, task.todo)
                  }
                >
                  {editingTaskId === task.id ? 'Save' : 'Edit'}
                </button>
                <button
                  className="Delete"
                  onClick={() => handleDeleteClick(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button className="add-todo-btn" onClick={handleAddClick}>+</button>
        {isPopupVisible && (
          <div className="popup">
            <div className="popup-content">
              <input
                type="text"
                placeholder="Enter a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="popup-input"
              />
              <div className="popup-buttons">
                <button onClick={handleOkClick} className="popup-ok">OK</button>
                <button onClick={handleCancelClick} className="popup-cancel">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
