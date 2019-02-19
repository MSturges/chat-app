import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ViewIcon from '@material-ui/icons/Visibility';
import HomeIcon from '@material-ui/icons/Home';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import SignInIcon from '@material-ui/icons/Fingerprint';
import SignUpIcon from '@material-ui/icons/CheckCircle';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 15,
        width: '100%',
        maxWidth: '165px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
            maxWidth: 'none',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class PrimarySearchAppBar extends React.Component {
    state = {
        anchorEl: null,
        authAnchorEl: null,
        mobileMoreAnchorEl: null,
    };

    handleResize = () => {
        if (this.state.anchorEl ||
            this.state.authAnchorEl ||
            this.state.mobileMoreAnchorEl) {
            this.handleMenuClose();
        }
    };

    componentDidMount = () => {
        // resize handler
        this.myListenerWithContext = this.handleResize.bind(this);

        // close menus after window resize to avoid misplacement of dropdowns
        window.addEventListener('resize', this.myListenerWithContext);
    };

    componentWillUnmount = () => {
        // stop listening to resize after component unmounts
        window.removeEventListener('resize', this.myListenerWithContext);
    };

    handleNotificationsMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleAuthMenuOpen = event => {
        this.setState({ authAnchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null, authAnchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
        const { anchorEl, authAnchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isNotificationsMenuOpen = Boolean(anchorEl);
        const isAuthMenuOpen = Boolean(authAnchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu anchorEl={ anchorEl }
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={ isNotificationsMenuOpen }
                  onClose={ this.handleMenuClose }>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                              this.props.history.push('/notifications');
                              this.handleMenuClose();
                          }}>
                    <ViewIcon /> &nbsp; View All
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ this.handleMenuClose }>
                    <NotificationsIcon /> &nbsp; Notifications Will Go Here
                </MenuItem>
            </Menu>
        );

        const renderAuthMenu = (
            <Menu anchorEl={ authAnchorEl }
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={ isAuthMenuOpen }
                  onClose={ this.handleMenuClose }>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                              this.props.history.push('/profile');
                              this.handleMenuClose();
                          }}>
                    <PersonIcon /> &nbsp; Profile
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                              this.props.history.push('/sign-in');
                              this.handleMenuClose();
                          }}>
                    <SignInIcon /> &nbsp; Sign In
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                              this.props.history.push('/sign-up');
                              this.handleMenuClose();
                          }}>
                    <SignUpIcon /> &nbsp; Sign Up
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                              this.handleMenuClose();
                          }}>
                    <SignOutIcon /> &nbsp; Sign Out
                </MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu anchorEl={ mobileMoreAnchorEl }
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={ isMobileMenuOpen }
                  onClose={ this.handleMenuClose }>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <HomeIcon />
                    </IconButton>
                    <p>Home</p>
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/ask');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <QuestionAnswerIcon />
                    </IconButton>
                    <p>Ask a Question</p>
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/messages');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <Badge badgeContent={ 4 } color='secondary'>
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/notifications');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <Badge badgeContent={ 11 } color='secondary'>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <Divider />
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/profile');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/sign-in');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <SignInIcon />
                    </IconButton>
                    <p>Sign In</p>
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/sign-up');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <SignUpIcon />
                    </IconButton>
                    <p>Sign Up</p>
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/sign-out');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <SignOutIcon />
                    </IconButton>
                    <p>Sign Out</p>
                </MenuItem>
                <Divider />
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/faqs');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <LiveHelpIcon />
                    </IconButton>
                    <p>FAQs</p>
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/settings');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <SettingsIcon />
                    </IconButton>
                    <p>Settings</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div>
                <AppBar position='fixed' classes={{ root: this.props.customClass}}>
                    <Toolbar>
                        <Typography className={ classes.title } variant='h6' color='inherit' noWrap>
                            Qs n Paids
                        </Typography>
                        <div className={ classes.search }>
                            <div className={ classes.searchIcon }>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder='Search…'
                                       classes={{
                                           root: classes.inputRoot,
                                           input: classes.inputInput,
                                       }} />
                        </div>
                        <div className={ classes.grow } />
                        <div className={ classes.sectionDesktop }>
                            <IconButton color='inherit' onClick={ () => this.props.history.push('/messages') }>
                                <Badge badgeContent={ 4 } color='secondary'>
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-owns={ isNotificationsMenuOpen ? 'material-appbar' : undefined }
                                        aria-haspopup='true'
                                        onClick={ this.handleNotificationsMenuOpen }
                                        color='inherit'>
                                <Badge badgeContent={ 17 } color='secondary'>
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-owns={ isAuthMenuOpen ? 'material-appbar' : undefined }
                                        aria-haspopup='true'
                                        onClick={ this.handleAuthMenuOpen }
                                        color='inherit'>
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={ classes.sectionMobile }>
                            <IconButton aria-haspopup='true' onClick={ this.handleMobileMenuOpen } color='inherit'>
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                { renderMenu }
                { renderAuthMenu }
                { renderMobileMenu }
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(PrimarySearchAppBar));