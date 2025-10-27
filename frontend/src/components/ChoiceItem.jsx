import { useState } from 'react'
import 'css/components/Header.css'
import { NavLink, Link } from "react-router";
import { Vote } from 'lucide-react';

export default function ChoiceItem(props) {
  const poll = props.poll
  const choice = props.choice
  
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

  async function click(ev){
    ev.preventDefault()
    console.log('choice',ev,choice.uuid)
    payload = {
      uuid: choice.uuid
    }
    const data = await Api.polls_vote(poll.uuid,payload)
    return false
  }

  return (
    <div className="choice_wrap">
      <div 
        key={choice.uuid} 
        className="choice"
      >
        <div className="name">{choice.name}</div>
        <div className="count">{choice.votes_count} ({calcPer(choice)}%)</div>
        <div className="bar" style={getChoiceStyle(choice)} ></div>
      </div>
      <div 
        className='vote bttn'
        onClick={click}
      >
        <Vote />
      </div>
    </div>
  )
}