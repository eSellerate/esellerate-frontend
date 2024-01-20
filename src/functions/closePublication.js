import axios from 'axios'
import extractCookie from '../components/Utilities/Cookies/GetCookieByName'

async function closePublication (ID) {
  const token = extractCookie('session')
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/delete`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        ID
      }
    })
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export default closePublication
