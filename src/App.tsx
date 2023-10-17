import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import HomeTodo from "./HomeTodo";
import MyTask from "./MyTask";

function App() {

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
