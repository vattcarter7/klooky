import React, { useEffect } from 'react';

const LoginSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1500);
  }, []);

  return <div>Thanks for loggin in!</div>;
};

export default LoginSuccess;
