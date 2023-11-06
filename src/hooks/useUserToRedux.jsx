// redux
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/userSlice'
// libraries
import axios from 'axios'
// Utilities
import GetCookieByName from '../components/Utilities/Cookies/GetCookieByName'

const useUserToRedux = () => {
    const dispatch = useDispatch()

    const fillUserSlide = async () => {
        const sessionCookie = GetCookieByName('session')
        if (!sessionCookie) {
            return
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_END_POINT}profile`,
                {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${sessionCookie}`
                }
                }
            )
            if (response.status === 200) {
                dispatch(addUser(response.data.user))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return fillUserSlide

}

export default useUserToRedux
