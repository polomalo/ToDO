export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const CHECK_TASK = 'CHECK_TASK';
export const CLEAR_DONE_TASKS = 'CLEAR_DONE_TASKS';

export const addNewTask = task => {
  return {
    type: ADD_NEW_TASK,
    payload: task
  }
}

export const editTask = (id, newTitle) => {
  return {
    type: EDIT_TASK,
    payload: {id, newTitle}
  }
}

export const deleteTask = (id) => {
  return {
    type: DELETE_TASK,
    payload: {id}
  }
}

export const checkTask = (id) => {
  return {
    type: CHECK_TASK,
    payload: {id}
  }
}

export const clearDoneTasks = () => {
  return {
    type: CLEAR_DONE_TASKS
  }
}