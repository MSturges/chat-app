import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';

class Notifications extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <Typography variant='h3' color='secondary'>
                    Notifications Content
                </Typography>
            </React.Fragment>
        );
    }
}

export default Notifications;