import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import AppLoading from './components/AppLoading';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from './firebase';
import './App.css';

function App() {
  const [user, loading] = useAuthState(auth);
  const [channels] = useCollection(db.collection('rooms'));

  console.log(useCollection(db.collection('rooms')));

  if (loading) {
    return <AppLoading></AppLoading>;
  }

  if (!channels) {
    return <AppLoading></AppLoading>;
  }

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
