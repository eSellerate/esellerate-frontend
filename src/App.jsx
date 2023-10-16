import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from './redux/userSlice'
import Routes from './routes/Routes'
import axios from 'axios'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/profile`)
      dispatch(addUser(response.data))
      console.log(response)
    } catch (error) {
      // servidor en mantenimiento o algun error
      console.log(error.response)
    }
  }
  return (
    <Routes />
  )
}

export default App
