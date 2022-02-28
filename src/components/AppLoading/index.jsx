import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';

const AppLoading = () => {
  return (
    <AppLoadingContainer>
      <AppLoadingContents>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3800/3800024.png"
          alt=""
        />
        <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
      </AppLoadingContents>
    </AppLoadingContainer>
  );
};

export default AppLoading;

const AppLoadingContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
