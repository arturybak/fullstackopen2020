import { useState } from 'react'

export const useTemplate = name => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const setEmpty = () => {
        setValue('')
    }

    return {
        setEmpty: setEmpty,
        field: { name, value, onChange }
    }
}
