import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Index from './pages/index';
import Request from './pages/request';
import login from './pages/login';
import Register from './pages/register';
import Pending from './pages/pending';
export default function Routes (){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/request" component={Request} />
                <Route path="/login" component={login} />
                <Route path="/register" component={Register} />
                <Route path="/pending" component={Pending} />
            </Switch>
        </BrowserRouter>
    );
}