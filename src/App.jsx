import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router';
import './App.css';
import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Foods from './components/Foods/Foods';
import FoodDetail from './components/FoodDetail/FoodDetail';
import { createContext, useState } from 'react';
import CheckOut from './components/CheckOut/CheckOut';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SignUp from './components/SignUp/SignUp';
import UserProvider from './context/UserProvider';
import OrderComplete from './components/OrderComplete/OrderComplete';

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <>
                <Header />
                <Hero />
                <Categories />
                <Foods />
              </>
            } />
            <Route path='/:category' element={
              <>
                <Header />
                <Hero />
                <Categories />
                <Foods />
              </>
            } />
            <Route path='/food/:id' element={
              <>
                <Categories />
                <FoodDetail />
              </>
            } />
            <Route path='/checkout' element={
              <>
                <Categories />
                <CheckOut />
              </>
            } />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/place-order' element={
              <PrivateRoute>
                <Categories />
                <OrderComplete />
              </PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </CartContext.Provider>
  )
}

export default App
