import React from 'react'
import Body from './pages/body/Body'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ManagerCategory from './pages/admin/managerCategory/ManagerCategory'
import ManagerUser from './pages/admin/managerUser/ManagerUser'
import ManagerProduct from './pages/admin/managerProduct/ManagerProduct'
import Upload from './components/layout/Upload'
import UserCart from './pages/customer/cart/UserCart'
import ListProduct from './pages/listProduct/ListProduct'
import FollowOrder from './pages/customer/followOrders/FollowOrders'
import ManagerOrder from './pages/admin/managerOrder/ManagerOrder'
import Customer from './pages/customer/info/Customer'

export default function App() {
  return (
    <>
     <Routes>
     <Route path='/upload' element={<Upload/>}/>

        <Route path='/' element={<Body/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/listProduct' element={<ListProduct/>}/>
        <Route path='/adminCategory' element={<ManagerCategory/>}/>
        <Route path='/adminUser' element={<ManagerUser/>}/>
        <Route path='/adminProduct' element={<ManagerProduct/>}/>
        <Route path='/adminOrder' element={<ManagerOrder/>}/>
        <Route path="/customer" element={<Customer></Customer>}></Route>
        <Route path='/cart' element={<UserCart/>}/>
        <Route path='/customerOrder' element={<FollowOrder/>}/>

     </Routes>

    </>
  )
}
