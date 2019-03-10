import React from 'react';
import styled from 'styled-components'
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';

import Overlay from './Overlay';

const ChatWindow = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 420px;
  box-sizing: border-box;
`
const ChatPanel = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px ;
  z-index: 1;
  color: #fafafa !important;
  border-bottom: 1px solid;
`

const Title = styled.p`
  text-align: center;
  font-size: 24px;
`

const NoDots = styled.div`
  hr {
    visibility: hidden;
  }
`

const OutputText = styled.div`
  white-space: normal !important;
  word-break: break-all !important;
  overflow: initial !important;
  width: 100%;
  height: auto !important;
  color: #fafafa !important;
`

const InputPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  align-self: center;
  border-top: 1px solid #fafafa;
`

const Scrollable = styled.div`
  height: 100%;
  overflow: auto;
`

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      chatHistory: [],
      input: ''
    }

    this.onInput = this.onInput.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
    this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
  }

  componentDidMount() {
    this.props.onReceiveMessage(this.onReceiveMessage);
    this.scrollChatToBottom()
  }

  componentDidUpdate() {
    this.scrollChatToBottom()
  }

  onInput = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  onSendMessage = () => {
    if (!this.state.input)
      return

    this.props.onSendMessage(this.state.input);
    this.setState({ chatHistory: [...this.state.chatHistory, { message: this.state.input, isUser: true }] });

    this.setState({ input: '' })
  }

  onReceiveMessage = (message) => {
    this.setState({ chatHistory: [...this.state.chatHistory, { message: message, isUser: false }] });
  }

  scrollChatToBottom() {
    this.panel.scrollTo(0, this.panel.scrollHeight)
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <ChatWindow>
          <Header>
            <Title>Chat Bot</Title>
          </Header>
          <ChatPanel>
            <Scrollable ref={(panel) => { this.panel = panel; }}>
              <List>
                {
                  this.state.chatHistory.map(
                    ({ message, isUser }, i) => [
                      <NoDots>
                        <ListItem
                          key={message + i}
                          style={{ color: '#fafafa' }}
                          {...(isUser ? { leftAvatar: <Avatar src='user.png' /> } : { rightAvatar: <Avatar src='bot.png' /> })}
                          secondaryText={
                            message &&
                            <OutputText>
                              {message}
                            </OutputText>
                          }
                        />
                      </NoDots>,
                      <Divider style={isUser ? { marginLeft: '75px', marginRight: '20px' } : { marginLeft: '20px', marginRight: '75px' }} />
                    ]
                  )
                }
              </List>
            </Scrollable>
            <InputPanel>
              <TextField
                textareaStyle={{ color: '#fafafa' }}
                hintStyle={{ color: '#fafafa' }}
                floatingLabelStyle={{ color: '#fafafa' }}
                hintText="Enter a message."
                floatingLabelText="Enter a message."
                multiLine
                rows={4}
                rowsMax={4}
                onChange={this.onInput}
                value={this.state.input}
                onKeyPress={e => (e.key === 'Enter' ? this.onSendMessage() : null)}
              />
              <FloatingActionButton
                onClick={this.onSendMessage}
                style={{ marginLeft: 20 }}
              >
                <FontIcon
                  style={{ fontSize: 32 }}
                  className="material-icons"
                >
                  {'chat_bubble_outline'}
                </FontIcon>
              </FloatingActionButton>
            </InputPanel>
          </ChatPanel>
          <Overlay
            opacity={0.6}
            background="#111111"
          />
        </ChatWindow>
      </div>
    )
  }
}
