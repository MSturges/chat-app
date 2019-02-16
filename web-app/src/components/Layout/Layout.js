import React from 'react';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import TopNav from '../TopNav/TopNav';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        maxWidth: '100%',
        wordBreak: 'break-all',
        padding: theme.spacing.unit * 3,
    },
});

class ResponsiveDrawer extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    getIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'home':
                return <HomeIcon />;
                
            case 'ask a question':
                return <QuestionAnswerIcon />;

            case 'faqs':
                return <LiveHelpIcon />;

            case 'settings':
                return <SettingsIcon />;
        
            default:
                return <InboxIcon />;
        }
    };

    navigate = (text) => {
        switch (text.toLowerCase()) {
            case 'home':
                this.props.history.push('/');
            break;

            case 'ask a question':
                this.props.history.push('/ask');
            break;

            case 'faqs':
                this.props.history.push('/faqs');
            break;

            case 'settings':
                this.props.history.push('/settings');
            break;
        
            default:
                this.props.history.push('/');
            break;
        }
    };

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div className='layout'>
                <div className={ `${classes.toolbar} toolbar` }>
                    <Typography variant='h6' color='inherit' noWrap>
                        Qs n Paids
                    </Typography>
                </div>

                <Divider />
                <List>
                    { [ 'Home', 'Ask a Question' ].map((text, index) => (
                        <ListItem button key={ text } onClick={ () => this.navigate(text) }>
                            <ListItemIcon classes={{ root: 'grey-icon' }}>{ this.getIcon(text) }</ListItemIcon>
                            <ListItemText primary={ text } classes={{ root: 'white-text' }}/>
                        </ListItem>
                    )) }
                </List>
                <Divider />
                <List>
                    { [ 'FAQs', 'Settings' ].map((text, index) => (
                        <ListItem button key={ text } onClick={ () => this.navigate(text) }>
                            <ListItemIcon classes={{ root: 'grey-icon' }}>{ this.getIcon(text) }</ListItemIcon>
                            <ListItemText primary={ text } classes={{ root: 'white-text' }} />
                        </ListItem>
                    )) }
                </List>
            </div>
        );

        return (
            <div className={ classes.root }>
                <CssBaseline />

                <TopNav customClass={ classes.appBar } />

                <nav className={ classes.drawer }>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation='css'>
                        <Drawer container={ this.props.container }
                                variant='temporary'
                                anchor={ theme.direction === 'rtl' ? 'right' : 'left' }
                                open={ this.state.mobileOpen }
                                onClose={ this.handleDrawerToggle }
                                classes={{
                                    paper: classes.drawerPaper,
                                }}>
                            { drawer }
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation='css'>
                        <Drawer classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant='permanent'
                                open>
                            { drawer }
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={ classes.content }>
                    { this.props.routes }
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(ResponsiveDrawer));