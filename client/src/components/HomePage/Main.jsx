import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';
import Header from './HeaderPage/Header';
import Navigation from './Navigation';
import MyHomePage from './BodyPage/MyHomePage';
import ContactPage from './BodyPage/ContactPage';
import ManageAccount from './BodyPage/ManageAccount';
import InformationPage from './BodyPage/InformationPage';
import LoginPage from '../LoginPage/LoginPage';
import { SelectedOptionsProvider } from '../SelectedOptionsContext';

const Main = () => {
  const { contact_id } = useParams();
  const id_card = JSON.parse(localStorage.getItem('currentUser'))?.data?.id_card;

  if (id_card) {
    return (
      <div className="box-border w-screen h-screen overflow-auto" style={{ backgroundImage: 'linear-gradient(#0E3A36,#00584A,#007758,#009860,#34A05F,#2E9059,#287F52,#0C844B,#047645,#185541,#13473B,#0E3A36)' }}>
        <SelectedOptionsProvider>
          <BrowserRouter>
            <Header />
            <Navigation />
            <Switch>
              <Route exact path="/MyHomePage/:id_card/:contact_id"><MyHomePage /></Route>
              <Route path="/ContactPage"><ContactPage /></Route>
              <Route path='/ManageAccount'><ManageAccount /></Route>
              <Route path='/InformationPage/:id_card/:contact_id'><InformationPage /></Route>
              <Redirect to={`/MyHomePage/${id_card}/${contact_id}`} />
            </Switch>
          </BrowserRouter>
        </SelectedOptionsProvider>
      </div>
    );
  } else {
    // Redirect to the home page
    window.location.href = "/";
    // You might also use the 'useHistory' hook for navigation
    // useHistory().push("/");
    return null; // or return something else if needed
  }
}

export default Main;
