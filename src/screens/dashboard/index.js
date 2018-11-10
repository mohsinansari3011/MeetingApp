import React, { Component } from 'react';
import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
import { Link } from "react-router-dom";
import accepting from "../../images/accept.png"
import rejecting from "../../images/deny.png"
import defaultimg from '../../images/default.jpg'

import AddToCalendar from 'react-add-to-calendar'
import { Card, CardWrapper } from 'react-swipeable-cards';



// firebase.db.collection("tblusermeetings")
//     .onSnapshot(function (snapshot) {
//         snapshot.docChanges().forEach(function (change) {
//             if (change.type === "added") {
//                 console.log("New matchername: ", change.doc.data().matchername);
//             }
//             if (change.type === "modified") {
//                 console.log("Modified matchername: ", change.doc.data().matchername);
//             }
//             if (change.type === "removed") {
//                 console.log("Removed matchername: ", change.doc.data().matchername);
//             }
//         });
//     });



class MyEndCard extends Component {
    render() {
        return (
            <div>You Finished Swiping!</div>
        );
    }
}

class Dashboard extends Component {



    constructor() {
        super();
        this.state = {

            currentuser: '',

            p1: false,
            p2: false,
            p3: false,

            meetinglist: false,

            list: [],
            nickname: '',
            phonenumber: '',
            currentimage: 'image1',
            beverages: [],
            duration: [],
            gotomap: false,
            meetData: [],
           
            booluserMeeting : false,
        };



        this.NextS1 = this.NextS1.bind(this);
        this.NextS2 = this.NextS2.bind(this);
        this.BackS2 = this.BackS2.bind(this);
        this.BackS3 = this.BackS3.bind(this);
        this.setMeetingListCards = this.setMeetingListCards.bind(this);
        this.setUserMeeting = this.setUserMeeting.bind(this);
        this.getAllrequest = this.getAllrequest.bind(this);
        //this.readURL = this.readURL.bind(this);
    }




