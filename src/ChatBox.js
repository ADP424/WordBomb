import React, { Component } from 'react';
import './ChatBox.css';
import { withWebRTC } from 'react-liowebrtc';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg: '',
      timerLength: 10,
      currentTimer: 10,
    };
  }

  handleSend = (chatMsg) => {
    this.props.webrtc.shout('chat', [this.props.name, chatMsg]);
    this.props.onSend(chatMsg);

    clearInterval(this.interval);
    this.setState({currentTimer: this.state.timerLength})
    this.interval = setInterval(() => this.doTimer(), 1000);
  }

  handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSend(this.state.inputMsg);
      this.setState({ inputMsg: '' });
    }
  }

  handleNameSet = (evt) => {
    if (evt.keyCode === 13) {
      this.props.handleNameSet(this.props.webrtc, this.state.inputMsg);
      this.setState({inputMsg: ''})
    }
  }

  doTimer = () => {
    this.setState({ currentTimer: this.state.currentTimer - 1 })
    if (this.state.currentTimer == 0) {

    }
  }

  generateChats = () => {
    if(this.chatBox) {
      setTimeout(() => { this.chatBox.scrollTop = this.chatBox.scrollHeight; }, 2);
    }
    return this.props.chatLog.map((item) => (
      <div className="chat" key={`chat-${item.name}-${item.timestamp}`}>
        <b className="name" style={{ color: 'grey' }}>{item.name}:</b> <span className="msg">{item.message}</span>
        <br></br>
      </div>
    ));
  }

  handleInputChange = (evt) => this.setState({ inputMsg: evt.target.value });

  render() {
    const { chatLog } = this.props;

    if (this.props.name == '') {
      return (
        <div className="container">
          <div className="chatHeader">
            <h1 className="title">Please Enter Your Name</h1>
            <hr />
          </div>
          <div className="bottomBar">
            <input className="chatInput" type="text" placeholder="..." onKeyUp={this.handleNameSet} onChange={this.handleInputChange} value={this.state.inputMsg} />
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="container">
          <div className="chatHeader">
            <h1 className="title">Current Player: {this.props.currentPlayer}</h1>
            <hr />
          </div>
          <div className="bombBox">
            <div className="circle">
              <p className="prompt">LATO</p>
              <p className="timer">{this.state.currentTimer}</p>
            </div>
          </div>
          <hr />
          <div className="bottomBar">
            <input className="chatInput" type="text" placeholder="" onKeyUp={this.handleKeyUp} onChange={this.handleInputChange} value={this.state.inputMsg} />
          </div>
          <div className="chatBox" ref={(div) => this.chatBox = div}>
            {chatLog.length ? this.generateChats() : (
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
}

export default withWebRTC(ChatBox);