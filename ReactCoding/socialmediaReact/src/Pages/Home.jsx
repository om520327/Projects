import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firbaseConfig';
import HomeComp from '../components/HomeComp';
import Loader from '../components/common/Loader';

export default function Home({ currentUser }) {
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, res => {
      if (!res?.accessToken) {
        navigate('/');
      } else {
        setIsLoading(false);
      }
    });
  }, []);
  return isLoading ? <Loader /> : <HomeComp currentUser={currentUser} />;
}
