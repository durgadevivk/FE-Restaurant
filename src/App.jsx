import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantDetails from "./pages/RestaurantDetails";
import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>
        <Navbar/>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home />} />
        {/* Restaurant Listing Page */} 
        <Route path="/restaurants" element={<Home />} />

        <Route
          path="/restaurants/:id"
          element={<RestaurantDetails />}
        />

      </Routes>
    </BrowserRouter>
    );
}

export default App;