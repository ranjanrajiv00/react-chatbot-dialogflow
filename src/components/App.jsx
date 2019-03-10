import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MainLayout from './MainLayout';
import Chatroom from './Chatroom';

import socket from './socket';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      client: socket()
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <MainLayout>
          <Chatroom
            onSendMessage={(message) => this.state.client.sendMessage(message)}
            onReceiveMessage={this.state.client.receiveMessage}
          />
        </MainLayout>
      </MuiThemeProvider>
    )
  }
}
