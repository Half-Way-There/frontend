import { useState } from 'react'

const UseRegister = () => {
    // Setting Initial Values
    const [ values, setValues ] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    // Handling Changes
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    //Handling Submit
    const handleSubmit = e => {
        e.preventDefault()
    }

    return { values, handleChange, handleSubmit }
}

export default UseRegister
