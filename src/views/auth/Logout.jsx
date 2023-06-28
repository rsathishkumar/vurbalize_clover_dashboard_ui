import {useEffect, useState} from 'react'

export default function Logoutn() {

  useEffect(() => {
    sessionStorage.removeItem('token');
    window.location.href = "/auth/sign-in"
  }, []);

  return (
    <div>Logout</div>
  );
}
