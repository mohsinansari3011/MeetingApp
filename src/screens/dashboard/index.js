import React, { Component } from 'react';
import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
import { Link } from "react-router-dom";

//const providerx = firebase.provider;

class Dashboard extends Component {



    constructor() {
        super();
        this.state = {

            currentuser: '',
           
            p1:true,
            p2:false,
            p3:false,

            meetinglist :false,

            list: [], 
            nickname:'',
            phonenumber:'',
            //imagepath1: '',
            //imagepath2: '',
            //imagepath3: '',
            currentimage :'image1',
            beverages : [],
            duration : [],
            gotomap :false,
        };


       
        this.NextS1 = this.NextS1.bind(this);
        this.NextS2 = this.NextS2.bind(this);
        this.BackS2 = this.BackS2.bind(this);
        this.BackS3 = this.BackS3.bind(this);
        this.showMeetingList = this.showMeetingList.bind(this);
        //this.readURL = this.readURL.bind(this);
    }




    handlenickname(e){
        //const {nickname} = this.state;
        const niname = e.target.value;
        this.setState({
            nickname:niname,
        })

        localStorage.setItem("niname", e.target.value);
    }


    handlephone(e) {
        //const { phonenumber } = this.state;
        const pnumber = e.target.value;
        this.setState({
            phonenumber: pnumber,
        })

        localStorage.setItem("pnumber", e.target.value);
    }

    NextS1(){

        const { phonenumber, nickname } = this.state;
        console.log(nickname, " nickname ", phonenumber, " phonenumber ");

if(nickname.length > 0 && phonenumber.length>0)
{
        this.setState({
            p1: false,
            p2: true,
            p3: false,

        })
    
} else { swal("badjob!","Select Data") }
    }


    NextS2() {

        //const { p1, p2, p3, p4 } = this.state;
        var img1 = localStorage.getItem("image1");
        var img2 = localStorage.getItem("image2");
        var img3 = localStorage.getItem("image3");

        if (img1 != null && img2 != null && img3 != null){
        if (img1.length > 0 && img2.length > 0 && img3.length > 0) {
            this.setState({
                p1: false,
                p2: false,
                p3: true,


            })

        } else { swal("badjob!", "Select All Images") }
        } else { swal("badjob!", "Select All Images") }

        
    }

   



    BackS3() {

        //const { p1, p2, p3, p4 } = this.state;

        this.setState({
            p1: false,
            p2: true,
            p3: false,
          

        })
    }

    BackS2() {

        //const { p1, p2, p3, p4 } = this.state;

        this.setState({
            p1: true,
            p2: false,
            p3: false,
           

        })
    }



    
    componentDidUpdate(){

       const img1 = localStorage.getItem("image1");
       const img2 = localStorage.getItem("image2");
       const img3 = localStorage.getItem("image3");

       if (img1 != null && img2 != null && img3 != null) {
           if (img1.length > 0 && img2.length > 0 && img3.length > 0) {

               //console.log(document.getElementById("image1"));
               if (document.getElementById("image1") && document.getElementById("image2") && document.getElementById("image3")){
               document.getElementById("image1").setAttribute('src', img1);
               document.getElementById("image2").setAttribute("src", img2);
               document.getElementById("image3").setAttribute("src", img3)
               }
           }
       }

   }
    componentDidMount() {
     
        firebase.auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ currentuser: user });
            } else {
                console.info('Must be authenticated');
                this.props.history.push('/');
            }
        });

        
    }
    

LogoutFromAccount(){

    firebase.auth.signOut().then(function () {
        console.log('Signed Out');
    }, function (error) {
        console.error('Sign Out Error', error);
    });

}

profileScreen1(){


    return( <div>
        <input type="text" value={this.state.nickname} onChange={this.handlenickname.bind(this)} placeholder="nickname"/>
        <input type="text" value={this.state.phonenumber} onChange={this.handlephone.bind(this)} placeholder="phone number" />
        <br /><br />
        <input type="button" value="next" onClick={this.NextS1} />

    </div>);
}


clickfile(e){
    //console.log(e.target.id);

    //const { currentimage} = this.state;

    this.setState({
        currentimage: e.target.id,
    })

    if (document.getElementById('fileInput1'))
    {
        document.getElementById('fileInput1').click();
    }
}


