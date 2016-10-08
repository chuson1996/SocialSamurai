// import config from '../../config';
const LOAD = 'social-samurai/auth/LOAD';
const LOAD_SUCCESS = 'social-samurai/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'social-samurai/auth/LOAD_FAIL';
const LOGIN = 'social-samurai/auth/LOGIN';
const LOGIN_SUCCESS = 'social-samurai/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'social-samurai/auth/LOGIN_FAIL';
const LOGOUT = 'social-samurai/auth/LOGOUT';
const REGISTER = 'social-samurai/auth/REGISTER';
const REGISTER_SUCCESS = 'social-samurai/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'social-samurai/auth/REGISTER_FAIL';

const initialState = {
	loaded: false
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true
			};
		case LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				data: action.result,
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				error: action.error
			};
		case LOGIN:
			return {
				...state,
				loggingIn: true
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loggingIn: false,
				loaded: true,
				data: action.result
			};
		case LOGIN_FAIL:
			return {
				...state,
				loggingIn: false,
				data: null,
				loginError: action.error
			};
		case LOGOUT:
			return {
				...state,
				data: null
			};
		case REGISTER:
			return {
				...state,
				registeringIn: true
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				data: action.result,
				loaded: true
			};
		case REGISTER_FAIL:
			return {
				...state,
				registeringOut: false,
				registerError: action.error
			};
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.auth && globalState.auth.loaded;
}

export function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get('/loadAuth')
	};
}

export function login({ email, password }) {
	return {
		types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
		promise: (client) => client.post('/login', {
			data: { email, password }
		})
	};
}

export function register({ email, password, name }) {
	return {
		types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
		promise: (client) => client.post('/register', {
			data: { email, password, name }
		})
	};
}

export function logout() {
	return {
		type: LOGOUT
	};
}
