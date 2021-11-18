import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home/>}>
            <Home/>
            </Route>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
