import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  photoUrl: null,
  userType: {
    id: 0,
    role: '',
    name: '',
    description: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {
        id,
        username,
        email,
        first_name,
        last_name,
        photo_url,
        user_type
      } = action.payload
      state.id = id
      state.username = username
      state.email = email
      state.firstName = first_name
      state.lastName = last_name
      state.photoUrl = photo_url
      state.userType = user_type
    },
    changeEmail: (state, action) => {
      state.email = action.payload
    },
    deleteUser: (state) => {
      state.id = 0
      state.username = ''
      state.email = ''
      state.firstName = ''
      state.lastName = ''
      state.photoUrl = null
      state.userType = {
        id: 0,
        role: '',
        name: '',
        description: ''
      }
    }
  }
})

export const { addUser, changeEmail, deleteUser } = userSlice.actions
export default userSlice.reducer
