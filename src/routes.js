import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Index from './pages/index';
import login from './pages/login';
import Pending from './pages/pending';
import Approved from './pages/approved';
export default function Routes (){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={login} />
                <Route path="/home" component={Index} />
                <Route path="/pending" component={Pending} />
                <Route path="/approved" component={Approved} />
            </Switch>
        </BrowserRouter>
    );
}