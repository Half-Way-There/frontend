import React, { useState } from 'react'
import { auth } from '../firebase'

const ForgotPassword = () => {

    const [ form, setForm ] = useState({
        email: ''
    })
    const [ message, setMessage ] = useState('')
    const [ error, setError ] = useState('')

    const onChange = e => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    // Sends recovery email
    const onSubmit = async e => {
        e.preventDefault()
        setError('')
        auth.sendPasswordResetEmail(form.email)
        .then(() => {
            setForm({
                form: ''
            })
            setMessage('Check your email for reset link!')
        })
        .catch(err => {
            setError('No account with this email found!')
        })
    }


    return (
        <div>
            {error ? <p>{error}</p> : null}
            {message ? <p>{message}</p> : null}
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        name='email'
                        type='email'
                        value={form.email}
                        onChange={onChange}
                        placeholder='Email'
                    />
                </div>
                <button>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword
