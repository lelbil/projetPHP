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

import Carte from './Components/Carte'

import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged: false,
            filtersOpen: true,
        }
    }

    componentDidMount() {
        //new DatePicker(document.getElementById('input-id'), {});
    }

  render() {
    return (
      <div className="App">
          <MuiThemeProvider>
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
              <div>
                 <Carte/>
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
