import { createSlice } from '@reduxjs/toolkit'

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: { items: [] },
    reducers: {
        addNewTask: (state, action) => {
            state.items.push({ id: crypto.randomUUID(), title: action.payload, isDone: false })
        },
        deleteTask: (state, action) => {
            state.items = state.items.filter((task) => task.id !== action.payload)
        },
        editTask: (state, action) => {
            const task = state.items.find((task) => task.id === action.payload.id)
            if (task) {
                task.title = action.payload.newTitle
            }
        },
        checkTask: (state, action) => {
            const task = state.items.find((task) => task.id === action.payload)
            if (task) task.isDone = !task.isDone
        },
        clearDoneTasks: (state) => {
            state.items = state.items.filter((task) => !task.isDone)
        }
    }
})

export const { addNewTask, deleteTask, editTask, checkTask, clearDoneTasks } = tasksSlice.actions;
export default tasksSlice.reducer;