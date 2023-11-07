import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import HomeTodo from "./HomeTodo";
import MyTask from "./MyTask";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action, ActionTypes, Task } from "./store/types";

function App() {
  const tasks = useSelector((state: Task[]) => state);
  const dispatch = useDispatch();
  let stringArrayTasks = JSON.stringify(tasks);

  useEffect(() => {
    const newTasks = JSON.parse(localStorage.getItem('tasks'));
    console.log('загрузка данных из локал сторейдж', newTasks)
    const newArrTasks: Action = {
      type: ActionTypes.LOCALE_STORAGE,
      payload: newTasks
    }
    if (newArrTasks) {
      dispatch(newArrTasks);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('tasks', stringArrayTasks);
    console.log('установка нового значения', stringArrayTasks)
  }, [stringArrayTasks]);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomeTodo />}></Route>
          <Route path='/task/:id' element={<MyTask />}></Route>
        </Routes>
      </Router>
  )
}

export default App
