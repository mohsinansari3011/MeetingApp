import React, { Component } from 'react';
import swal from 'sweetalert';
import * as firebase from '../../config/firebase'


const providerx = firebase.provider;

class Dashboard extends Component {



    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        };


       
    }



   

    






    render() {




        return (<div> <h1>Dashboard!!! </h1> 

            <button type="submit" className="btn btn-primary">Logout With Facebook</button>

        </div>
        )
    }


}

export default Dashboard;