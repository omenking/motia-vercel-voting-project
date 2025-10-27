export default class Api {
  static async polls_show(id) {
    const response = await fetch(`/api/polls/${id}`)
    const data = await response.json()
    
    if (data.code === 0) {
      return data.data
    } else {
      throw new Error(data.message || 'Failed to fetch')
    }
  }

  static async polls_vote(payload) {
    const response = await fetch(`/api/polls/:id/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    
    if (data.code === 0) {
      return data.data
    } else if (data.code === 422) {
      const error = new Error('Validation failed')
      error.errors = data.errors
      throw error
    } else {
      throw new Error(data.message || 'Failed to create')
    }
  }
}