changefile(e){

    const { currentimage } = this.state;
    //console.log(currentimage,"currentimage id");
    //console.log(e.target.files[0]);


  

    var imgpath = '';
    if (e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            imgpath = e.target.result;
            document.getElementById(currentimage).setAttribute('src', e.target.result)
            localStorage.setItem(currentimage,imgpath)
        };

        

        reader.readAsDataURL(e.target.files[0]);
    }

    
    // if(imgpath.length > 0){
    // if (currentimage == "image1") {
    //     this.setState({
    //         imagepath1: imgpath,
    //     });
    // }
    // if (currentimage == "image2") {
    //     this.setState({
    //         imagepath2: imgpath,
    //     });
    // }
    // if (currentimage == "image3") {
    //     this.setState({
    //         imagepath3: imgpath,
    //     });
    // }
    // }

}

    profileScreen2() {


        return (<div>
            <h1>Select Images</h1>
           
            <input onChange={this.changefile.bind(this)} id="fileInput1" type="file" style={{ display:"none",}} />
            <img id="image1" alt="picutre" src="http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg"
                alt="" className="logo" width="120" height="120" onClick={this.clickfile.bind(this)}/>
            <br/>
            <img id="image2" alt="picutre" src="http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg"
                alt="" className="logo" width="120" height="120" onClick={this.clickfile.bind(this)} />
            <br />
            <img id="image3" alt="picutre" src="http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg"
                alt="" className="logo" width="120" height="120" onClick={this.clickfile.bind(this)} />
            <br />
            <input type="button" value="back" onClick={this.BackS2} />
            <input type="button" value="next" onClick={this.NextS2}/>

        </div>);
    }



    selectbeverages(e){

        const { beverages } = this.state;

        console.log("value  ", e.target.value);
        if (e.target.checked){
            beverages.push(e.target.value);
        }else{
            var index = beverages.indexOf(e.target.value);
            if (index > -1) {
                beverages.splice(index, 1);
            }
        }
       
        this.setState({
            beverages,
        })
        console.log(beverages);
        
        localStorage.setItem("beverages", beverages);

        this.checkbevearages();
    }


    selectduration(e) {

        const { duration } = this.state;

        console.log("value  ", e.target.value);
        if (e.target.checked) {
            duration.push(e.target.value);
        } else {
            var index = duration.indexOf(e.target.value);
            if (index > -1) {
                duration.splice(index, 1);
            }
        }

        this.setState({
            duration,
        })
        //console.log("JSON.stringify(duration)   ",JSON.stringify(duration));

        localStorage.setItem("duration", duration);

        this.checkbevearages();
    }


    checkbevearages(){

        const { gotomap } = this.state;
        const duration = localStorage.getItem("duration");
        const beverages = localStorage.getItem("beverages");
        

        //console.log("JSON.parse(duration)  ",JSON.parse(duration));
        if (duration != null && beverages != null)
        {
            if(duration.length > 0 && beverages.length > 0)
            {
                this.setState({
                    gotomap : true,
                })
            }else{
                this.setState({
                    gotomap: false,
                })
            }
        }else{
            this.setState({
                gotomap: false,
            })
        }

    }

    profileScreen3() {

        const { gotomap } = this.state;

        return (<div>
            <h1>Select Beverages</h1>
            <img alt="Coffee" src="https://via.placeholder.com/350x150" height="25px" width="25px" />
            <input type="checkbox" onChange={this.selectbeverages.bind(this)} value="Coffee" id="cbcoffee" /> <label htmlFor="cbcoffee">Coffee</label>
            
            <img alt="Juice" src="https://via.placeholder.com/350x150" height="25px" width="25px" />
            <input type="checkbox" onChange={this.selectbeverages.bind(this)} value="Juice" id="cbjuice" /><label htmlFor="cbjuice">Juice</label> 
            
            <img alt="Cocktail" src="https://via.placeholder.com/350x150" height="25px" width="25px" />
            <input type="checkbox" onChange={this.selectbeverages.bind(this)} value="Cocktail" id="cbcocktail" /><label htmlFor="cbcocktail">Cocktail</label>
            

            <br/><br/>
            duration of meeting
            <input type="checkbox" onChange={this.selectduration.bind(this)} value="20" id="cb20" /> <label htmlFor="cb20">20 Min </label>
            <input type="checkbox" onChange={this.selectduration.bind(this)} value="60" id="cb60" /> <label htmlFor="cb60">40 Min </label>
            <input type="checkbox" onChange={this.selectduration.bind(this)} value="120" id="cb120" /> <label htmlFor="cb120">120 Min </label>
            <br /><br />
            <input type="button" value="back" onClick={this.BackS3}/>

            {gotomap && <Link to="/maps"> <input type="button" value="next" /> </Link> }
            

        </div>);
    }



    


