import { useState, useEffect } from 'react'
import 'css/pages/AdminPollsForm.css'
import AdminApi from 'services/AdminApi'
import { useParams, useNavigate  } from 'react-router-dom'
import { Trash, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import FieldErrors from 'components/FieldErrors'

export default function AdminPollsForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [model, setModel] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    async function fetch() {
      if (id) {
        // Edit mode - fetch existing poll
        try {
          const data = await AdminApi.polls_edit(id)
          setModel(data)
        } catch (error) {
          console.error('Error:', error.message)
        }
      } else {
        // New mode - initialize empty form
        setModel({
          name: '',
          description: '',
          published: true,
          expires_hours: 24,
          choices: [
            {uuid: uuidv4(), name: ''},
            {uuid: uuidv4(), name: ''},
            {uuid: uuidv4(), name: ''}
          ]
        })
      }
    }
    fetch()
  }, [id])
  const handleFieldChange = (ev) => {
    const { name, value, type, checked } = ev.target
    setModel(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleChoiceChange = (uuid, value) => {
    setModel(prev => ({
      ...prev,
      choices: prev.choices.map(choice =>
        choice.uuid === uuid ? { ...choice, name: value } : choice
      )
    }))
  }

  const removeChoice = (uuid) => {
    setModel(prev => ({
      ...prev,
      choices: prev.choices.filter(choice => choice.uuid !== uuid)
    }))
  }

  const addChoice = (ev) => {
    ev.preventDefault()
    setModel(prev => ({
      ...prev,
      choices: [
        ...prev.choices,
        { uuid: uuidv4(), name: '' }
      ]
    }))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
setErrors({}) // Clear previous errors
    const payload = {
      poll: model
    }
    if (id) {
      try {
        const data = await AdminApi.polls_update(id,payload)
        navigate(`/admin/polls/${data.id}`)
      } catch (error) {
        console.error('Error:', error)
        setErrors(error.errors)
      }
    } else {
      try {
        const data = await AdminApi.polls_create(payload)
        navigate(`/admin/polls/${data.id}`)
      } catch (error) {
        console.error('Error:', error)
        setErrors(error.errors)
      }

    }
    return false
  }


  return (
    <>
      <article>
        <div className="content">
          <div className="page_heading">
            <div className="title">
              {id ? 'Edit Poll' : 'New Poll'}
            </div>
          </div>
          { model &&
          <form onSubmit={onSubmit}>
            <div className='field textinput name'>
              <label>Name</label>
              <input 
                type='text' 
                name='name' 
                value={model.name}
                onChange={handleFieldChange}
              />
              <FieldErrors errors={errors.name} />
            </div>
            <div className='field textarea description'>
              <label>Description</label>
              <textarea 
                name='description'
                value={model.description}
                onChange={handleFieldChange}
              ></textarea>
              <FieldErrors errors={errors.description} />
            </div>
            <div className='field checkbox published'>
              <label>published</label>
              <input 
                type='checkbox' 
                name='published' 
                checked={model.published}
                onChange={handleFieldChange}
              />
              <FieldErrors errors={errors.published} />
            </div>
            <div className='field select expries_hours'>
              <label>Expires Duration</label>
              <select 
                name='expires_hours'
                value={model.expires_hours}
                onChange={handleFieldChange}
              >
                <option value='1'>1 hour</option>
                <option value='3'>3 hour</option>
                <option value='6'>6 hour</option>
                <option value='12'>12 hour</option>
                <option value='24'>1 day</option>
                <option value='72'>3 days</option>
                <option value='120'>5 days</option>
                <option value='168'>7 days</option>
              </select>
              <FieldErrors errors={errors.expires_hours} />
            </div>
            <div className='choices'>
              <div className="page_heading">
                <div className="title">
                  Choices
                </div>
                <div className='bttn add_Choice' onClick={addChoice}><Plus /></div>
              </div>
              {model.choices.map((choice, index) => (
                <div key={choice.uuid} className='admin_choice_form_item'>
                  <div className='field textinput name'>
                    <div className='choice_wrap'>
                      <input 
                        type='text' 
                        name='name' 
                        value={choice.name}
                        onChange={(ev) => handleChoiceChange(choice.uuid, ev.target.value)}
                      />
                      <div 
                        className='bttn remove_choice' 
                        onClick={() => removeChoice(choice.uuid)}
                      >
                        <Trash />
                      </div>
                    </div>
                    <FieldErrors errors={errors[`choices[${index}].name`]} />
                  </div>
                </div>
              ))}
            </div>

            <div className="submit">
              <input type='submit' value='Save' />
            </div>
          </form>
          }
        </div>
      </article>
    </>
  )
}