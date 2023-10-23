import React, { Component } from 'react';
import './PlayerSidebar.css';
import { withWebRTC } from 'react-liowebrtc';

class PlayerSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  generatePlayers = () => {
    return this.props.players.map((player) => (
      <div className="chat" key={`chat-${player.name}-${player.lives}`}>
        <b className="name" style={{ color: (player.name == this.props.currentPlayer) ? '#306ff6' : '#ccc7c7' }}>{player.name}:</b> <span className="msg">{player.lives} lives</span>
      </div>
    ));
  }

  render() {
    const { players } = this.props;

    return (
        <div className="sidebarcontainer">
            <div className="chatHeader">
                <h1 className="title">Players</h1>
                <hr />
            </div>
            <div className="chatBox" ref={(div) => this.chatBox = div}>
            {players.length ? this.generatePlayers() : (
                <div className="info">
                <p></p>
                </div>
            )}
            <br></br>
            </div>
        </div>
    );
  }
}

export default withWebRTC(PlayerSidebar);