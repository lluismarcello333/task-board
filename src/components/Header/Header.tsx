import { useContext } from "react";
import { StatsCard } from "../StatsCard/StatsCard";
import styles from "./styles.module.scss";
import { TasksContext } from "../../Context/TasksContext";

export const Header: React.FC = () => {

  const {tasks} = useContext(TasksContext);

  const totalTasks = tasks.length;
  const totalPeding = tasks.reduce((total, task) => {
    if (!task.done) return total + 1;
    return total
  }, 0)
  const totalDone = totalTasks - totalPeding;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <h1>MyTodo</h1>

          <span>Bem vindo, Luiz Marcelo!</span>
        </div>

        <div>
          <StatsCard title="Total de tarefas" value={totalTasks}/>
          <StatsCard title="Tarefas Pendentes" value={totalPeding}/>
          <StatsCard title="Tarefas Concluídas" value={totalDone}/>
        </div>
      </div>
    </header>
  );
};
