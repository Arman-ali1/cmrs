import React from 'react'
import Header from '../header/Header'
import Sidebar from '../Sidebar/Sidebar'
import AdminsideTradslist from './adminsidetradslist/Adminsidetradslist'

function AdminsideTrads() {
  return (
    <div>
      <Header/>
      <Sidebar/>
      <AdminsideTradslist/>
    </div>
  )
}

export default AdminsideTrads
