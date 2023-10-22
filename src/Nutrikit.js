import React from 'react';
import './Nutrikit.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Progress, Card, CardHeader, CardSubtitle, CardBody } from 'reactstrap';

class Nutrikit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionaries: null,
      letter_prompts: null
    };
  }

  updateDictionaries = (apiResponse) => {
    this.setState({dictionaries: apiResponse})
  }

  updateLetterPrompts = (apiResponse) => {
    this.setState({letter_prompts: apiResponse})
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

  componentDidMount() {
    this.fetchData();
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

export default Nutrikit;