import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { db } from '../../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';

function ChatInput({ channelName, channelId, chatRef }) {
  const [inputState, setInputState] = useState('');
  const [user] = useAuthState(auth);

  const sendMessage = e => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection('rooms').doc(channelId).collection('messages').add({
      message: inputState,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    chatRef.current.scrollIntoView({
      behavior: 'smooth',
    });

    setInputState('');
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={inputState}
          onChange={e => setInputState(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          傳送
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
