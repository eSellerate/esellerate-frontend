import axios from 'axios'

async function createPublicationTest () {
  try {
    console.log(`${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/publishTest`)
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/publishTest`)
    console.log(response)
    const { data } = response
    console.log(data)
  } catch (error) {
    console.log(error.response)
  }
}

export default createPublicationTest
