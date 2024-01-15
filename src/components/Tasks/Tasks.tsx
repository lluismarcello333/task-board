import { FormEvent, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { TasksContext } from "../../Context/TasksContext";

export const Tasks: React.FC = () => {
  const [tasksTitle, setTaskTitle] = useState("");
  const { tasks, setTasks } = useContext(TasksContext);

  function handleSubmitAddTask(e: FormEvent) {
    e.preventDefault();

    if (tasksTitle.length < 3) {
      alert("Não é possível adicionar uma tarefa com menos de três letras.");
      return;
    }

    //Adicionando a tarefa
    const newTasks = [
      ...tasks,
      {
        id: new Date().getTime(),
        title: tasksTitle,
        done: false,
      },
    ];

    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    setTaskTitle("");
  }

  function handleToggleTaskStatus(taskId: number) {
    const newTasks = tasks.map((task) => {
      if (taskId === task.id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function handleRemoveTask(taskId: number) {
    const newTasks = tasks.filter((task) => task.id !== Number(taskId));
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmitAddTask}>
        <div>
          <label htmlFor="task_title">Adicionar Tarefa</label>
          <input
            value={tasksTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            type="text"
            id="task_title"
            placeholder="Título da Tarefa"
          />
        </div>

        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                id={`task-${task.id}`}
                onChange={() => handleToggleTaskStatus(task.id)}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={task.done ? styles.done : ""}
              >
                {task.title}
              </label>
              <button onClick={() => handleRemoveTask(task.id)}>Remover</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
