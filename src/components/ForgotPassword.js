import React, { useState } from "react"
import { auth } from "../firebase"
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  // Sends recovery email
  const onSubmit = async (e) => {
    e.preventDefault()
    auth.sendPasswordResetEmail(form.email)
      .then(() => {
        setForm({
          form: "",
        })
        toast.success('Check your email for reset link!')
      })
      .catch(() => {
        toast.error('No account with this email was found.')
      })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
          />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
