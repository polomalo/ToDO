import { ADD_NEW_TASK } from '../actions/tasksActions'
import { EDIT_TASK } from '../actions/tasksActions'
import { DELETE_TASK } from '../actions/tasksActions'
import { CHECK_TASK } from '../actions/tasksActions'
import { CLEAR_DONE_TASKS } from '../actions/tasksActions'

const loadFromStorage = () => {
  const savedTasks = localStorage.getItem('todoTasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const saveToStorage = (tasks) => {
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
  return tasks;
};

const initialState = {
  tasks: loadFromStorage()
}

const tasksReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case ADD_NEW_TASK:
      newState = {
        ...state,
        tasks: [...state.tasks, { ...action.payload }]
      };
      break;
    case EDIT_TASK:
      newState = {
        ...state,
        tasks: state.tasks.map((task) =>
            task.id === action.payload.id ? {...task, title: action.payload.newTitle} : task
        )
      };
      break;
    case DELETE_TASK:
      newState = {
        ...state,
        tasks: state.tasks.filter((task) =>
            task.id !== action.payload.id
        )
      };
      break;
    case CHECK_TASK:
      newState = {
        ...state,
        tasks: state.tasks.map((task) =>
            task.id === action.payload.id ? {...task, isDone: !task.isDone} : task
        )
      };
      break;
    case CLEAR_DONE_TASKS:
      newState = {
        ...state,
        tasks: state.tasks.filter((task) => !task.isDone)
      };
      break;
    default:
      return state;
  }

  saveToStorage(newState.tasks);
  return newState;
}

export default tasksReducer