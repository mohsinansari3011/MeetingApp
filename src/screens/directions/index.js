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

                setTimeout(() => {
                    this.ExploreApiCoords();
                }, 2000);
              
               

            } else {
                console.info('Must be authenticated');
                this.props.history.push('/');
            }
        });





    }


    componentWillMount(){

        //console.log("componentWillMount");
       
    }
    componentDidUpdate() {
        //console.log("componentDidUpdate");

        
       
        
    }

    // shouldComponentUpdate(){
    //     console.log("shouldComponentUpdate1");
       
    //     console.log("shouldComponentUpdate2");
    // }

    ExploreApiCoords() {
        const { coords } = this.state;
        console.log("ExploreApiCoords", coords)
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
                          

                          locationNear.push({ Coordinates: { latitude: lat, longitude: lng } } );
                            //console.log(explore.venue.id, explore.venue.name, explore.venue.location.address
                            //, explore.venue.location.lat, explore.venue.location.lng);
                          i++;
                      }
                       
                    })
                });

            //console.log(locationNear, " locationNear");
            this.setState({ locations : locationNear});
        }




    }



    profileScreen4() {
        const { coords, locations} = this.state;
       
        //console.log(coords," profileScreen4");
        console.log(locations, " locationNearprofileScreen4");

        if (locations) {
            locations.map(explore => {
                console.log(explore, " item");
            })
            }
      

        return (<div>

            {coords && <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `80%`, width: `100%` }} />}
                containerElement={<div style={{ height: `80vh`, width: `100vh` }} />}
                mapElement={<div style={{ height: `80%`, width: `100%` }} />}
                coords={coords}
                //coordslocations={locationNear}
            />}


        </div>);

    }








    render() {

        //const { locationNear } = this.state;
        //console.log("render", coords);
        
        return (<div> {this.profileScreen4() }</div>)
    }


}




const MyMapComponent = withScriptjs(withGoogleMap((props) =>

    
    <GoogleMap 
        defaultZoom={14}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        {/* {console.log(props.coordslocations, " prop1")}
        {props.coordslocations ? props.coordslocations.map(data => {  
            { console.log(data , " prop") }

            
    
        }): <div>aasdasd</div> } */}

       
       

        


    </GoogleMap>
    
))


export default directionscreen;