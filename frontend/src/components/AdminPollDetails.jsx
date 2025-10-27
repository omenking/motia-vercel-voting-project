import { useState } from 'react'

import 'css/components/AdminPollDetails.css'

export default function AdminPollDetails(props) {
  const poll = props.poll

  const getChoiceStyle = (choice) => {
    const per = calcPer(choice)
    return {
      width: `${per}%`
    }
  }

  const calcPer = (choice) => {
    const total = poll.votes_count
    const current = choice.votes_count
    const per = Math.round((100 / total) * current)
    return per
  }

  return (
    <div className="admin_poll_details">
      <div className='attrs'>
        <div className="attr id">
          <div className='label'>ID</div>
          <div className="value">{poll.id}</div>
        </div>
        <div className="attr uuid">
          <div className='label'>UUID</div>
          <div className="value">{poll.uuid}</div>
        </div>
        <div className="attr name">
          <div className='label'>Name</div>
          <div className="value">{poll.name}</div>
        </div>
        <div className="attr published">
          <div className='label'>Published</div>
          <div className="value">{poll.published ? 'true' : 'false'}</div>
        </div>
        <div className="attr expires_at">
          <div className='label'>Expires At</div>
          <div className="value">{poll.expires_at}</div>
        </div>
        <div className="attr votes_count">
          <div className='label'># Votes</div>
          <div className="value">{poll.votes_count}</div>
        </div>
        <div className="attr description">
          <div className='label'>Description</div>
          <div className="value">{poll.description}</div>
        </div>
      </div>
      <div className="choices">
        {poll.choices.map((choice) => (
          <div className="choice" key={choice.uuid}>
            <div className="name">{choice.name}</div>
            <div className="count">{choice.votes_count} ({calcPer(choice)}%)</div>
            <div className="bar" style={getChoiceStyle(choice)} ></div>
          </div>
        ))}
      </div>
    </div>
  )
}