getAllusers(){


    const { currentuser } = this.state;

    if (currentuser) {

        firebase.db.collection("tbluserprofile").where("uid", "==", currentuser.uid).get()
            .then((query) => {
                query.forEach(((doc) => {

                    let mybev = doc.data().beverages;
                    let mydur = doc.data().duration;
                    //mydur = doc.data().duration;
                    this.setState({ beverages : mybev, duration:mydur });
                }))
            })


        //this.setState({ mybeverages: mybev, duration: mydur, meetinglist: true});

this.setState({meetinglist:true });
}


}


    showMeetingList(){

        this.getMeetingList();

        
        let ids = localStorage.getItem("uniqueid");
        const idarry = ids.split(',');

        const data = firebase.db.collection("tbluserprofile").get();

        

        // firebase.db.collection("tbluserprofile").get().then((query) => {
        //         query.forEach(((bev) => {

        //             if (idarry.includes(bev.data().uid)) {
                       
                        
                        
        //                 return (<div>this is get meeting list
                       
                            

        //                 </div>);


        //             }
                    
                    
                   

        //         }))
        //     })


        console.log(data);
        return (<div>this is get meeting list
            
        {
                data.then((query) => {
                    query.forEach(((bev) => {

                        console.log(bev);

                    }))
                })}
    
        </div>);
        // console.log(arrobj);
        // console.log(arrobj.length);
        // return(<div>this is get meeting list

        //     {arrobj.map((element,index) => {
        //         return(<li>{element}</li>)
        //     })}

        // </div>);
    }

getMeetingList(){

    const { beverages, duration} = this.state;


    //console.log(beverages, "showMeetingList");
    //console.log(beverages.length, "showMeetingList");

    let bevarr = [];
    if (beverages.length > 0) {
        for (let index = 0; index < beverages.length; index++) {

            firebase.db.collection("tbluserprofile").
                where("beverages", "array-contains", beverages[index]).get().then((query) => {
                    query.forEach(((bev) => {


                        //console.log(bev.data().uid);
                        bevarr.push(bev.data().uid);
                        localStorage.setItem("mybev", bevarr);
                     
                    }))
                })
        }
    }


    let durarr = [];
    if (duration.length > 0) {
        for (let index = 0; index < duration.length; index++) {

            firebase.db.collection("tbluserprofile").
                where("duration", "array-contains", duration[index]).get().then((query) => {
                    query.forEach(((bev) => {


                        //console.log(bev.data().uid);
                        durarr.push(bev.data().uid);
                        localStorage.setItem("mydur", durarr);
                     
                    }))
                })
        }
    }




   
        // this will filter and show data for meeting!!
                setTimeout(() => {

                    //console.log("showMeetingData");
                    let mydur = localStorage.getItem("mydur");
                    let mybev = localStorage.getItem("mybev");

                    if (mydur != null && mybev != null) {


                        //filter given data firebase!!!
                        let arruid = [... new Set(mydur.split(','))].concat([... new Set(mybev.split(','))]);
                        let uniqueid = [... new Set(arruid)];

                        if (uniqueid.length > 0) {
                            localStorage.removeItem("mydur");
                            localStorage.removeItem("mybev");
                            localStorage.setItem("uniqueid", uniqueid);
                            console.log(uniqueid);
                        }
                    }

                }, 3000);
    


    }

    
    render() {


        const { currentuser, p1, p2, p3 , meetinglist } = this.state
        const dashboardsrc = localStorage.getItem("dashboard");
        //console.log(currentuser ," render2");
        return (<div> <h1>Dashboard!!! </h1> 
           

            
            {currentuser ? <ul>
                {currentuser.providerData.map((user) =>{
                    return(
                        <li>Welcome {user.displayName}--{user.email}</li>
                    )}
                )}
            </ul>:<div></div>
            
                
            }

            
            {dashboardsrc === "showmeeting" ? <div>

                {meetinglist ? <div>
                    {this.showMeetingList()} 
                </div> : <div>“You haven’t done any meeting yet!”, try creating a new meeting! And a button, “Set a meeting!”.
             <button onClick={this.getAllusers.bind(this)}>Set a Meeting!!</button> </div>}
             
              </div> : <div> 

                    {p1 && !p2 && !p3 && this.profileScreen1()}
                    {!p1 && p2 && !p3 && this.profileScreen2()}
                    {!p1 && !p2 && p3 && this.profileScreen3()}

              </div>}
    
            
                <button onClick={this.LogoutFromAccount.bind(this)} type="submit" className="btn btn-primary">Logout</button>
          
        </div>
        );
    }


}





export default Dashboard;