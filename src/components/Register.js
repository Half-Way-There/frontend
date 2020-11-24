import React, { useState } from 'react'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [ form, setForm ] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    const onChange = e => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    // Creating a firebase user
    const onSubmit = async e => {
        e.preventDefault()
        setError('')
        setLoading(true)
        if(form.password === form.confirmPassword) {
            auth.createUserWithEmailAndPassword(form.email, form.password)
            .then(({user}) => {
                return user.getIdToken().then((idToken) => {
                  localStorage.setItem('token', idToken)
                  axios
                    .post("http://localhost:5001/auth/register", { idToken }, {
                      headers: {
                        authorization: idToken
                      }
                     })
                    .then(res => {
                      auth.signOut()
                      localStorage.removeItem("token")
                      history.push('/login')
                    })
                })
            })
        } else {
            setError('Passwords must match!')
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} autoComplete='off'>
                <input
                    name='email'
                    type='text'
                    id='email'
                    value={form.email}
                    onChange={onChange}
                    placeholder='Email'
                />
                <input
                    name='password'
                    type='password'
                    id='password'
                    value={form.password}
                    onChange={onChange}
                    placeholder='password'
                />
                <input
                    name='confirmPassword'
                    type='password'
                    id='confirmPassword'
                    value={form.confirmPassword}
                    onChange={onChange}
                    placeholder='confirmPassword'
                />
                <button>
                    Submit
                </button>
            </form>
        </div>
    )
}


export default Register
