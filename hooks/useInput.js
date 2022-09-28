import { useState } from 'react'

const useInput = (checkValidity) => {
    const [input, setInput] = useState('')
    const [isInputTouched, setIsInputTouched] = useState(false)

    const isInputValid = checkValidity(input)
    const isInputInvalid = !isInputValid && isInputTouched

    const handleInputChange = (event) => {
        setInput(event.target.value)
    }

    const handleInputBlur = () => {
        setIsInputTouched(true)
    }

    return {
        input,
        isInputValid,
        isInputInvalid,
        handleInputChange,
        handleInputBlur,
    }
}

export default useInput
