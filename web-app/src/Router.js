import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

const Home = asyncComponent({
    resolve: () => import('./components/Home/Home')
});

class Router extends PureComponent {
    render() {
        return (    
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={ Home } />
                    <Redirect from='*' to='/' />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;