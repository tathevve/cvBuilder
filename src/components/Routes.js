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



const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={ Personal}/>
            <Route path="/CVLook" exact component={CVLook} />
            <Route path="/work" exact component={Work} />
            <Route path="/education" exact component={Education} />
            <Route path="/honorsandawards" exact component={HonorsAndAwards} />
            <Route path="/skills" exact component={Skills} />
            <Route path="/hobbies" exact component={Hobbies} />
            <Route path="/languages" exact component={Languages} />

        </Switch>
    );
  };
  
  export default Routes;