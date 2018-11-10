/* eslint-disable no-undef */
/* global google */

import React, { Component } from 'react';
import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
//import { withRouter, Link, Redirect, Route, browserHistory } from "react-router-dom";
import { withScriptjs, withGoogleMap, DirectionsRenderer, InfoWindow, GoogleMap, Marker } from "react-google-maps"
//const providerx = firebase.provider;
import Calendar  from 'react-calendar';

const baseurl = "https://api.foursquare.com/v2/venues/explore?client_id=R115HVNIDCG01UMD2PMZAJMBM3EPYZJOCRJXW2RNEEUIZABL&client_secret=ITIEJIPPTZWZSEWTPAGYBQ24D344WZW3KRVKDZDB4NW3DJCN&v=20181030&";

class directionscreen extends Component {


    constructor() {
        super();
        this.state = {
            currentuser: '',
            coords: null,
            locationNear : [],
            showcalender: false,
            date: new Date(),
            time : '',
        };




        this.updateCoords = this.updateCoords.bind(this);
        this.ExploreApiCoords = this.ExploreApiCoords.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.getDirections = this.getDirections.bind(this);
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
                // this.setPosition();
                //console.log("componentDidMount");

                // setTimeout(() => {
                //     this.ExploreApiCoords();
                // }, 2000);
              
               

            } else {
                console.info('Must be authenticated');
                this.props.history.push('/');
            }
        });





    }
    // getDerivedStateFromProps(props ,state)
    // {
    //     console.log(props, "getDerivedStateFromProps", state);
        
    // }

    componentWillMount(){
        //const { locationNear } = this.state;

        //console.log("componentWillMount");
        this.setPosition();

         setTimeout(() => {
             const { coords } = this.state;
             this.ExploreApiCoords(baseurl.concat("ll=", coords.latitude, ",", coords.longitude));
                }, 1000);



        

        //this.setState({ locmarker: marker});

    }
    componentDidUpdate() {
        //console.log("componentDidUpdate");

        
       
        
    }

    // shouldComponentUpdate(){
    //     console.log("shouldComponentUpdate1");
       
    //     console.log("shouldComponentUpdate2");
    // }

    ExploreApiCoords(url) {
        //const { coords } = this.state;


        //console.log("ExploreApiCoords", coords)
        if (url) {
            //let locationNear = [];
            var i = 1;
          
            fetch(url)
                .then(res => res.json())//response type
                .then(data => {

                    if (data) {
                        
                        //console.log(data.response);
                        //console.log(data.response.groups.length);
                         let locations = data.response.groups[0].items;
                 
                 locations.map(explore => {

                      if (i < 5) {
                            let Mlat = explore.venue.location.lat;
                            let Mlng = explore.venue.location.lng;
                           const index = i + 1;

                           // var selectedCoords = {lat: Mlat,Lng:Mlng};
                         
                          var locmarker =  (<Marker
                              key={index}
                              title={explore.venue.name}
                            position={{ lat: Mlat, lng: Mlng }}
                            draggable={true}
                          >  {
                                  <InfoWindow>
                                      <span>{explore.venue.name} <br /><button onClick={this.getDirections.bind(this, { lat: Mlat, Lng: Mlng })}>Get Directions</button><button onClick={this.showCalenderscreen.bind(this, { lat: Mlat, Lng: Mlng }, explore.venue.name)}>Next</button></span>
                                  </InfoWindow>
                            }
                              </Marker>);

                          i>1?
                          this.setState({ 
                            locmarkers: [...this.state.locmarkers ,locmarker] 
                              }) : this.setState({

                                  locmarkers: locmarker
                              })
                          i++;
                        }
                       
                    })


                    }
                   
                    
                }).catch(error => {
                    //console.error('Error:', error)
                }) ;
        }




    }

    


    getDirections(selectedCoords) {

        const { coords } = this.state;
       this.setState({ selectedCoords });
       const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(coords.latitude, coords.longitude),
            destination: new google.maps.LatLng(selectedCoords.lat , selectedCoords.Lng),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                swal("error", "Sorry! Can't calculate directions!", "error")
            }
        });
    }


    onSearch(e){

       // console.log(e.target.value);

        if (e.target.value.length > 4) {
            let url = baseurl.concat("near=", e.target.value);
            //console.log(url);
            this.ExploreApiCoords(url);
        }
    }


    profileScreen4() {
        const { coords, locmarkers, directions} = this.state;


      


        //console.log(coords," profileScreen4");
        //console.log(locationNear, " location ",);
       
        // if (locations) {
        //     locations.map(explore => {
        //         console.log(explore, " item");
        //     })
        //     }
      
        
            
        
        let Mapstyle = { 'textAlign': '-webkit-center', 'marginTop' : '20px'}

        //console.log(locmarkers , " marker");
        return (<div>

        
            <label>Find Location :</label>
            <input className="form-control" onChange={this.onSearch} placeholer="karachi"/>
            <div className="row">
                <div className="col-md-12" style={Mapstyle}>

           
            {coords && <MyMapComponent 
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJdeN0I2e7USVUmXotyl2hzgqKzdfHY1M&amp;v=3.exp&amp;libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `80%`, width: `100%` }} />}
                        containerElement={<div style={{ height: `80vh`, width: `100%` }} />}
                mapElement={<div style={{ height: `80%`, width: `100%` }} />}
                coords={coords}
                locmarker={locmarkers}
                directions={directions}
            />}
                </div>
            </div>


        </div>);

    }


