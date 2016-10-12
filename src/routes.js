import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import get from 'lodash/get';
import { isLoaded as isSessionLoaded, load as loadSession } from 'redux/modules/session';
import {
		App,
		Home,
		NotFound,
		Challenge,
		Login,
		Register
	} from 'containers';
import combineMiddlewaresGenerator from 'utils/combineMiddlewaresGenerator';

export default (store) => {
	const combine = combineMiddlewaresGenerator(store);


	const requireLogin = (_store, nextState, action) => {
		function checkAuth() {
			const { auth: { loaded }} = _store.getState();
			if (!loaded) {
				// oops, not logged in, so can't be here!
				action.replace('/login');
			}
			action.next();
		}

		if (!isAuthLoaded(_store.getState())) {
			_store.dispatch(loadAuth())
				.then(checkAuth)
				.catch(checkAuth);
		} else {
			checkAuth();
		}
	};

	const checkUserLevel = (_store, nextState, action) => {
		function checkLevel() {
			const level = get(_store.getState(), 'session.data.user.level');
			const nextLevel = parseInt(nextState.params.challengeId, 10);
			if (level < nextLevel) {
				action.replace('/');
			}
			action.next();
		}

		if (!isSessionLoaded(_store.getState())) {
			_store.dispatch(loadSession())
				.then(checkLevel)
				.catch(checkLevel);
		} else {
			checkLevel();
		}
	};


	const isLoggedIn = (nextState, replace, cb) => {
		function checkAuth() {
			const { auth: { loaded }} = store.getState();
			if (loaded) {
				replace('/');
			}
			cb();
		}

		if (!isAuthLoaded(store.getState())) {
			store.dispatch(loadAuth())
				.then(checkAuth)
				.catch(checkAuth);
		} else {
			checkAuth();
		}
	};

	return (
		<Route path="/" component={App}>
			{ /* Home (main) route */ }
			<IndexRoute component={Home} onEnter={combine([requireLogin])} />
			<Route path="register" component={Register} onEnter={isLoggedIn} />
			<Route path="login" component={Login} onEnter={isLoggedIn} />

			{ /* Routes requiring login */ }
			<Route path="challenges/:challengeId" component={Challenge} onEnter={combine([requireLogin, checkUserLevel])} />

			{ /* Catch all route */ }
			<Route path="*" component={NotFound} status={404} />
		</Route>
	);
};
