import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { StarBorderOutlined } from '@material-ui/icons';
import { selectRoomId } from '../../features/appSlice';
import ChatInput from './ChatInput';
import Message from '../Message';
import { db } from '../../firebase';

function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
  );

  // hooks
  useEffect(() => {
    chatRef?.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      <>
        <ChatHeader>
          <ChatHeaderLeft>
            <h4>
              <strong>#{roomDetails?.data().name}</strong>
            </h4>
            <StarBorderOutlined />
          </ChatHeaderLeft>
        </ChatHeader>

        <ChatMessages>
          {roomMessages?.docs.map(doc => {
            // 解構賦值
            const { message, timestamp, user, userImage } = doc.data();

            return (
              <Message
                key={doc.id}
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            );
          })}
          <ChatBottom ref={chatRef} />
        </ChatMessages>
        {roomId ? (
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        ) : (
          <Bulletin>
            <h3>注意!</h3>
            <p>如果要聊天，可隨意進入各頻道或是自行創建頻道。</p>
          </Bulletin>
        )}
      </>
    </ChatContainer>
  );
}

export default Chat;

const ChatContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const Bulletin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: auto;
  border: 1px solid #2f4f4f;
  padding: 20px;
  border-radius: 10px;

  > h3 {
    font-size: 30px;
    margin-bottom: 10px;
  }
`;

const ChatMessages = styled.div``;
