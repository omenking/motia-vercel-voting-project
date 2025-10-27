import { useState, useEffect } from 'react'
import 'css/pages/PollsShow.css'
import Api from 'services/Api'
import { useParams } from 'react-router-dom'
import Poll from 'components/Poll'

export default function PollsShow() {
  const { id } = useParams()
  const [poll, setPoll] = useState(null)
  
  useEffect(() => {
    async function fetch() {
      try {
        const data = await Api.polls_show(id)
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
        {poll && <Poll poll={poll} />}
      </article>
    </>
  )
}