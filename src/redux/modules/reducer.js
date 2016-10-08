import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import session from './session';
import comment from './comment';

// Form plugins
// import newTermFormPlugin from './addNewTermForm';

export default combineReducers({
	routing: routerReducer,
	form: formReducer,
	reduxAsyncConnect,
	auth,
	session,
	comment,
});
