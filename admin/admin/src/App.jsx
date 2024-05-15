import React from 'react'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './pages/addProduct/addProduct'
import ListProduct from './pages/listProduct/listProduct'
import OrderProduct from './pages/orderProduct/orderProduct'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <hr />
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path='/addProduct' element={<AddProduct/>} />
          <Route path='/listProduct' element={<ListProduct/>} />
          <Route path='/orderProduct' element={<OrderProduct/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App