import React from 'react';
import './WordBomb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Progress, Card, CardHeader, CardSubtitle, CardBody } from 'reactstrap';

class WordBomb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionaries: null,
      letterPrompts: null,
      selectedDictionary: null,
      usedWords: null,
      players: [],
      lives: []
    };
  }

  onButtonClick = () => {
    let newUsedWords = this.state.usedWords
    newUsedWords.push('Lato')
    this.setState({usedWords: newUsedWords})
    
    let formBody = {'Dictionary': this.state.selectedDictionary, 'Used Words': this.state.usedWords, 
                    'Players': this.state.players, 'Lives': this.state.lives}

    const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formBody)
    };
    fetch('http://localhost:5000/game', requestOptions)
        .then(response => response.json());
  }

  updateDictionaries = (apiResponse) => {
    this.setState({dictionaries: apiResponse})
  }

  updateLetterPrompts = (apiResponse) => {
    this.setState({letterPrompts: apiResponse})
  }
  
  updateGameInfo = (apiResponse) => {
    this.setState({selectedDictionary: apiResponse[1]})
    this.setState({usedWords: apiResponse[2]})
    this.setState({players: apiResponse[3]})
    this.setState({lives: apiResponse[4]})
  }

  fetchData = () => {
    fetch('http://localhost:5000/dictionaries')
    .then(
        (response) => {
            if (response.status === 200) {
              return (response.json()) ;
            }
            else {
                console.log("HTTP error:" + response.status + ":" +  response.statusText);
                return ([ ["status ", response.status]]);
            }
        }
        )
    .then ((jsonOutput) => {
                this.updateDictionaries(jsonOutput);
            }
          )
    .catch((error) =>  {
                console.log(error);
                this.updateDictionaries(null);
            } )

    fetch('http://localhost:5000/letterprompts')
    .then(
        (response) => {
            if (response.status === 200) {
              return (response.json()) ;
            }
            else {
                console.log("HTTP error:" + response.status + ":" +  response.statusText);
                return ([ ["status ", response.status]]);
            }
        }
        )
    .then ((jsonOutput) => {
                this.updateLetterPrompts(jsonOutput);
            }
          )
    .catch((error) => {
                console.log(error);
                this.updateLetterPrompts(null);
            } )
  }

  fetchGameInfo = () => {
    fetch('http://localhost:5000/game')
    .then(
        (response) => {
            if (response.status === 200) {
              return (response.json()) ;
            }
            else {
                console.log("HTTP error:" + response.status + ":" +  response.statusText);
                return ([ ["status ", response.status]]);
            }
        }
        )
    .then ((jsonOutput) => {
                this.updateGameInfo(jsonOutput);
            }
          )
    .catch((error) => {
                console.log(error);
                this.updateGameInfo(null);
            } )
  }

  componentDidMount() {
    this.fetchData();
    this.fetchGameInfo();
  }

  render() {
    if (this.state.dictionaries === null || this.state.letter_prompts === null)
      return (<div><p>No data returned from server</p></div>)
    else
    {
    return (
      <div className="Background">
        <Container className="Banner">
          <h1>
          <b>Word Bomb</b>
          </h1>
          
          <h2>
            Biny 500 TV
          </h2>

          <br></br>
        </Container>

        <Container className="Game">
          <Row sm={12} md={12} lg={12}>
            <Button
              onClick={this.onButtonClick}
            >
              {this.state.usedWords}
            </Button>
          </Row>
  
          <Row>
            <Col sm={12} md={6} lg={4}>
              
            </Col>
  
          </Row>
        </Container>
      </div>
    );
    }
  }
}

export default WordBomb;