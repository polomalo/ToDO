import { legacy_createStore as createStore, combineReducers } from 'redux';
import tasksReducer from './reducers/tasksReducer';


const rootReducer = combineReducers({
  tasks: tasksReducer
})

const store = createStore(rootReducer);

export default store