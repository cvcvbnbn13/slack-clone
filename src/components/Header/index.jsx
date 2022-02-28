import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { AccessTime, Search, HelpOutline } from '@material-ui/icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

function Header() {
  const [user] = useAuthState(auth);
  return (
    <HeaderContainer>
      {/*Header left*/}
      <HeaderLeft>
        <HeaderAvatar
          src={user?.photoURL}
          alt={user?.displayName}
          onClick={() => {
            const out = window.confirm('確定要登出嗎?');
            if (out) {
              auth.signOut();
            }
          }}
        />
        <AccessTime />
      </HeaderLeft>
      {/*Header Search*/}
      <HeaderSearch>
        <Search />
        <input placeholder="搜尋" />
      </HeaderSearch>
      {/*Header Right*/}
      <HeaderRight>
        <HelpOutline />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: #fff;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #273a3a;
  text-align: center;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: #fff;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
