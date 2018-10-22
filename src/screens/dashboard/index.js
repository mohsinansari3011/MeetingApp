import React, { Component } from 'react';
import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
import { withRouter, Link, Redirect, Route, browserHistory } from "react-router-dom";
const providerx = firebase.provider;

class Dashboard extends Component {



    constructor() {
        super();
        this.state = {

            currentuser: '',
           
            p1:true,
            p2:false,
            p3:false,
        };


       
        this.NextS1 = this.NextS1.bind(this);
        this.NextS2 = this.NextS2.bind(this);
        this.BackS2 = this.BackS2.bind(this);
        this.BackS3 = this.BackS3.bind(this);
    }




    NextS1(){

        const {p1,p2,p3,p4} = this.state;

        this.setState({
            p1: false,
            p2: true,
            p3: false,

        })
    }


    NextS2() {

        const { p1, p2, p3, p4 } = this.state;

        this.setState({
            p1: false,
            p2: false,
            p3: true,
           

        })
    }

   



    BackS3() {

        const { p1, p2, p3, p4 } = this.state;

        this.setState({
            p1: false,
            p2: true,
            p3: false,
          

        })
    }

    BackS2() {

        const { p1, p2, p3, p4 } = this.state;

        this.setState({
            p1: true,
            p2: false,
            p3: false,
           

        })
    }



    
   
    componentDidMount() {
     
        firebase.auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ currentuser: user.providerData });
            } else {
                console.info('Must be authenticated');
                this.props.history.push('/');
            }
        });
    }
    



profileScreen1(){


    return( <div>
        <input type="text" placeholder="nickname"/>
        <input type="text" placeholder="phone number" />
        <br /><br />
        <input type="button" value="next" onClick={this.NextS1} />

    </div>);
}

    profileScreen2() {


        return (<div>
            <h1>Select Images</h1>
            <img src="https://via.placeholder.com/350x150" height="100px" width="200px"/>
            <br/>
            <img src="https://via.placeholder.com/350x150" height="100px" width="200px" />
            <br />
            <img src="https://via.placeholder.com/350x150" height="100px" width="200px" />
            <br />
            <input type="button" value="back" onClick={this.BackS2} />
            <input type="button" value="next" onClick={this.NextS2}/>

        </div>);
    }
    profileScreen3() {


        return (<div>
            <h1>Select Beverages</h1>
            <img src="https://via.placeholder.com/350x150" height="25px" width="25px" />
            <input type="checkbox" value="Coffee" /> Coffee 
            
            <img src="https://via.placeholder.com/350x150" height="25px" width="25px" />
            <input type="checkbox" value="Juice" />Juice 
            
            <img src="https://via.placeholder.com/350x150" height="25px" width="25px" />
            <input type="checkbox" value="Cocktail" />Cocktail
            

            <br/><br/>
            duration of meeting
            <input type="checkbox" value="20" /> 20 Min 
            <input type="checkbox" value="60" /> 60 Min 
            <input type="checkbox" value="120" /> 120 Min 
            <br /><br />
            <input type="button" value="back" onClick={this.BackS3}/>

            <Link to="/maps"> 
            <input type="button" value="next" onClick={this.NextS3} />
            </Link>

        </div>);
    }



    



    
    render() {


        const { currentuser, p1, p2, p3 } = this.state
        console.log(currentuser ," render2");
        return (<div> <h1>Dashboard!!! </h1> 
           

            
            {currentuser ? <ul>
                {currentuser.map((user) =>{
                    return(
                        <li>Welcome {user.displayName}--{user.email}</li>
                    )}
                )}
            </ul>:<div></div>
            
                
            }

            

            {p1 && !p2 && !p3 && this.profileScreen1()}
            {!p1 && p2 && !p3 && this.profileScreen2()}
            {!p1 && !p2 && p3 && this.profileScreen3()}
          

            <Link to="/"> 
            <button type="submit" className="btn btn-primary">Logout With Facebook</button>
            </Link>
        </div>
        );
    }


}





export default Dashboard;