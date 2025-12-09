import TaskComponent from "./TaskComponent";

const TodoListComponent = ({ tasks, deleteTask, checkTask, editTask }) => {
  return (
    <>
      {tasks.length === 0 && <h2>Список задач пуст</h2>}
      {tasks.map((item) => (
        <TaskComponent
          key={item.id}
          task={item}
        />
      ))}
      
    </>
  );
};

export default TodoListComponent;
