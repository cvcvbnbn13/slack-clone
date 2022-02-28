import React from 'react';
import styled from 'styled-components';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import {
  FiberManualRecord,
  InsertComment,
  Inbox,
  Drafts,
  BookmarkBorder,
  PeopleAlt,
  // Apps,
  // FileCopy,
  Add,
} from '@material-ui/icons';
// import CreateIcon from '@material-ui/icons/Create';
import SidebarOption from './SidebarOption';
function Sidebar() {
  const [channels, loading, error] = useCollection(db.collection('rooms'));
  const [user] = useAuthState(auth);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Fatty的實驗室</h2>
          <h3>
            <FiberManualRecord />
            Fatty Shau
          </h3>
        </SidebarInfo>
      </SidebarHeader>
      <SidebarOption Icon={InsertComment} title={'對話串'} />
      <SidebarOption Icon={Inbox} title={'提及與回應'} />
      <SidebarOption Icon={Drafts} title={'草稿'} />
      <SidebarOption Icon={BookmarkBorder} title={'頻道'} />
      <SidebarOption Icon={PeopleAlt} title={'成員'} />
      <hr />
      <SidebarOption Icon={Add} addChannelOption title={'新建頻道'} />
      {channels?.docs.map(doc => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: #fff;
  flex: 0.3;
  border-top: 1px solid #273a3a;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #273a3a;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #273a3a;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: var(--slack-color);
    font-size: 16px;
    background-color: #fff;
    border-radius: 50%;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