showCalenderscreen(selectedCoords , venue){

    //const { showcalender } = this.state;
    //console.log(selectedCoords," selectedCoords");
    //console.log(venue, " venue");
    
    this.setState({ showcalender: true, selectedCoords , venue});
}




    submitData_db(matchername, matcheruid, selectedCoords, venue, date){

        try {

            const { currentuser } = this.state;
            let useruid = currentuser.uid;
            let userdname = currentuser.displayName;
            let status = "PENDING";

            //console.log(useruid, userdname, status, matchername, matcheruid, selectedCoords, venue, date);

            firebase.db.collection("tblusermeetings").add({ useruid, userdname, matchername, matcheruid, selectedCoords, venue, date, status })
                .then().catch(err => swal('There was an error:', err, "error"))

        } catch (error) {
            swal('There was an error:', error, "error");
        }
       


}

onsendRequest()
{

    const { date, time, selectedCoords, venue } = this.state;

    let matcheruid = localStorage.getItem("matcheruid");
    let matchername = localStorage.getItem("matchername");

    //swal("info","Send the request?","info");

    if (time.length <= 0) {
        swal("error", "Invalid Time", "error");
    }
    else{
        date.setHours(time.slice(0, time.length - 3), time.slice(3, time.length))
        
        this.setState({ date });

        swal({
        title: "Send the request?",
        text: "Do you want to Send the request? " + date + " !!!! " + time,
        icon: "info",
        buttons: ["Cancel", "Yes"],
    })
        .then((isyes) => {
            if (isyes) {

                //console.log(matchername, matcheruid, selectedCoords, venue, date);
                //Submit the Data to database!!!
                this.submitData_db(matchername, matcheruid, selectedCoords, venue, date);

                //console.log("submitted");


                swal("Poof! Your Request has been Sent!", {
                    icon: "success",
                });



                this.props.history.push("/dashboard");
                //this.setState({ showmapdirections : true});

            } else {
                //swal("Your imaginary file is safe!");
            }
        });


    }

}


    onChange = date => this.setState({ date })
    onTimeChange = time => this.setState({ time : time.target.value })


  DateTimeSelectionScreen(){
      let Mapstyle = { 'textAlign': '-webkit-center', 'marginTop': '20px' }

      return (<div>

          <label> Select Date/Time for Meeting</label>
          <input type="time" className="form-control" onChange={this.onTimeChange} />

          <div className="row">
              <div className="col-md-12" style={Mapstyle}>
          <Calendar onChange={this.onChange} value={this.state.date} /> 
          </div>
          </div>

          
          <button className="btn btn-primary" onClick={this.onsendRequest.bind(this)}>Send Request</button>
      </div>);


    }




    render() {

        const { locmarkers, showcalender } = this.state;

        return (<div> {
            !showcalender ?
            locmarkers && this.profileScreen4() :
            this.DateTimeSelectionScreen()

        }</div>)
    }


}




const MyMapComponent = withScriptjs(withGoogleMap((props) =>

    
    props.locmarker ? <GoogleMap 
        defaultZoom={14}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        
        {props.locmarker}
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap> : <div> Loading Map...... </div>
    
))


export default directionscreen;