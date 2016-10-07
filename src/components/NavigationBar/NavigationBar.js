import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import config from '../../config';
import {browserHistory} from 'react-router';

@connect(state => ({
    user: state.auth.user
}))
class NavigationBar extends React.Component {

    handleLogout = () => {
        localStorage.removeItem('token');
        browserHistory.push('/login');
    };

    render() {
        const styles = require('./NavigationBar.scss');
        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                            <span>{config.app.title}</span>
                        </IndexLink>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>

                <Navbar.Collapse eventKey={0}>
                    <Nav navbar>
                        <LinkContainer to="/roadmap">
                            <NavItem eventKey={1}>Roadmap</NavItem>
                        </LinkContainer>
                    </Nav>

                    {this.props.user && <Nav pullRight>
                        <NavItem eventKey={1} onClick={this.handleLogout}>Logout</NavItem>
                    </Nav>}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavigationBar.propTypes = {
    user: PropTypes.object
};

export default NavigationBar;