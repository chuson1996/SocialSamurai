import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';

// Form plugins
// import newTermFormPlugin from './addNewTermForm';

export default combineReducers({
	routing: routerReducer,
	auth,
	form: formReducer,
	reduxAsyncConnect
});
