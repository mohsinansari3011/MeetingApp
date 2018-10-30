import React, { Component } from 'react';
//import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
//import { withRouter, Link, Redirect, Route, browserHistory } from "react-router-dom";
import { withScriptjs, withGoogleMap, InfoWindow, GoogleMap, Marker, GoogleApiWrapper } from "react-google-maps"
//const providerx = firebase.provider;




class directionscreen extends Component {


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

        firebase.auth.onAuthStateChanged(user => {
            if (user) {
             
                this.setState({ currentuser: user });
                this.setPosition();
                console.log("componentDidMount");
            } else {
                console.info('Must be authenticated');
                this.props.history.push('/');
            }
        });





    }
    componentDidUpdate() {
        console.log("componentDidUpdate");
        this.ExploreApiCoords();
    }

    // shouldComponentUpdate(){
    //     console.log("shouldComponentUpdate1");
       
    //     console.log("shouldComponentUpdate2");
    // }

    ExploreApiCoords() {
        const { coords } = this.state;
        //console.log("ExploreApiCoords", coords)
        if (coords) {
            let locationNear = [];
            var i = 1;
            let baseurl = "https://api.foursquare.com/v2/venues/explore?client_id=R115HVNIDCG01UMD2PMZAJMBM3EPYZJOCRJXW2RNEEUIZABL&client_secret=ITIEJIPPTZWZSEWTPAGYBQ24D344WZW3KRVKDZDB4NW3DJCN&v=20181030&ll=";
            let url = baseurl.concat(coords.latitude, ",", coords.longitude);
            fetch(url)
                .then(res => res.json())//response type
                .then(data => {
                    let locations = data.response.groups[0].items;
                 
                 locations.map(explore => {

                      if (i < 4) {
                            let lat = explore.venue.location.lat;
                            let lng = explore.venue.location.lng;
                          

                          locationNear.push({ coords : { lat, lng } } );
                            //console.log(explore.venue.id, explore.venue.name, explore.venue.location.address
                            //, explore.venue.location.lat, explore.venue.location.lng);
                          i++;
                      }
                       
                    })
                });

            //console.log(locationNear, " locationNear");
            //this.setState({ locationNear});
        }




    }



    profileScreen4() {
        const { coords, locationNear } = this.state;
       
        console.log(locationNear);
        return (<div>

            {coords && <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `80%`, width: `100%` }} />}
                containerElement={<div style={{ height: `80vh`, width: `100vh` }} />}
                mapElement={<div style={{ height: `80%`, width: `100%` }} />}
                coords={coords}
            />}


        </div>);

    }








    render() {

        const { coords } = this.state;
        //console.log("render", coords);
        
        return (<div> {coords ? this.profileScreen4() : <div>this is next</div> }</div>)
    }


}




const MyMapComponent = withScriptjs(withGoogleMap((props) =>

    
    <GoogleMap
        defaultZoom={14}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        {console.log(localStorage.getItem("neardata"))}
        {/* { props.coords.map(data => {  
            { console.log(data , " prop") }

            
    
        })} */}

       
       

        


    </GoogleMap>
    
))


export default directionscreen;