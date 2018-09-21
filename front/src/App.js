import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField'
import _ from 'lodash'

import Carte from './Components/Carte'

import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged: false,
            lieu: '',
            latitude: 48.8574848,
            longitude: 2.3168774,
            logements: [],
        }
    }

    componentDidMount() {
        fetch('http://localhost/api/logements.php?ville=Paris')
            .then(res => res.json())
            .then(data => {
                const { logements } = data
                this.setState({ logements })
            })

    }

    changeLieu = lieu => {
        if (!lieu) return

        fetch(`http://localhost/api/logements.php?ville=${lieu}`)
            .then(res => res.json())
            .then(data => {
                const { logements } = data
                this.setState({ logements })
            })

        fetch(`http://photon.komoot.de/api/?q=${lieu}&lang=fr&limit=1`)
            .then(res => res.json())
            .then(data => {
                const coordinates =_.get(data, 'features[0].geometry.coordinates')
                if (!coordinates) return

                const [longitude, latitude] = coordinates

                this.setState({
                    latitude,
                    longitude,
                })
            })

        this.setState({ lieu })
    }

  render() {
    return (
      <div className="App">
          <MuiThemeProvider>
              <div>
              <Toolbar style={styles.toolbar} id={"toolbar"}>
                  <ToolbarGroup style={{ display: 'flex', width: '100%' }} id={"toolbarGroup"}>
                      <ToolbarTitle text="CompaLoca - Comparateur de locations"/>
                      <ToolbarSeparator/>
                      <TextField
                          hintText="Lieu"
                          onChange={({target}) => {
                              this.setState({ lieu: target.value})
                              clearTimeout(this.typingTimeout)
                              this.typingTimeout = setTimeout(() => {
                                  this.changeLieu(target.value)
                              }, 1000)
                          }}
                          style={{ margin: 'auto', width: '40%' }}
                          hintStyle={{ color: '#DDD'}}
                          value={this.state.lieu}
                          autoFocus={true}
                      />
                      <React.Fragment>
                          <RaisedButton style={{ marginLeft: 'auto' }} primary={true}>Connexion</RaisedButton>
                          <ToolbarSeparator/>
                          <RaisedButton primary={true}>Inscription</RaisedButton>
                      </React.Fragment>
                  </ToolbarGroup>
                  </Toolbar>
                  <Carte logements={this.state.logements} latitude={this.state.latitude} longitude={this.state.longitude}/>
              </div>
          </MuiThemeProvider>
      </div>
    );
  }
}

const styles = {
    toolbar: {
        backgroundColor: "rgba(70, 153, 135, 0.7)",
        borderBottom: "solid 2px",
    },
}

export default App;
