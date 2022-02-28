import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { auth, provider } from '../../firebase';

const Login = () => {
  const signIn = e => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch(err => {
      alert(err.message);
    });
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3800/3800024.png"
          alt=""
        />
        <h1>Sign In to Fatty's slack</h1>
        <p>Fatty.slack.com</p>

        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    background-color: #0a8d48;
    color: #fff;
  }
`;
