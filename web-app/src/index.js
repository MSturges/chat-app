import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

import './sass/style.scss';

import * as serviceWorker from './serviceWorker';

import Router from './Router';

import 'typeface-roboto';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    'palette': {
        'common': {
            'black': '#000',
            'white': '#fff'
        },
        'background': {
            'paper': 'rgba(70, 75, 85, 1)',
            // 'paper': 'rgba(69, 80, 108, 1)', // bluish/purple/grey color
            'default': '#fafafa'
        },
        'primary': {
            'light': 'rgba(72, 83, 106, 1)',
            'main': 'rgba(39, 44, 55, 1)',
            'dark': 'rgba(22, 24, 26, 1)',
            'contrastText': '#fff'
        },
        'secondary': {
            'light': 'rgba(87, 204, 235, 1)',
            'main': 'rgba(97, 217, 250, 1)',
            'dark': 'rgba(75, 190, 221, 1)',
            'contrastText': '#fff'
        },
        'error': {
            'light': '#e57373',
            'main': '#f44336',
            'dark': '#d32f2f',
            'contrastText': '#fff'
        },
        'text': {
            'primary': 'rgba(0, 0, 0, 0.87)',
            'secondary': 'rgba(0, 0, 0, 0.54)',
            'disabled': 'rgba(0, 0, 0, 0.38)',
            'hint': 'rgba(0, 0, 0, 0.38)'
        }
    }
});

const store = configureStore();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

const render = Component => {
    return ReactDOM.render(
        <Provider store={ store }>
            <MuiThemeProvider theme={ theme }>
                <Router />
            </MuiThemeProvider>, 
        </Provider>,
        document.getElementById('root')
    );
};

render(Router);

if (module.hot) {
    module.hot.accept('./Router', () => {
        const NextApp = require('./Router').default;
        render(NextApp);
    });
}