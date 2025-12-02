import { BrowserRouter, Route, Routes } from "react-router"
import Provider from "./Provider/Provider"
import Home from "./pages/Home"
import FoodDetail from './components/FoodDetail/FoodDetail';
import './App.css';



function App() {

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/food/:id" Component={FoodDetail} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
