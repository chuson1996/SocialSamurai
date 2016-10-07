import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
		App,
		Home,
		NotFound,
		Challenge,
		Login,
		Register
	} from 'containers';

export default (store) => {
	const requireLogin = (nextState, replace, cb) => {
		function checkAuth() {
			const { auth: { user }} = store.getState();
			if (!user) {
				// oops, not logged in, so can't be here!
				replace('/login');
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
			<IndexRoute component={Home} onEnter={requireLogin}/>
			<Route path="register" component={Register} />
			<Route path="login" component={Login} />

			{ /* Routes requiring login */ }
			<Route onEnter={requireLogin}>
				<Route path="challenges/:challengeId" component={Challenge} />
			</Route>
			{ /* Catch all route */ }
			<Route path="*" component={NotFound} status={404} />
		</Route>
	);
};
