import { useState } from 'react'

export default function useForm() {

    const [value, setValue] = useState('')

    const changeValue = (text) => {
        setValue(text)
    }

    const reset = () => {
        setValue('')
    }


    return {
        value,
        changeValue,
        reset
    }

} 
