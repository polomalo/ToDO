import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import InputComponent from "@components/ToDo/InputComponent";
import TodoListComponent from "@components/ToDo/TodoListComponent";
import FilterBtn from "@components/ToDo/FilterBtn";
import { Grid, Button, Stack, Box, CircularProgress, Alert } from "@mui/material";
import { getTasks, clearCompletedTasks, clearError } from "@redux/slices/tasksSlice";
import { logout } from "@redux/slices/authSlice";
import { useNavigate } from "react-router";
import { ROUTES } from "@constants/routes";


const ToDo = () => {
    const [filter, setFilter] = useState("all");
    const {items: tasks, loading, error } = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    if (error) {
        dispatch(clearError());
        return (
            <Alert severity="error" sx={{ mb: 2 }}>
                {error}
                <Button variant="contained" onClick={() => dispatch(getTasks())}>
                    Повторить
                </Button>
            </Alert>
        );
    }
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

    const handleLogout = () => {
        dispatch(logout());
        navigate(ROUTES.LOGIN, { replace: true });
    }

    return (
        <>
            <Stack spacing={2}>
                <h1>To-Do List</h1>
                <InputComponent />
                {loading ? <CircularProgress style={{margin: '20px auto'}}/> : <TodoListComponent tasks={filteredTasks}/>}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FilterBtn tasks={tasks} handleFilterTasks={handleFilterTasks}/>
                </Box>
                <Grid container spacing={2}>
                    <Grid size={5}>
                        <p>Осталось дел: {tasks.filter((task) => !task.isCompleted).length}</p>
                    </Grid>
                    <Grid size={7} sx={{position: 'relative'}}>
                        <Button variant="contained" onClick={() => dispatch(clearCompletedTasks())} sx={{fontSize: '10px', paddingLeft: '10px', paddingRight: '10px', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                            Очистить выполненные
                        </Button>
                    </Grid>
                </Grid>
            </Stack>
            <Button variant="contained" onClick={handleLogout}>
                Выйти
            </Button>
        </>
    )
}

export default ToDo;