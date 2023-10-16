import axios from 'axios'

async function createPublicationTest () {
  alert('KK')
  console.log('hola')
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/publishTest`)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export default createPublicationTest
