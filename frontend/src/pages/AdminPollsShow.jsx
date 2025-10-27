import { useState, useEffect } from 'react'
import AdminApi from 'services/AdminApi'
import { useParams } from 'react-router-dom'
import 'css/pages/AdminPollsShow.css'
import AdminPollDetails from 'components/AdminPollDetails'
import AdminVotesChart from 'components/AdminVotesChart'
import { Pencil, Share2  } from 'lucide-react';
import { NavLink, Link } from "react-router";

export default function AdminPollsShow() {
  const { id } = useParams()
  const [poll, setPoll] = useState(null)

  const handleCopy = async () => {
    try {
      const url = import.meta.env.VITE_APP_HOST_URL
      await navigator.clipboard.writeText(`${url}/${poll.uuid}`)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }  

  useEffect(() => {
    async function fetch() {
      try {
        const data = await AdminApi.polls_show(id)
        setPoll(data)
      } catch (error) {
        console.error('Error:', error.message)
      }
    }
    fetch()
  }, [id])
  return (
    <>
      <article>
        {poll &&
        <div className="content">
          <div className="page_heading">
            <div className="title">
              {poll.name}
            </div>
            <div className="actions">
              <div className='bttn' onClick={handleCopy}>
                <Share2 />
              </div>
              <Link className='bttn' to={"/admin/polls/"+poll.id+"/edit"}>
                <Pencil />
              </Link>
            </div>
          </div>
          <AdminPollDetails poll={poll} />
          <AdminVotesChart  poll={poll} />
        </div>
        }
      </article>
    </>
  )
}