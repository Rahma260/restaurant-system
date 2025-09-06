import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Product from './Pages/Product';
import ProductDetails from './Pages/ProductDetails';
import Cart from "./Pages/Cart";
import Favorites from './Pages/Favorites';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { CartProvider } from "./Components/Context/CartContext";
import { FavoritesProvider } from "./Components/Context/FavoritesContext";
import { UserProvider } from "./Components/Context/UserContext";
import { LoadingProvider } from "./Components/Context/LoadingContext";
import ProtectedRoute from './Components/ProtectedRoutes';
import GlobalMessage from "./Components/Message";
import Loading from "./Components/Loading";
import Contact from './Pages/Contact';
import About from './Pages/About';
import Profile from './Pages/Profile';
function App() {
  return (
    <UserProvider>
      <LoadingProvider>
        <CartProvider>
          <FavoritesProvider>
            <Loading />
            <GlobalMessage />
            <Router>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path="/products" element={<Product />} />
                <Route path="/products/:categoryId"
                  element={<Product key={window.location.pathname} />}
                />
                <Route path="/products/:categoryId/:itemId" element={<ProductDetails key={useParams().itemId} />} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/favorite" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Router>
          </FavoritesProvider>
        </CartProvider>
      </LoadingProvider>
    </UserProvider>
  );
}

export default App;
