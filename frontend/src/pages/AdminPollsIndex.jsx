import { useState } from 'react'
import 'css/pages/AdminPollsIndex.css'
import AdminApi from 'services/AdminApi'
import AdminPollsList from 'components/AdminPollsList'
import { Plus } from 'lucide-react';
import { NavLink, Link } from "react-router";

export default function AdminPollsIndex() {
  const [polls, setPolls] = useState(null)

  async function fetch() {
    try {
      const data = await AdminApi.polls_index()
      setPolls(data)
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
  fetch()

  return (
    <>
      <article>
        <div className="content">
          <div className="page_heading">
            <div className="title">
              Polls
            </div>
            <Link className='bttn' to="/admin/polls/new">
              <Plus />
            </Link>
          </div>
          {polls && <AdminPollsList polls={polls} />}
        </div>
      </article>
    </>
  )
}