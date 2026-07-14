import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './pages/TodoList';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import './index.css';

function App() {
  return (
    <Router>
      <div className="layout">
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/add" element={<AddTodo />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
