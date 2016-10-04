import React from 'react';
import {IndexRoute, Route, Redirect} from 'react-router';
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
				replace('/');
			}
			cb();
		}

		if (!isAuthLoaded(store.getState())) {
			store.dispatch(loadAuth()).then(checkAuth);
		} else {
			checkAuth();
		}
	};

	return (
		<Route path="/" component={App}>
			{ /* Home (main) route */ }
			<IndexRoute component={Home}/>
			<Route path="challenges/:challengeId" component={Challenge} />
			<Route path="register" component={Register} />
			<Route path="login" component={Login} />

			{ /* Routes requiring login */ }
			<Route onEnter={requireLogin}>
				{ /* <Route path="chat" component={Chat}/> */ }
				<Redirect from="loginSuccess" to="sets"/>
				{ /* <Route path="loginSuccess" component={LoginSuccess}/> */ }
				{ /* <Route path="sets" component={Sets}/> */ }
				{ /* <Route path="sets/:setId" component={Terms}/> */ }
			</Route>
			{ /* Catch all route */ }
			<Route path="*" component={NotFound} status={404} />
		</Route>
	);
};
