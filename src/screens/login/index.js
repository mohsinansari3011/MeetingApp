import React, { Component } from 'react';
import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
import { withRouter, Link, Redirect, Route, browserHistory  } from "react-router-dom";

const providerx = firebase.provider;


class login extends Component {


    
constructor() {
    super();
    this.state = {
        email: '',
        password: '',
    };


    this.signUpfirebase = this.signUpfirebase.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.login = this.login.bind(this);
}





    componentDidMount() {
        //this.setPosition();
        const { currentuser } = this.state;
        console.log("currentuser ** ", currentuser);
        firebase.auth.onAuthStateChanged(function (user) {

            console.log("user **", user);
            if (user) {
                let currentuserdata = [];
                if (user != null) {
                    user.providerData.forEach(function (profile) {
                        currentuserdata.push({
                            'provider': profile.providerId,
                            'name': profile.displayName,
                            'rmail': profile.email,
                            'photourl': profile.photoURL,
                            'uid': profile.uid
                        })

                        //console.log(currentuserdata);
                        // console.log("Sign-in provider: " + profile.providerId);
                        // console.log("  Provider-specific UID: " + profile.uid);
                        // console.log("  Name: " + profile.displayName);
                        // console.log("  Email: " + profile.email);
                        // console.log("  Photo URL: " + profile.photoURL);
                    });

                   console.log("already logged in!!");
                    browserHistory.push('/dashboard');

                   
                }

               

            } else {
                console.log("user Logout");
            }
        });

    }
    
    login() {
        
        const { currentuser } = this.state;
        firebase.auth.signInWithPopup(providerx).then(function (result) {
            var user = result.user;
            //console.log(user);
            let currentuserdata = [];
            if (user != null) {
                user.providerData.forEach(function (profile) {
                    currentuserdata.push({
                        'provider': profile.providerId,
                        'name': profile.displayName,
                        'rmail': profile.email,
                        'photourl': profile.photoURL,
                        'uid': profile.uid
                    })

                    console.log(currentuserdata);
                    console.log("logged in Successfully!!");
                 
                    // console.log("Sign-in provider: " + profile.providerId);
                    // console.log("  Provider-specific UID: " + profile.uid);
                    // console.log("  Name: " + profile.displayName);
                    // console.log("  Email: " + profile.email);
                    // console.log("  Photo URL: " + profile.photoURL);
                });

               
            }

            this.setState({
                currentuser: currentuserdata
            });


        }).catch(function (error) {

        });
    }



    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }
    handleChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }


    

signUpfirebase(){

  const { email, password } = this.state;
  //console.log(email,password)
  firebase.auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
      var CurrentuseR = res.user.uid;
      var currentdate = new Date();

      firebase.db.collection("tblusers").doc(res.user.uid).set({ email, password, currentdate})
        .then(() => {
          localStorage.setItem("userid", CurrentuseR);
          localStorage.setItem("useremail", email);
          this.setState({ islogin: true });

          this.Loginfirebase(email, password);
          
        }).catch((e) => {
          console.error("Unable to insert in Database");
        })
    }).catch((error) => {
      if (error.message == "The email address is already in use by another account.") {
        this.Loginfirebase(email, password);
      }else{
        swal("Bad job!", error.message, "error");
        console.log("-" + error.message + "-", "errMessage");
      }
      
    })


}



render() {




    return (<div> <h1>Login!!! </h1> <h6> if dont have account insert for signup!!! </h6>

        <div className="form-group">

            <div className="form-group">
                <label>Email Address :</label>
                <input type="text" onChange={this.handleChangeEmail} className="form-control" />
            </div>
            <div className="form-group">
                <label>Password :</label>
                <input type="password" onChange={this.handleChangePassword} className="form-control" />
            </div>
        </div>

        <button type="submit" onClick={this.signUpfirebase} className="btn btn-primary">Submit</button>

        <button type="submit" onClick={this.login} className="btn btn-primary">Login With Facebook</button>
        <Link to="/dashboard">dashboard</Link>



    </div>
    )
}


}

export default login;