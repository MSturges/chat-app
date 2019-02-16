import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';

class Home extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <Typography variant='h3' color='secondary'>
                    Home Content
                </Typography>
            </React.Fragment>
        );
    }
}

export default Home;