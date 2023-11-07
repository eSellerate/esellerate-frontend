import { useState } from "react"

export default function useToggle() {
    const [isVisible, setVisible] = useState(false)

    const toggle = () => {
        setVisible(!isVisible)
    }

    return {
        isVisible,
        toggle
    }

}