import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import mercadolibreUserReducer from './mercadolibreUserSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    mlUser: mercadolibreUserReducer
  }
})
