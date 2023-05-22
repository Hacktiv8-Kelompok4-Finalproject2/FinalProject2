import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePages from './components/Pages/HomePages';
import LoginForm from './components/Login/LoginForm';
import LogoutPage from './components/Login/LogoutPage';
import Navbar from './components/Navbar/Navbar';
import CartPages from './components/Pages/CartPages';
import ProductDetails from './components/Card/ProductDetails';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/cart" element={<CartPages />} />
          <Route
            path="/product-details/:productId"
            element={<ProductDetails />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
