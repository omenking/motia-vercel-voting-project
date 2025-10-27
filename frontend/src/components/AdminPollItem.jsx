import { useState } from 'react'
import { Pencil, ChartLine,Share2  } from 'lucide-react';
import { NavLink, Link } from "react-router";
import 'css/components/AdminPollItem.css'

export default function AdminPollItem(props) {
  const poll = props.poll

  const handleCopy = async () => {
    try {
      const url = import.meta.env.VITE_APP_HOST_URL
      await navigator.clipboard.writeText(`${url}/${poll.uuid}`)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }  

  return (
    <tr className="admin_poll_item">
      <td className="id">{poll.id}</td>
      <td className="uuid">{poll.uuid}</td>
      <td className="name">{poll.name}</td>
      <td className="published">{poll.published ? 'true' : 'false'}</td>
      <td className="expires_at">{poll.expires_at}</td>
      <td className="votes_count">{poll.votes_count}</td>
      <td className="actions">
        <div className="action_bar">
          <div className='bttn' onClick={handleCopy}>
            <Share2 />
          </div>
          <Link className='bttn' to={"/admin/polls/"+poll.id}>
            <ChartLine />
          </Link>
          <Link className='bttn' to={"/admin/polls/"+poll.id+"/edit"}>
            <Pencil />
          </Link>
        </div>
      </td>
    </tr>
  )
}