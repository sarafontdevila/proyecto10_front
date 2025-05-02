
export const fetchData = async ({ url, method = 'GET', body = null, token = null }) => {
  const headers = {}

  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const opciones = {
    method,
    headers,
  }

  if (body) {
    opciones.body = body instanceof FormData ? body : JSON.stringify(body)
  }

  try {
    const response = await fetch(url, opciones)
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('fetchData error:', error.message)
    throw error
  }
}