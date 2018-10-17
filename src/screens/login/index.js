import React, { Component } from 'react';
import swal from 'sweetalert';

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
  auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
      var CurrentuseR = res.user.uid;
      var currentdate = new Date();

      db.collection("tblusers").doc(res.user.uid).set({ email, password, currentdate})
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

        <button type="submit" onClick={this.signUpfirebase} className="btn btn-primary">Login With Facebook</button>




    </div>
    )
}


}

export default login;