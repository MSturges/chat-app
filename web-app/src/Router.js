import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

import Layout from './components/Layout/Layout';

const Home = asyncComponent({
    resolve: () => import('./components/Home/Home')
});

const AskAQuestion = asyncComponent({
    resolve: () => import('./components/AskAQuestion/AskAQuestion')
});

const FAQs = asyncComponent({
    resolve: () => import('./components/FAQs/FAQs')
});

const Settings = asyncComponent({
    resolve: () => import('./components/Settings/Settings')
});

const Profile = asyncComponent({
    resolve: () => import('./components/Profile/Profile')
});

const Messages = asyncComponent({
    resolve: () => import('./components/Messages/Messages')
});

const Notifications = asyncComponent({
    resolve: () => import('./components/Notifications/Notifications')
});

const SignIn = asyncComponent({
    resolve: () => import('./components/SignIn/SignIn')
});

const SignUp = asyncComponent({
    resolve: () => import('./components/SignUp/SignUp')
});

class Router extends PureComponent {
    render() {
        let routes = (
            <Switch>
                <Route exact path='/' component={ Home } />
                <Route exact path='/ask' component={ AskAQuestion } />
                <Route exact path='/faqs' component={ FAQs } />
                <Route exact path='/settings' component={ Settings } />
                <Route exact path='/profile' component={ Profile } />
                <Route exact path='/messages' component={ Messages } />
                <Route exact path='/notifications' component={ Notifications } />
                <Route exact path='/sign-in' component={ SignIn } />
                <Route exact path='/sign-up' component={ SignUp } />
                <Redirect from='*' to='/' />
            </Switch>
        );

        return (    
            <React.Fragment>
                <BrowserRouter>
                    <Layout routes={ routes }/>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

export default Router;