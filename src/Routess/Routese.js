import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductTable from '../ProductTable'
import InventoryModal from '../InventoryModal'


function Routese() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProductTable />} />
      <Route path="/add" element={<InventoryModal />} />

      
    </Routes>
  </BrowserRouter>
  )
}

export default Routese