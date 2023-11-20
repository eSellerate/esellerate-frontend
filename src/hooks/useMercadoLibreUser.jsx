// redux
import { useDispatch } from "react-redux"
import { setUser } from "../redux/mercadolibreUserSlice"
// libraries
import axios from 'axios'
// Utilities
import GetCookieByName from '../components/Utilities/Cookies/GetCookieByName'

const useMercadoLibreUser = () => {
    const dispatch = useDispatch()
    const baseURL = import.meta.env.VITE_BACKEND_END_POINT

    const dispatchMercadoLibreUser = async () => {
        const session = GetCookieByName('session')
        try {
            const response = await axios.get(`${baseURL}mercado-libre/profile`, {
                headers: {
                    Authorization: `Bearer ${session}`
                }
            })
            dispatch(setUser(response.data))
        } catch(error){
            console.log(error)
        }
    }

    return dispatchMercadoLibreUser

}

export default useMercadoLibreUser
