import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} exact/>  
        <Route path="/cart" element={<Cart/>} exact/>  
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
