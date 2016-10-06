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

export default () => {
	const requireLogin = (nextState, replace, cb) => {
		const token = window.localStorage.getItem('token');
		if (!token) {
			// oops, not logged in, so can't be here!
			replace('/login');
		}
		cb();

		// if (!isAuthLoaded(store.getState())) {
		// 	store.dispatch(loadAuth()).then(checkAuth);
		// } else {
		// 	checkAuth();
		// }
	};

	return (
		<Route path="/" component={App}>
			{ /* Home (main) route */ }
			<IndexRoute component={Home}/>
			<Route path="register" component={Register} />
			<Route path="login" component={Login} />

			{ /* Routes requiring login */ }
			<Route onEnter={requireLogin}>
				<Route path="challenges/:challengeId" component={Challenge} />
				{ /* <Route path="chat" component={Chat}/> */ }
				{ /* <Redirect from="loginSuccess" to="sets"/> */ }
				{ /* <Route path="loginSuccess" component={LoginSuccess}/> */ }
				{ /* <Route path="sets" component={Sets}/> */ }
				{ /* <Route path="sets/:setId" component={Terms}/> */ }
			</Route>
			{ /* Catch all route */ }
			<Route path="*" component={NotFound} status={404} />
		</Route>
	);
};
