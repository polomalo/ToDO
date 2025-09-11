import { useState, useEffect } from "react";
import "./App.css";
import InputComponent from "./components/InputComponent";
import TasksComponent from "./components/TasksComponent";
import TodoListComponent from "./components/TodoListComponent";
import FilterBtn from "./components/FilterBtn";
import { Grid, Button, Stack, Box } from "@mui/material";

function App() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('todoTasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [filter, setFilter] = useState("all");
    
    useEffect(() => {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }, [tasks]);
    
    const checkTask = (id) => {
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === id ? { ...task, isDone: !task.isDone } : task
            )
        );
    };
    const deleteTask = (id) => {
        setTasks((tasks) => tasks.filter((task) => task.id !== id));
    };
    const clearDoneTasks = () => {
        setTasks((tasks) => tasks.filter((task) => !task.isDone))
    }
    const editTask = (id, newTitle) => {
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === id ? { ...task, title: newTitle } : task
            )
        );
    };
    const handleFilterTasks = (key) => {
        setFilter(key);
    }    
    const filteredTasks = tasks.filter((task) => {
        if (filter === "activeTasks") {
            return !task.isDone;
        } else if (filter === "doneTasks") {
            return task.isDone;
        }
        return true;
    });
    return (
        <Stack spacing={2}>
            <h1>To-Do List</h1>
            <InputComponent setTasks={setTasks} />
            <TodoListComponent
                tasks={filteredTasks}
                deleteTask={deleteTask}
                checkTask={checkTask}
                editTask={editTask}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <FilterBtn tasks={tasks} handleFilterTasks={handleFilterTasks}/>
            </Box>
            <Grid container spacing={2}>
                <Grid size={5}>
                    <p>Осталось дел: {tasks.filter((task) => !task.isDone).length}</p>
                </Grid>
                <Grid size={7} sx={{position: 'relative'}}>
                    <Button variant="contained" onClick={() => clearDoneTasks()} sx={{fontSize: '10px', paddingLeft: '10px', paddingRight: '10px', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                        Очистить выполненные
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default App;
