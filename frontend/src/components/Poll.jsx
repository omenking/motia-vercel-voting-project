import { useState } from 'react'
import ChoiceItem from 'components/ChoiceItem'
import 'css/components/Poll.css'

export default function Poll(props) {
  const poll = props.poll
  return (
    <div className="poll">
      <div className="name">{poll.name}</div>
      <div className="description">{poll.description}</div>
      <div className="choices">
        {poll.choices.map((choice) => (
          <ChoiceItem 
            key={choice.uuid} 
            poll={poll}
            choice={choice}
          />
        ))}
      </div>
    </div>
  )
}