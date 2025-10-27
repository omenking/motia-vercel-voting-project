import { useState } from 'react'
import 'css/components/AdminHeader.css'
import { NavLink, Link } from "react-router";

export default function AdminHeader() {

  return (
    <header className='admin_header'>
      <h1>Admin</h1>
      <nav>
        <NavLink to="/admin">Polls</NavLink>
        <NavLink to="/">Back to Client</NavLink>
      </nav>
    </header>
  )
}