import React, { Component } from 'react';
import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
import { withRouter, Link, Redirect, Route, browserHistory } from "react-router-dom";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const providerx = firebase.provider;




class Mapscreen extends Component {


    constructor() {
        super();
        this.state = {
            currentuser: '',
            coords: null,
        };




        this.updateCoords = this.updateCoords.bind(this);
        
    }




    setPosition() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({ coords: position.coords })
        });
    }

    updateCoords({ latitude, longitude }) {
        this.setState({ coords: { latitude, longitude } })
    }


    componentDidMount() {

        
        this.setPosition();
    
    }



    profileScreen4() {
        const { coords } = this.state;

        return (
            <div>

                {coords && <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `80%`, width: `100%` }} />}
                    containerElement={<div style={{ height: `80vh`, width: `100vh` }} />}
                    mapElement={<div style={{ height: `80%`, width: `100%` }} />}
                    coords={coords}
                    updateCoords={this.updateCoords}
                />}

                <input type="button" value="submit" />
            </div>

        );
    }


    render(){


        return(<div>{this.profileScreen4()}</div>)
    }


}


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        {props.isMarkerShown &&
            <Marker
                position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
                draggable={true}
                onDragEnd={position => {
                    props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
                }}
            />}
    </GoogleMap>
))


export default Mapscreen;