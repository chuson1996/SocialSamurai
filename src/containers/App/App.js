import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
// import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
// import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		// if (!isInfoLoaded(getState())) {
		// 	promises.push(dispatch(loadInfo()));
		// }
		// if (!isAuthLoaded(getState())) {
		// 	promises.push(dispatch(loadAuth()));
		// }

		return Promise.all(promises);
	}
}])
@connect(
	state => ({user: state.auth.user}),
	{
		// logout,
		pushState: push
	}
)
export default class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired,
		user: PropTypes.object,
		// logout: PropTypes.func.isRequired,
		pushState: PropTypes.func.isRequired
	};

	static contextTypes = {
		store: PropTypes.object.isRequired
	};

	componentWillReceiveProps(nextProps) {
		if (!this.props.user && nextProps.user) {
			// login
			this.props.pushState('/loginSuccess');
		} else if (this.props.user && !nextProps.user) {
			// logout
			this.props.pushState('/');
		}
	}

	handleLogout = (event) => {
		event.preventDefault();
		// this.props.logout();
	};

	render() {
		const styles = require('./App.scss');

		return (
			<div className={styles.app + ' container'}>
				<Helmet {...config.app.head}/>
				<Navbar fixedTop>
					<Navbar.Header>
						<Navbar.Brand>
							<IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
								{/* <div className={styles.brand}/> */}
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

							<LinkContainer to="/mysubmit">
								<NavItem eventKey={2}>My submit</NavItem>
							</LinkContainer>

							<LinkContainer to="/others">
								<NavItem eventKey={3}>Other's videos</NavItem>
							</LinkContainer>

							<LinkContainer to="/blog">
								<NavItem eventKey={4}>Blog</NavItem>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				<div className={styles.appContent}>
					{this.props.children}
				</div>
			</div>
		);
	}
}
