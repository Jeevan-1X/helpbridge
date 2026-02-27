const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: 'Bearer ' + token })
  }
}

export const api = {
  register: async (data) => {
    const res = await fetch(BASE_URL + '/auth/register', { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) })
    return res.json()
  },
  login: async (data) => {
    const res = await fetch(BASE_URL + '/auth/login', { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) })
    return res.json()
  },
  getMe: async () => {
    const res = await fetch(BASE_URL + '/auth/me', { headers: getHeaders() })
    return res.json()
  },
  getNeeds: async (filters) => {
    const params = new URLSearchParams(filters).toString()
    const res = await fetch(BASE_URL + '/needs?' + params, { headers: getHeaders() })
    return res.json()
  },
  getNeed: async (id) => {
    const res = await fetch(BASE_URL + '/needs/' + id, { headers: getHeaders() })
    return res.json()
  },
  createNeed: async (data) => {
    const res = await fetch(BASE_URL + '/needs', { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) })
    return res.json()
  },
  acceptNeed: async (id) => {
    const res = await fetch(BASE_URL + '/needs/' + id + '/accept', { method: 'PUT', headers: getHeaders() })
    return res.json()
  },
  fulfillNeed: async (id) => {
    const res = await fetch(BASE_URL + '/needs/' + id + '/fulfill', { method: 'PUT', headers: getHeaders() })
    return res.json()
  }
}
