import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: 0,
    nickname: '',
    registration_date: '',
    first_name: '',
    last_name: '',
    country_id: '',
    email: '',
    site_id: '',
    permalink: '',
    thumbnail: {
        picture_id: '',
        picture_url: ''
      },
}

export const mercadolibreUserSlice = createSlice({
  name: 'mercadolibreUserSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        id,
        nickname,
        registration_date,
        first_name,
        last_name,
        country_id,
        email,
        site_id,
        permalink,
        thumbnail
      } = action.payload
      state.id = id,
      state.nickname = nickname,
      state.registration_date = registration_date,
      state.first_name = first_name,
      state.last_name = last_name,
      state.country_id = country_id,
      state.email = email,
      state.site_id = site_id,
      state.permalink = permalink,
      state.thumbnail = thumbnail
    },
    deleteUser: (state) => {
      state.id = initialState.id,
      state.nickname = initialState.nickname,
      state.registration_date = initialState.registration_date,
      state.first_name = initialState.first_name,
      state.last_name = initialState.last_name,
      state.country_id = initialState.country_id,
      state.email = initialState.email,
      state.site_id = initialState.site_id,
      state.permalink = initialState.permalink,
      state.thumbnail = initialState.thumbnail
    }
  }
})

export const { setUser, deleteUser } = mercadolibreUserSlice.actions
export default mercadolibreUserSlice.reducer
