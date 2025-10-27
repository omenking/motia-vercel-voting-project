import { useState, useEffect  } from 'react'
import { Outlet, useLocation } from "react-router";
import AdminHeader from 'components/AdminHeader'
import 'css/layouts/AdminLayout.css'

export default function AdminLayout() {
  const location = useLocation();
  const path = location.pathname;
  
  let pageName = ''
  useEffect(() => {
    // /admin/polls/new - Must be BEFORE /admin/polls/:id
    if (path === "/admin/polls/new") {
      pageName = 'polls_form';
    // /admin/polls/:id/edit
    } else if (/^\/admin\/polls\/\d+\/edit$/.test(path)) {
      pageName = 'polls_form';
    // /admin/polls/:id
    } else if (/^\/admin\/polls\/\d+$/.test(path)) {
      pageName = 'polls_show';
    // /admin or /admin/polls
    } else if (path === "/admin" || path === "/admin/polls") {
      pageName = 'polls_index';
    }
    
    document.body.setAttribute("location", pageName);
    return () => {
      document.body.removeAttribute("location");
    };
  }, [location]);
  
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  )
}