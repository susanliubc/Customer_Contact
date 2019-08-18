import React, { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const handleChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  const handleSubmit = e => {
    e.preventDefault();
    setUser({
      email: '',
      password: ''
    });
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            value={email}
            placeholder='Email'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            name='password'
            value={password}
            placeholder='Password'
            onChange={handleChange}
          />
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
    </div>
  );
};

export default Login;
