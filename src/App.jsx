import { BrowserRouter, Route, Routes } from "react-router"
import Provider from "./Provider/Provider"
import Home from "./pages/Home"
import FoodDetail from './components/FoodDetail/FoodDetail';
import PlaceOrder from './pages/PlaceOrder';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';
import Review from "./pages/Review";



function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/food/:id" Component={FoodDetail} />
          <Route path="/checkout" Component={Review} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/place-order" element={<PrivateRoute><PlaceOrder /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
