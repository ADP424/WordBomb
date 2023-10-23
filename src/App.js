import React, { Component } from 'react';
import { LioWebRTC } from 'react-liowebrtc';
import './App.css';
import ChatBox from './ChatBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatLog: [],
      options: {
        debug: true,
        dataOnly: true
      }
    };
  }
  
  join = (webrtc) => webrtc.joinRoom('wordbombers-demo');

  handleCreatedPeer = (webrtc, peer) => {
    this.addChat('Player-${peer.id.substring(0, 5)} joined the room!', ' ', true);
  }

  handleRemovedPeer = (webrtc, peer) => {
    this.addChat('Player-${peer.id.substring(0, 5)} left the room :(', ' ', true);
  }
  
  handlePeerData = (webrtc, type, payload, peer) => {
    switch(type) {
      case 'chat':
        this.addChat('Player-${peer.id.substring(0, 5)}', payload);
        break;
      default:
        return;
    };
  }
  
  addChat = (name, message, alert = false) => {
    this.setState({ chatLog: this.state.chatLog.concat({
      name,
      message: `${message}`,
      timestamp: `${Date.now()}`,
      alert
    })});
  }
  
  render() {
    const { chatLog, options } = this.state;
    return (
      <div className="App">
        <LioWebRTC
            options={options}
            onReady={this.join}
            onCreatedPeer={this.handleCreatedPeer}
            onRemovedPeer={this.handleRemovedPeer}
            onReceivedPeerData={this.handlePeerData}
          >
          <ChatBox
            chatLog={chatLog}
            onSend={(msg) => msg && this.addChat('Me', msg)}
          />
        </LioWebRTC>
      </div>
    );
  }
}

export default App;