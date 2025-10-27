export default class AdminApi {
  static async polls_index() {
    const response = await fetch(`/api/admin/polls`)
    const data = await response.json()
    
    if (data.code === 0) {
      return data.data
    } else {
      throw new Error(data.message || 'Failed to fetch')
    }
  }

  static async polls_show(id) {
    const response = await fetch(`/api/admin/polls/${id}`)
    const data = await response.json()
    
    if (data.code === 0) {
      return data.data
    } else {
      throw new Error(data.message || 'Failed to fetch')
    }
  }

  static async polls_edit(id) {
    const response = await fetch(`/api/admin/polls/${id}/edit`)
    const data = await response.json()
    
    if (data.code === 0) {
      return data.data
    } else {
      throw new Error(data.message || 'Failed to fetch')
    }
  }

  static async polls_create(payload) {
    const response = await fetch(`/api/admin/polls`, {
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

  static async polls_update(id, payload) {
    const response = await fetch(`/api/admin/polls/${id}`, {
      method: 'PUT',
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
      throw new Error(data.message || 'Failed to update')
    }
  }
}