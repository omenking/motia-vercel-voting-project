import { useState } from 'react'
import 'css/components/Header.css'
import { NavLink, Link } from "react-router";
import { Vote } from 'lucide-react';

export default function Header() {

  return (
    <header className='client_header'>
      <h1>
        <Vote />
        <span>Vote-o-matic</span>
      </h1>
    </header>
  )
}