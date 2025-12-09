import { useState } from "react";
import "./App.css";
import InputComponent from "./components/InputComponent";
import TodoListComponent from "./components/TodoListComponent";
import FilterBtn from "./components/FilterBtn";
import { Grid, Button, Stack, Box } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { clearDoneTasks } from "./redux/actions/tasksActions";

function App() {
    const [filter, setFilter] = useState("all");

    const { tasks } = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    
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
            <InputComponent />
            <TodoListComponent
                tasks={filteredTasks}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <FilterBtn tasks={tasks} handleFilterTasks={handleFilterTasks}/>
            </Box>
            <Grid container spacing={2}>
                <Grid size={5}>
                    <p>Осталось дел: {tasks.filter((task) => !task.isDone).length}</p>
                </Grid>
                <Grid size={7} sx={{position: 'relative'}}>
                    <Button variant="contained" onClick={() => dispatch(clearDoneTasks())} sx={{fontSize: '10px', paddingLeft: '10px', paddingRight: '10px', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                        Очистить выполненные
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default App;
