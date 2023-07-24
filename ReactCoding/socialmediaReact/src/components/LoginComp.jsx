import React, { useState } from 'react';
import { LoginAPI } from '../api/AuthAPI';
import SBSLogo from '../assets/sbs.png';
import { useNavigate } from 'react-router-dom';
import '../Sass/LoginComp.scss';
import { toast } from 'react-toastify';

export default function LoginComp() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success('Signed In to SBS!');
      localStorage.setItem('userEmail', res.user.email);
      navigate('/home');
    } catch (err) {
      console.log(err);
      toast.error('Please Check your Credentials');
    }
  };

  return (
    <div className='login-wrapper'>
      <img src={SBSLogo} className='logo' />

      <div className='login-wrapper-inner'>
        <h1 className='heading'>Sign in</h1>
        <p className='sub-heading'>For da ppl</p>

        <div className='auth-inputs'>
          <input
            onChange={event =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type='email'
            className='common-input'
            placeholder='Email or Phone'
          />
          <input
            onChange={event =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type='password'
            className='common-input'
            placeholder='Password'
          />
        </div>
        <button onClick={login} className='login-btn'>
          Sign in
        </button>
      </div>
      <hr className='hr-text' data-content='or' />
      <div className='google-btn-container'>
        <p className='go-to-signup'>
          New to SBS?{' '}
          <span className='join-now' onClick={() => navigate('/register')}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}
