import './App.css';
import Header from './components/Header.js';
import NotesListPages from './pages/NotesListPages.js';
import NotePage from './pages/NotePage.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
    <div className="container dark">
      <div className='app'>
      <Header/>
      <Routes>
      <Route path='/' exact element={<NotesListPages/>} />
      <Route path='/note/:id' element={<NotePage/>} />
      </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
