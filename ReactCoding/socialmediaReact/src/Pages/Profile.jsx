import React, { useEffect, useState } from 'react';
import ProfileComp from '../components/ProfileComp';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firbaseConfig';
import Loader from '../components/common/Loader';

export default function Profile({ currentUser }) {
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
  return isLoading ? <Loader /> : <ProfileComp currentUser={currentUser} />;
}