    handlenickname(e) {
        //const {nickname} = this.state;
        const niname = e.target.value;
        this.setState({
            nickname: niname,
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



   
    
    NextS1() {

        const { phonenumber, nickname } = this.state;
        //console.log(nickname, " nickname ", phonenumber, " phonenumber ");

        if (nickname.length > 0 && phonenumber.length > 0) {
            this.setState({
                p1: false,
                p2: true,
                p3: false,

            })

        } else { swal("badjob!", "Select Data") }
    }


    NextS2() {

        //const { p1, p2, p3, p4 } = this.state;
        var img1 = localStorage.getItem("image1");
        var img2 = localStorage.getItem("image2");
        var img3 = localStorage.getItem("image3");

        if (img1 != null && img2 != null && img3 != null) {
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




    componentDidUpdate() {

        // const img1 = localStorage.getItem("image1");
        // const img2 = localStorage.getItem("image2");
        // const img3 = localStorage.getItem("image3");

        // if (img1 != null && img2 != null && img3 != null) {
        //     if (img1.length > 0 && img2.length > 0 && img3.length > 0) {

        //         //console.log(document.getElementById("image1"));
        //         if (document.getElementById("image1") && document.getElementById("image2") && document.getElementById("image3")) {
        //             document.getElementById("image1").setAttribute('src', img1);
        //             document.getElementById("image2").setAttribute("src", img2);
        //             document.getElementById("image3").setAttribute("src", img3)
        //         }
        //     }
        // }

    }



    getCurrentUser(currentuser) {
        if (currentuser) {
            var currentuseruid = '';
            firebase.db.collection("tbluserprofile").where("uid", "==", currentuser.uid).get()
                .then((query) => {
                    if (query) {
                        query.forEach((doc) => {
                            currentuseruid = doc.data().uid;
                        });
                    }
                    if (currentuseruid) {
                        this.setState({ currentuseruid });
                    } else {
                        this.setState({ p1: true });
                    }
                })
        }
        else{
            this.setState({ p1: true});
        }
    }

    componentDidMount() {

        firebase.auth.onAuthStateChanged(user => {
            if (user) {

                this.getCurrentUser(user);
                this.setState({ currentuser: user });
            } else {
                console.info('Must be authenticated');
                this.props.history.push('/');
            }
        });


    }


    LogoutFromAccount() {

        firebase.auth.signOut().then(function () {
            console.log('Signed Out');
        }, function (error) {
            console.error('Sign Out Error', error);
        });

    }

    profileScreen1() {


        return (<div>
            <label>NickName : </label>
            <input type="text" className="form-control" value={this.state.nickname} onChange={this.handlenickname.bind(this)} placeholder="nickname" />
            <label>Phone : </label>
            <input type="number" className="form-control" value={this.state.phonenumber} onChange={this.handlephone.bind(this)} placeholder="phone number" />
            <br />
            <input className="btn btn-primary" type="button" value="next" onClick={this.NextS1} />

        </div>);
    }


    clickfile(e) {

        this.setState({
            currentimage: e.target.id,
        })

        if (document.getElementById('fileInput1')) {
            document.getElementById('fileInput1').click();
        }
    }


    changefile(e) {

        const { currentimage } = this.state;
        var imgpath = '';
        if (e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imgpath = e.target.result;
                document.getElementById(currentimage).setAttribute('src', e.target.result)
                localStorage.setItem(currentimage, imgpath)
            };



            reader.readAsDataURL(e.target.files[0]);
        }
    }



    profileScreen2() {


        return (<div>
            <h1>Select Images</h1>

        <div className="col-md-12">

            <input onChange={this.changefile.bind(this)} id="fileInput1" type="file" style={{ display: "none", }} />
            
                <div className="col-md-4">
            <img id="image1" alt="picutre" src="http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg"
                alt="" className="logo" width="120" height="120" onClick={this.clickfile.bind(this)} />
          </div>
                <div className="col-md-4">
            <img id="image2" alt="picutre" src="http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg"
                alt="" className="logo" width="120" height="120" onClick={this.clickfile.bind(this)} />
         </div>
                <div className="col-md-4">
            <img id="image3" alt="picutre" src="http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg"
                alt="" className="logo" width="120" height="120" onClick={this.clickfile.bind(this)} />
            </div>
            </div>

            <br />
            <input className="btn btn-primary"  type="button" value="back" onClick={this.BackS2} />
            <input className="btn btn-primary"  type="button" value="next" onClick={this.NextS2} />

        </div>);
    }



    selectbeverages(e) {

        const { beverages } = this.state;

        console.log("value  ", e.target.value);
        if (e.target.checked) {
            beverages.push(e.target.value);
        } else {
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


    checkbevearages() {

        //const { gotomap } = this.state;
        const duration = localStorage.getItem("duration");
        const beverages = localStorage.getItem("beverages");


        //console.log("JSON.parse(duration)  ",JSON.parse(duration));
        if (duration != null && beverages != null) {
            if (duration.length > 0 && beverages.length > 0) {
                this.setState({
                    gotomap: true,
                })
            } else {
                this.setState({
                    gotomap: false,
                })
            }
        } else {
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


            <br /><br />
            duration of meeting
            <input type="checkbox" onChange={this.selectduration.bind(this)} value="20" id="cb20" /> <label htmlFor="cb20">20 Min </label>
            <input type="checkbox" onChange={this.selectduration.bind(this)} value="60" id="cb60" /> <label htmlFor="cb60">40 Min </label>
            <input type="checkbox" onChange={this.selectduration.bind(this)} value="120" id="cb120" /> <label htmlFor="cb120">120 Min </label>
            <br /><br />
            <input type="button" value="back" onClick={this.BackS3} />

            {gotomap && <Link to="/maps"> <input type="button" value="next" /> </Link>}


        </div>);
    }




getSelection(){

    firebase.db.collection("tblusermeetings")
        .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log("", doc.data().matchername);
            });
        });
}





    getAllusers() {


        const { currentuser } = this.state;

        if (currentuser) {
            var meetingArray = [];
            firebase.db.collection("tbluserprofile").get()
                .then((query) => {
                    if (query) {
                        query.forEach((doc) => {
                            meetingArray.push(doc.data());
                        });
                    }

                    if (meetingArray) {
                        this.setState({ meetData: meetingArray, meetinglist: true });
                    }


                })

        }

    }


    setUserMeeting() {

        const {userMeeting} = this.state;


        
        let icon = { 'calendar-plus-o': 'left' };

        let items = [{ outlook: 'Outlook' },
        { outlookcom: 'Outlook.com' },
        { apple: 'Apple Calendar' },
        { yahoo: 'Yahoo' },
        { google: 'Google' }
        ];

       


        return(userMeeting.map((data,i) => {

            let event = {
                title: "Meeting B/W " + data.matchername + " and "+ data.userdname,
                description: 'This is the Reminder For Meeting event Orginized by MeetoApp',
                location: data.venue,
                startTime: data.date,
                endTime: data.date
            };

            return (<div key={i} className="col-md-4"> 
              <div className="gallery">
                <a>
                      <img src={defaultimg} alt="DefultImage" width="300" height="200"/>
                </a>
                  <div className="desc">{data.matchername} <br/>
                      {data.venue}<br />
                      {data.userdname}<br />
                      {data.status}<br />

                        <AddToCalendar className="btn btn-primary" event={event} buttonLabel="Put on my calendar" buttonTemplate={icon} listItems={items} />
                  </div>
                </div>
               
              </div>);
        })


        );
        //this.setState({ booluserMeeting: true })
    
        
    }


    getAllrequest() {
        const { currentuser } = this.state;
        if (currentuser) {

            var userMeeting = [];
          firebase.db.collection("tblusermeetings").where("useruid", "==", currentuser.uid).get()
                .then((query) => {
                          query ? query.forEach((doc) => {
                              userMeeting.push(doc.data());
                            }) : <li>NotFound</li>
                    this.setState({ userMeeting, booluserMeeting: true });
                    //console.log(userMeeting, " after");
                    })

            //console.log(userMeeting);
           
        }


        

    }



    // onSwipe(data, dat ) {
    //     console.log("I was swiped.", dat, data);
    // }

    onSwipeLeft(data) {
        console.log("I was swiped left.");
    }

    onSwipeRight(displayname , uid) {
        console.log("I was swiped right.", displayname);
        //swal("Meet", "Do you want to meet " + dat,"info")

        swal({
            title: "Lets Meet People here",
            text: "Do you want to meet " + displayname +" !!!!",
            icon: "info",
            buttons: ["No", "Yes"],

        })
            .then((isyes) => {
                if (isyes) {

                    // swal("Poof! Your Meeting has been fixed!", {
                    //     icon: "success",
                    // });

                    localStorage.setItem("matchername", displayname );
                    localStorage.setItem("matcheruid", uid);
                    this.props.history.push("/directions");
                    //this.setState({ showmapdirections : true});

                } else {
                    //swal("Your imaginary file is safe!");
                }
            });



    }

    onDoubleTap(data) {
        console.log("I was double tapped.");
    }



    setMeetingListCards() {

        const { meetData } = this.state;

        //console.log(meetData);

        const ShowMeetingArray = meetData.map((doc) => {


            return (
                <Card
                    key={doc.uid}
                    //onSwipe={this.onSwipe.bind(this, doc.displayname)}
                    onSwipeLeft={this.onSwipeLeft.bind(this)}
                    onSwipeRight={this.onSwipeRight.bind(this, doc.displayname, doc.uid)}
                    onDoubleTap={this.onDoubleTap.bind(this)}>


                    <div className="gallery">
                        <a>
                            <img className="imggal" src={doc.image1} alt="5Terre" width="600" height="400" />
                        </a>
                        <div className="desc">
                            <div className="col-md-4 text-center"> <img src={rejecting} alt="check" width="25" height="25" /> </div>
                            <div className="col-md-4 text-center"> <p> {doc.displayname} <br /> {doc.email}</p> </div>
                            <div className="col-md-4 text-center"> <img src={accepting} alt="check" width="25" height="25" onClick={this.onSwipeRight.bind(this, doc.displayname, doc.uid)} /> </div>
                        </div>
                    </div>

                </Card>
            );




        });


        try {
            return (<div> <h1>Select A person for a Meeting!!</h1> <CardWrapper addEndCard={this.getEndCard.bind(this)}>
                {ShowMeetingArray}
            </CardWrapper>   </div>);

        } catch (error) {
            console.log(error);
        }





    }


    getEndCard() {
        return (
            <MyEndCard />
        );
    }





    // End Meeting list


   





    render() {


        const { currentuser, p1, p2, p3, meetinglist, currentuseruid, booluserMeeting} = this.state
        //const dashboardsrc = localStorage.getItem("dashboard");
        //console.log(currentuser ," render2");

        if (currentuseruid) {
            this.getAllrequest();
        }
        return (<div> <h1>Dashboard!!! </h1>



            {currentuser ? <ul>
                {currentuser.providerData.map((user, index) => {
                    return (
                        <li key={index}> Welcome {user.displayName}--{user.email}</li>
                    )
                }
                )}
            </ul> : <div></div>


            }


            {
              
                    <div>
                        {currentuseruid ? <div>

                           {meetinglist ? <div>
                           {this.setMeetingListCards()}
                            </div> : <div>“You haven’t done any meeting yet!”, try creating a new meeting! And a button, “Set a meeting!”.
                             
                                    {booluserMeeting ? this.setUserMeeting() : <div></div>} 

                                <button className="btn btn-primary" onClick={this.getAllusers.bind(this)}>Set a Meeting!!</button>
            </div>}

                        </div> : <div>

                                {p1 && !p2 && !p3 && this.profileScreen1()}
                                {!p1 && p2 && !p3 && this.profileScreen2()}
                                {!p1 && !p2 && p3 && this.profileScreen3()}

                            </div>
                        }

                    </div> 

            }

            <br/>
            <button onClick={this.LogoutFromAccount.bind(this)} type="submit" className="btn btn-primary">Logout</button>

        </div>
        );
    }


}





export default Dashboard;