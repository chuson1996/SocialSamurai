import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {NavigationBar} from 'components';
// import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded,
	load as loadAuth,
	// logout
} from 'redux/modules/auth';
import {
	load as loadSession,
} from 'redux/modules/session';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isAuthLoaded(getState())) {
			promises.push(dispatch(loadAuth()));
		}
		promises.push(dispatch(loadSession()));

		return Promise.all(promises);
	}
}])
@connect(
	state => ({
		user: state.auth.user
	}),
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

	render() {
		const styles = require('./App.scss');

		return (
			<div className={styles.app + ' container'}>
				<Helmet {...config.app.head}/>
				<NavigationBar />
				<div className={styles.appContent}>
					{this.props.children}
				</div>
			</div>
		);
	}
}
