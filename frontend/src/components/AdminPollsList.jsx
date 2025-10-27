import { useState } from 'react'
import AdminPollItem from 'components/AdminPollItem'
export default function AdminPollsList(props) {
  const polls = props.polls;
  return (
    <table className="polls">
      <thead>
        <tr>
          <th>ID</th>
          <th>UUID</th>
          <th>Name</th>
          <th>Published</th>
          <th>Expires_at</th>
          <th># Votes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {polls.map((poll) => (
          <AdminPollItem key={poll.id} poll={poll} />
        ))}
      </tbody>
    </table>
  )
}