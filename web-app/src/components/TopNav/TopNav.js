import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
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
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
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
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
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
        mobileMoreAnchorEl: null,
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu anchorEl={ anchorEl }
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={ isMenuOpen }
                  onClose={ this.handleMenuClose }>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ this.handleMenuClose }>
                    <MailIcon /> &nbsp; Notifications Will Go Here
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
                        <AccountCircle />
                    </IconButton>
                    <p>Home</p>
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
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/ask');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <AccountCircle />
                    </IconButton>
                    <p>Ask a Question</p>
                </MenuItem>
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
                            this.props.history.push('/faqs');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <AccountCircle />
                    </IconButton>
                    <p>FAQs</p>
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/settings');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <AccountCircle />
                    </IconButton>
                    <p>Settings</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div>
                <AppBar position='fixed' classes={{ root: this.props.customClass}}>
                    <Toolbar>
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
                            <IconButton aria-owns={ isMenuOpen ? 'material-appbar' : undefined }
                                        aria-haspopup='true'
                                        onClick={ this.handleProfileMenuOpen }
                                        color='inherit'>
                                <Badge badgeContent={17} color='secondary'>
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton color='inherit' onClick={ () => this.props.history.push('/profile') }>
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
                { renderMobileMenu }
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(PrimarySearchAppBar));