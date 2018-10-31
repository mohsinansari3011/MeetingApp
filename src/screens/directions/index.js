import React, { Component } from 'react';
import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
//import { withRouter, Link, Redirect, Route, browserHistory } from "react-router-dom";
import { withScriptjs, withGoogleMap, InfoWindow, GoogleMap, Marker, GoogleApiWrapper } from "react-google-maps"
//const providerx = firebase.provider;
import Calendar from 'react-calendar';



class directionscreen extends Component {


    constructor() {
        super();
        this.state = {
            currentuser: '',
            coords: null,
            locationNear : [],
            showcalender: false,
            date: new Date(),
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
                // this.setPosition();
                console.log("componentDidMount");

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

        console.log("componentWillMount");
        this.setPosition();

         setTimeout(() => {
                this.ExploreApiCoords();
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

    ExploreApiCoords() {
        const { coords, locmarkers } = this.state;
        //console.log("ExploreApiCoords", coords)
        if (coords) {
            //let locationNear = [];
            var i = 1;
            let baseurl = "https://api.foursquare.com/v2/venues/explore?client_id=R115HVNIDCG01UMD2PMZAJMBM3EPYZJOCRJXW2RNEEUIZABL&client_secret=ITIEJIPPTZWZSEWTPAGYBQ24D344WZW3KRVKDZDB4NW3DJCN&v=20181030&ll=";
            let url = baseurl.concat(coords.latitude, ",", coords.longitude);
            fetch(url)
                .then(res => res.json())//response type
                .then(data => {
                    let locations = data.response.groups[0].items;
                 
                 locations.map(explore => {

                      if (i < 5) {
                            let Mlat = explore.venue.location.lat;
                            let Mlng = explore.venue.location.lng;
                           const index = i + 1;


                         
                          var locmarker =  (<Marker
                              key={index}
                              title={explore.venue.name}
                            position={{ lat: Mlat, lng: Mlng }}
                            draggable={true}
                          >  {
                                  <InfoWindow>
                                      <span>{explore.venue.name} <br /><button>Get Directions</button><button onClick={this.showCalenderscreen.bind(this)}>Next</button></span>
                                  </InfoWindow>
                            }
                              </Marker>);

                          i>1?
                          this.setState({ 
                                  
                            locmarkers: [...this.state.locmarkers ,locmarker] 
                        
                              }) : this.setState({

                                  locmarkers: locmarker

                              })


                        //   this.setState({
                        //       locationNear: this.state.locationNear.concat(
                        //           {
                        //               nearlocations: {
                        //                   coordinates: { latitude: Mlat, longitude: Mlng }, venue: explore.venue.name
                        //               }
                        //             }
                        //       )
                            
                        //       }
                        //     )
                          //locationNear.push({ coordinates: { latitude: lat, longitude: lng } } );
                          //console.log(explore.venue.id, explore.venue.name, explore.venue.location.address
                          //, explore.venue.location.lat, explore.venue.location.lng);
                         
                          i++;
                        }
                       
                    })
                    
                });

            //console.log(locationNear, " locationNear");
            
        }




    }

    

    profileScreen4() {
        const { coords, locmarkers} = this.state;


      


        //console.log(coords," profileScreen4");
        //console.log(locationNear, " location ",);
       
        // if (locations) {
        //     locations.map(explore => {
        //         console.log(explore, " item");
        //     })
        //     }
      
        
            
        


        //console.log(locmarkers , " marker");
        return (<div>



            {coords && <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `80%`, width: `100%` }} />}
                containerElement={<div style={{ height: `80vh`, width: `100vh` }} />}
                mapElement={<div style={{ height: `80%`, width: `100%` }} />}
                coords={coords}
                locmarker={locmarkers}
               
            />}


        </div>);

    }


showCalenderscreen(){

    //const { showcalender } = this.state;

    this.setState({ showcalender : true});
}


onChange = date => this.setState({ date })

onsendRequest()
{

    const { date } = this.state;

    //swal("info","Send the request?","info");

    swal({
        title: "Send the request?",
        text: "Do you want to Send the request? " + date +" !!!!",
        icon: "info",
        buttons: ["Cancel", "Yes"],
    })
        .then((isyes) => {
            if (isyes) {
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


  DateTimeSelectionScreen(){

      return (<div><Calendar
          onChange={this.onChange}
          value={this.state.date}
      />
          <div>  <button onClick={this.onsendRequest.bind(this)}>Send Request</button> </div>
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
        defaultZoom={12}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        
        {props.locmarker}

    </GoogleMap> : <div> Loading Map...... </div>
    
))


export default directionscreen;