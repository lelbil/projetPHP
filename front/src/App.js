import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Add } from 'material-ui-icons'
import Drawer from 'material-ui/Drawer'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Slider from 'material-ui/Slider'
import DatePicker from 'hotel-datepicker'
import _ from 'lodash'

import Carte from './Components/Carte'

import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged: false,
            filtersOpen: true,
            lieu: '',
            latitude: 48.8574848,
            longitude: 2.3168774,
            logements: [
                {
                    "id": "1",
                    "intitule": "Appartement 2 pièces",
                    "loyer": "500",
                    "latitude": "48.8425",
                    "longitude": "2.33259",
                    "ville": "Paris"
                },
                {
                    "id": "2",
                    "intitule": "Petit Studio ",
                    "loyer": "600",
                    "latitude": "48.8352",
                    "longitude": "2.35822",
                    "ville": "Paris"
                },
                {
                    "id": "3",
                    "intitule": "Chambre privée dans un appartement",
                    "loyer": "434",
                    "latitude": "48.8918",
                    "longitude": "2.36034",
                    "ville": "Paris"
                },
                {
                    "id": "4",
                    "intitule": "Place de Parking",
                    "loyer": "121",
                    "latitude": "48.8343",
                    "longitude": "2.25532",
                    "ville": "PARIS"
                }
            ],
        }
    }

    componentDidMount() {
        new DatePicker(document.getElementById('input-id'), {});
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
                      <ToolbarTitle text="CompaLoca - Slogan"/>
                      <ToolbarSeparator/>
                      <React.Fragment>
                          <RaisedButton style={{ marginLeft: 'auto' }} primary={true}>Connexion</RaisedButton>
                          <ToolbarSeparator/>
                          <RaisedButton primary={true}>Inscription</RaisedButton>
                      </React.Fragment>
                  </ToolbarGroup>
                  </Toolbar>
                  <Drawer containerStyle={{overflow: "visible"}} open={this.state.filtersOpen}>
                      <TextField
                          floatingLabelText="Lieu"
                          onChange={({target}) => {
                              this.setState({ lieu: target.value})
                              clearTimeout(this.typingTimeout)
                              this.typingTimeout = setTimeout(() => {
                                      this.changeLieu(target.value)
                                  }, 1000)

                          }}
                          value={this.state.lieu}
                      />
                      <Slider/>
                      <Slider/>
                      <TextField floatingLabelText="dates" id="input-id" type="text"/>
                      <Checkbox
                          label="Appartement"
                          checked={true}
                          onCheck={() => {console.log('CI')}}
                      />
                  </Drawer>
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
