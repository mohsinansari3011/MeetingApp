import React, { Component } from 'react';
import './App.css';
import * as firebase from './config/firebase'
import logo from './logo.svg';
import Routes from './config/router'


//const providerx = firebase.provider;

class App extends Component {


constructor(prop){

	super(prop)


	this.state = {
		
		currentuser: null
	};

	// this.login = this.login.bind(this);
	this.logout = this.logout.bind(this);
	
}

	


	

	logout() {
		//firebase.auth.signOut().then()
		firebase.auth.signOut().then(function (result) {
			var user = result;
			console.log(user);
			// this.setState({
			// 	currentuser: null
			// })


		}).catch(function (error) {
			console.error("error** ", error);
		});
	}

	



  render() {

  

	 
	  

	  return (
		  <div className="App">
			  <header className="App-header-a">
				  <img src={logo} className="App-logo" alt="logo" />
				  <h1 className="App-title">Meetoo App</h1>
			  </header>
			  <div className="container">
				  <Routes />
			  </div>
		  </div>
	  )
  }

}





export default App;
