import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Cart from './Cart'
import Auth from './Auth'

function AppRouter() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/cart' element={<Cart/>}></Route>
                <Route path='/auth' element={<Auth/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRouter