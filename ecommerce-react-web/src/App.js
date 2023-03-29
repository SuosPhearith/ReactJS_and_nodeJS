import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import LayoutOne from "./components/layout/LayoutOneComponent"
import HomePage  from "./page/home/HomePage"
import CustomerPage from "./page/customer/CustomerPage"
import Product from "./page/product/ProductPage"
import User from "./page/user/UserPage"
import "./App.css"
import LoginPage from "./page/auth/LoginPage"
import RegisterPage from "./page/auth/RegisterPage"
// import User
function App() {
  const isLogin = (localStorage.getItem("is_login") === "1") // true 
  return (
    <BrowserRouter>

        {isLogin && <LayoutOne>
          <Routes>
              <Route path='/' element={ <HomePage /> } />
              <Route path='/user' element={<User />} />
              <Route path='/customer' element={<CustomerPage />} />
              <Route path='/product' element={<Product />} />
              <Route path='*' element={<h1>Route Not Found!</h1>} />
          </Routes>
        </LayoutOne> }
        
        {!isLogin && <Routes>
            <Route path='*' element={ <Navigate to="/login" /> }/>
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/register' element={<RegisterPage />} />
        </Routes>}

    </BrowserRouter>
  )
}
export default App;