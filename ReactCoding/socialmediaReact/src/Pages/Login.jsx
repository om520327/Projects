import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firbaseConfig';
import Loader from '../components/common/Loader';
import LoginComp from '../components/LoginComp';
export default function Login() {
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, res => {
      if (res?.accessToken) {
        navigate('/home');
      } else {
        setIsLoading(false);
      }
    });
  }, []);
  return isLoading ? <Loader /> : <LoginComp />;
}
