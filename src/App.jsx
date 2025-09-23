import { useState, useEffect } from "react";
import "./App.css";
import InputComponent from "./components/InputComponent";
import TodoListComponent from "./components/TodoListComponent";
import FilterBtn from "./components/FilterBtn";
import { Grid, Button, Stack, Box, CircularProgress } from "@mui/material";
import useTasksApi from "./hooks/useTasksApi";

function App() {
    const [filter, setFilter] = useState("all");
    const {
        tasks,
        loading,
        getTasks,
        addTask,
        toggleTask,
        editTask,
        deleteTask,
        clearCompletedTasks
    } = useTasksApi();
    
    useEffect(() => {
        getTasks();
    }, []);

    const handleFilterTasks = (key) => {
        setFilter(key);
    }    
    const filteredTasks = tasks.filter((task) => {
        if (filter === "activeTasks") {
            return !task.isCompleted;
        } else if (filter === "doneTasks") {
            return task.isCompleted;
        }
        return true;
    });
    return (
        <Stack spacing={2}>
            <h1>To-Do List API</h1>
            <InputComponent loading={loading} addNewTask={addTask} />
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TodoListComponent
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    checkTask={toggleTask}
                    editTask={editTask}
                />
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <FilterBtn tasks={tasks} handleFilterTasks={handleFilterTasks}/>
            </Box>
            <Grid container spacing={2}>
                <Grid size={5}>
                    <p>Осталось дел: {tasks.filter((task) => !task.isCompleted).length}</p>
                </Grid>
                <Grid size={7} sx={{position: 'relative'}}>
                    <Button variant="contained" onClick={() => clearCompletedTasks()} sx={{fontSize: '10px', paddingLeft: '10px', paddingRight: '10px', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                        Очистить выполненные
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default App;
