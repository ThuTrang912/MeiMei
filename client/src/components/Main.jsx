import React from 'react';
import Header from './Header/Header';
import Body from './Body/Body';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Information from './Body/Information';
import UpdateData from './Body/UpdateData/UpdateData';
import { SelectedOptionsProvider } from './Body/UpdateData/SelectedOptionsContext';


//test
import test from './Body/test';

const Main = () => {
    return (
        <SelectedOptionsProvider>
            <Router>
                <Header />
                <Switch>
                <Route path="/Information/"><Information /></Route>
                <Route path="/UpdateData" component={UpdateData} />
                <Route path="/test/" component={test} />

                <Body />
                </Switch>
            </Router>
        </SelectedOptionsProvider>
    );
};

export default Main;