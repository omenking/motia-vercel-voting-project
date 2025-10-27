import { useState, useEffect  } from 'react'
import { Outlet, useLocation } from "react-router";
import Header from 'components/Header'
import 'css/layouts/AdminLayout.css'

export default function ApplicationLayout() {
  const location = useLocation();
  const path = location.pathname;
  
  let pageName = ''
  useEffect(() => {
    if (path === "/") {
      pageName = 'home';
    } else if (/^\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(path)) {
      pageName = 'polls_show';
    }
    
    document.body.setAttribute("location", pageName);
    return () => {
      document.body.removeAttribute("location");
    };
  }, [location]);  

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}