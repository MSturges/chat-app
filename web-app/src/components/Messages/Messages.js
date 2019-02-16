import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';

class Messages extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <Typography variant='h1' color='secondary'>
                    Messages Content
                </Typography>
            </React.Fragment>
        );
    }
}

export default Messages;