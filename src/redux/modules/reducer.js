import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import auth from './auth';

// Form plugins
// import newTermFormPlugin from './addNewTermForm';

export default combineReducers({
	routing: routerReducer,
	auth,
	reduxAsyncConnect
});
