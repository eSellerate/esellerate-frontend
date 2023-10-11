import axios from 'axios'

async function createPublicationTest() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/publishTest`)
    } catch (error) {
        console.log(error)
    }
}

export default createPublicationTest