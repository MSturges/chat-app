import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';

class Profile extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <Typography variant='h3' color='secondary'>
                    Profile Content
                </Typography>
            </React.Fragment>
        );
    }
}

export default Profile;