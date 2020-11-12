import React from 'react'
import './Register.css'
import UseRegister from './UseRegister'

const Register = () => {

    const { handleChange, values, handleSubmit } = UseRegister();

    return (
        <div>
            <h1>Register Component</h1>
            <form className='login-form-main' onSubmit={handleSubmit}>

                <h2>Get started with us today! Create your account by filling out the information below.</h2>
                
                <div className='form-inputs'>
                    <label htmlFor='username' className='form-label'>
                        <input 
                            id='username'
                            type='text'
                            name='username'
                            className='form-input'
                            placeholder='username'
                            value={values.username}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </label>
                </div>

                <div className='form-inputs'>
                    <label htmlFor='email' className='form-label'>
                        <input 
                            id='email'
                            type='text'
                            name='email'
                            className='form-input'
                            placeholder='email'
                            value={values.email}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </label>
                </div>

                <div className='form-inputs'>
                    <label htmlFor='password' className='form-label'>
                        <input 
                            id='password'
                            type='text'
                            name='password'
                            className='form-input'
                            placeholder='password'
                            value={values.password}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </label>
                </div>

                <div className='form-inputs'>
                    <label htmlFor='confirmpassword' className='form-label'>
                        <input 
                            id='confirmpassword'
                            type='text'
                            name='password'
                            className='form-input'
                            placeholder='confirm password'
                            value={values.confirmpassword}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </label>
                </div>

                <button className='form-input-btn' type='submit'>
                    Register
                </button>
                <button className='guest-btn'>
                    Guest
                </button>

                <span>
                    Already have an account? Login <a href='/'>here</a>
                </span>

            </form>
        </div>
    )
}

export default Register
