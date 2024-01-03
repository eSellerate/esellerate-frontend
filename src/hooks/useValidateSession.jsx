import { useNavigate, useLocation } from "react-router-dom"
// Iibraries
import axios from 'axios'
// Utilities
import GetCookieByName from '../components/Utilities/Cookies/GetCookieByName'

const useValidateSession = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const validateSession = async () => {
    const sessionCookie = GetCookieByName('session')
    if (!sessionCookie) {
      return
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_END_POINT}validate-session`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${sessionCookie}`
          }
        }
      )
      if (response.status === 200) {
        navigate(`/inventory`)
      }
    } catch (error) {
      console.log(error)
      navigate('/login')
      return
    }
  }

  return validateSession

}

export default useValidateSession
