import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import ProductDetail from '../pages/ProductDetails';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';

import AddProducts from '../admin/AddProducts';
import Dashboard from '../admin/Dashboard';
import Users from '../admin/Users';
import Wish from '../pages/Wish';

const Routers = () => {
  return (
    <Routes>
          <Route path='/' element={< Navigate to='home' />} />
          <Route path='home' element={< Home />} />
          <Route path='shop' element={< Shop />} />
          <Route path='shop/:id' element={< ProductDetail />} />
          <Route path='wish' element={< Wish />} />
          <Route path = 'cart' element = {< Cart / >}/>

        <Route path = '/*' element = {< ProtectedRoute / >} >
            <Route path='checkout' element={< Checkout />}></Route>
            <Route path='dashboard' element={< Dashboard />}></Route>
            <Route path='dashboard/add-product' element={< AddProducts />}></Route>
            <Route path = 'dashboard/users' element = {< Users />}></Route>
        </Route>

          <Route path='login' element={< Login />} />
          <Route path='signup' element={< Signup />} />
      </Routes>
  )
}

export default Routers