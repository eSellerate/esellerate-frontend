import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: 0,
  nickname: '',
  registration_date: '',
  first_name: '',
  last_name: '',
  gender: '',
  country_id: '',
  email: '',
  thumbnail: {
    picture_id: 'Sin Foto',
    picture_url: 'https://datepsychology.com/wp-content/uploads/2022/09/gigachad.jpg'
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {
        id,
        nickname,
        registration_date,
        first_name,
        last_name,
        gender,
        country_id,
        email,
        thumbnail
      } = action.payload
      state.id = id
      state.nickname = nickname
      state.registration_date = registration_date
      state.firstName = first_name
      state.lastName = last_name
      state.gender = gender
      state.country_id = country_id
      state.email = email
      state.thumbnail = thumbnail
    },
    changeEmail: (state, action) => {
      state.email = action.payload
    }
  }
})

export const { addUser, changeEmail } = userSlice.actions
export default userSlice.reducer
