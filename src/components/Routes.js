import React from "react";
import {Route, Switch} from "react-router-dom";
import CVLook from "./CVLook";
import Education from "./Education";
import Personal from "./Personal";
import Work from "./Work";
import HonorsAndAwards from "./HonorsAndAwards";
import Skills from "./Skills";
import Hobbies from "./Hobbies";
import Languages from "./Languages";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";



const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={ Login }/>
            <PrivateRoute path='/personal' exact component={ Personal }/>
            <PrivateRoute path="/CVLook" exact component={CVLook} />
            <PrivateRoute path="/work" exact component={Work} />
            <PrivateRoute path="/education" exact component={Education} />
            <PrivateRoute path="/honorsandawards" exact component={HonorsAndAwards} />
            <PrivateRoute path="/skills" exact component={Skills} />
            <PrivateRoute path="/hobbies" exact component={Hobbies} />
            <PrivateRoute path="/languages" exact component={Languages} />

        </Switch>
    );
  };
  
  export default Routes;