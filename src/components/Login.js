import React, { useState } from 'react'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = ({ setUser }) => {

    const [ form, setForm ] = useState({
        email: '',
        password: ''
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

    // Create a token then verify on the server side
    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        auth.signInWithEmailAndPassword(form.email, form.password)
        .then(({user}) => {
            return user.getIdToken().then((idToken) => {
                localStorage.setItem('token', idToken)
                axios.post('http://localhost:5001/auth/login', { idToken }, {
                  headers: {
                    authorization: idToken
                  }
                })
                .then(res => {
                  setUser(res.data)
                  history.push("/dashboard")
                })
                .catch(err => {
                  console.log("Error: ", err)
                })
            })
        })
        .catch(err => {
          console.log(err)
        })
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
                <button>
                    Submit
                </button>
            </form>
            <p><a href='/forgot-password'>forgot password?</a></p>
        </div>
    )
}

export default Login
