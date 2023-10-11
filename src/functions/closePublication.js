import axios from 'axios'

async function closePublication(ID) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/delete?id=`+ID)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

export default closePublication