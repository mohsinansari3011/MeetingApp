import React, { Component } from 'react';
import { withRouter, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import * as Screens from '../screens'


const Routes = () => (
    <Router>
        <div>
            <Route exact path="/" component={Screens.LoginScreen} />
            {/* <PrivateRoute path="/dashboard" component={Screens.Dashboard} />
            <Route path="/addForm" component={Screens.AddForm} /> */}
        </div>
    </Router>
);