import React, { useState } from 'react';
import { RegisterAPI } from '../api/AuthAPI';
import { postUserData } from '../api/FirestoreAPI';
import Logo from '../assets/sbs.png';
import { useNavigate } from 'react-router-dom';
import { getUniqueID } from '../helpers/getUniqueId';
import '../Sass/LoginComp.scss';
import { toast } from 'react-toastify';

export default function RegisterComp() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const register = async () => {
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      toast.success('Account Created!');
      postUserData({
        userID: getUniqueID(),
        name: credentails.name,
        email: credentails.email
      });
      navigate('/home');
      localStorage.setItem('userEmail', res.user.email);
    } catch (err) {
      console.log(err);
      toast.error('Cannot Create your Account');
    }
  };

  return (
    <div className='login-wrapper'>
      <img src={Logo} className='logo' />

      <div className='login-wrapper-inner'>
        <h1 className='heading'>Everything SBS</h1>

        <div className='auth-inputs'>
          <input
            onChange={event =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type='text'
            className='common-input'
            placeholder='Your Name'
          />
          <input
            onChange={event =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type='email'
            className='common-input'
            placeholder='Email'
          />
          <input
            onChange={event =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type='password'
            className='common-input'
            placeholder='Password (6 or more characters)'
          />
        </div>
        <button onClick={register} className='login-btn'>
          Agree & Join
        </button>
      </div>
      <hr class='hr-text' data-content='or' />
      <div className='google-btn-container'>
        <p className='go-to-signup'>
          Already on SBS?{' '}
          <span className='join-now' onClick={() => navigate('/')}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
