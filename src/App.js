import React, { Component } from 'react';
import { LioWebRTC } from 'react-liowebrtc';
import './App.css';
import ChatBox from './ChatBox';
import PlayerSidebar from './PlayerSidebar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      currentPlayer: '',
      players: [],

      defaultLives: 3,

      chatLog: [],
      options: {
        debug: true,
        dataOnly: true
      }
    };
  }
  
  join = (webrtc) => webrtc.joinRoom('wordbombers-demo');

  handleCreatedPeer = (webrtc, peer) => {
    if (this.state.name != '') {
      webrtc.shout('new peer joined', this.state);
    }
    this.addChat('GOD', `Peer-${peer.id.substring(0, 5)} has connected 0_0`, true);
  }

  handleRemovedPeer = (webrtc, peer) => {
    this.addChat('GOD', `Peer-${peer.id.substring(0, 5)} has disconnected :(`, true);
  }
  
  addChat = (name, message, alert = false) => {
    this.setState({ chatLog: this.state.chatLog.concat({
      name,
      message: `${message}`,
      timestamp: `${Date.now()}`,
      alert
    })});
  }

  handleNameSet = (webrtc, name) => {
    this.setState({ name: name })

    this.setState({ players: this.state.players.concat({
      name,
      lives: 3
    })});

    webrtc.shout('new player joined', [name, this.state.players])

    if (this.state.currentPlayer == '') {
      this.setState({currentPlayer: name})
    }

    this.setState({ inputMsg: '' });
  }

  handlePeerData = (webrtc, type, payload, peer) => {
    switch(type) {
      case 'chat':
        this.addChat(payload[0], payload[1]);
        break;
      case 'new peer joined':
        console.log("NEW PEER JOINED HUNGA AMUNGA !!!!!!!!!!!!!!!!!!!!!!!!")
        this.setState({currentPlayer: payload.currentPlayer})
        this.setState({players: payload.players})
        this.setState({chatLog: payload.chatLog})
        break;
      case 'new player joined':
        console.log("NEW PLAYER JOINED AAAAAAAAAAAAAAAAA PLEASE SHOW UP")
        this.setState({players: payload[1]})
        this.addChat('GOD', `${payload[0]} has joined!`, true);
        break;
      default:
        return;
    };
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
            onSend={(msg) => msg && this.addChat(this.state.name, msg)}
            handleNameSet={this.handleNameSet}
            currentPlayer={this.state.currentPlayer}
            name={this.state.name}
          />

          <PlayerSidebar
            players={this.state.players}
            currentPlayer={this.state.currentPlayer}
          />

        </LioWebRTC>
      </div>
    );
  }
}

export default App;