import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';

import Hero from '../Hero/Hero';

class Home extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <Hero />

                <Typography variant='h1' color='secondary'>
                    Home Content
                </Typography>
            </React.Fragment>
        );
    }
}

export default Home;