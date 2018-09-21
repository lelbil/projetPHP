import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default class Carte extends Component {
    state = {
        zoom: 13,
    }

    render() {
        const position = [this.props.latitude, this.props.longitude]
        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.props.logements.map(logement => {
                    return (
                        <Marker key={logement.id} position={[logement.latitude, logement.longitude]}>
                            <Popup>
                                <h4>{logement.intitule}</h4>
                                <h5><strong>{logement.loyer}</strong>€/mois</h5>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>
        )
    }
}